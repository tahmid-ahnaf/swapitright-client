import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const QueryDetails = () => {
    const { user } = useContext(AuthContext);
  const data = useLoaderData();

  const {
    _id,
    productName,
    productBrand,
    productImageURL,
    queryTitle,
    alternationReason,
    userEmail,
    userImage,
    userName,
    recommendationCount,
    currentDateAndTime,
  } = data;
  const date = new Date(parseInt(currentDateAndTime));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action

    const recommendedProductImage = e.target.elements.recommendedProductImage.value;
    const recommendedProductName = e.target.elements.recommendedProductName.value;
    const recommendationTitle = e.target.elements.recommendationTitle.value;
    const recommendationReason = e.target.elements.recommendationReason.value;
    const recommenderEmail = user.email;
    const recommenderName = user.displayName;
    const DateAndTime = Date.now();
    const currentDateAndTimeStamp = ''+DateAndTime;
    const queryId = _id;


    const newRecommendation = {
      queryId,
      queryTitle,
      productName,
      recommendedProductName,
      recommendedProductImage,
      recommendationTitle,
      recommendationReason,
      userEmail,
      userName,
      recommenderEmail,
      recommenderName,
      currentDateAndTimeStamp,
    };

    fetch("https://swapitright-server.vercel.app/recommendations", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newRecommendation),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Recommendation Added Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });

          // e.target.reset();
        }
      });
  };
  return (
    <div className="mx-auto bg-[#FFF4E4] p-4 lg:p-8 rounded-lg">
      <div className="w-[85%] border-[#EBD4AE] mx-auto mb-6">
        <img src={productImageURL} className="mx-auto w-[500px] h-[350px]" alt="" />
      </div>

      <div className="w-[85%] mx-auto">
        <div className="rounded-xl bg-[#EBD4AE] p-8 grid grid-cols-1 lg:grid-cols-2 ">
        <div className="flex flex-col gap-2 justify-center items-center lg:items-start text-center lg:text-start">
        <p className="text-xl text-[#023373]"><span className="font-lilita">Product Name: </span>{productName}</p>
            <p className="text-xl text-[#023373]"><span className="font-lilita">Brand Name: </span>{productBrand}</p>
            <p className="text-xl text-[#023373]"><span className="font-lilita">Title of the Query: </span>{queryTitle}</p>
            <p className="text-xl text-[#023373]"><span className="font-lilita">Reason of Alternation: </span>{alternationReason}</p>
            <p className="text-xl text-[#023373]"><span className="font-lilita">Available Recommendations: </span>{recommendationCount}</p>
        </div>
            
            <div className="justify-self-center bg-[#FFF4E4] lg:justify-self-end p-6 rounded-xl text-center max-w-sm text-[#023373]">
            <p className="text-xl mb-6">Query Added By: {userName}</p>
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={userImage}
              alt=""
            ></img>
            <div className="text-sm mt-5">
              <p>Email Address: {userEmail}</p>
              <p>Query Added At: {dateTimeString}</p>
            </div>
          </div>
        </div>
      </div>

      {user.email === userEmail ? "" : <div className="mt-8 w-[95%] md:w-[50%] bg-[#EBD4AE] mx-auto p-4 lg:px-12 lg:py-10 rounded-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="font-semibold text-4xl text-center mb-4 text-[#023373] font-lilita">Add Recommendations</h2>
          <div className="form-control mb-4">
            <input
              type="text"
              name="recommendationTitle"
              placeholder="Recommendation Title"
              className="input input-bordered bg-[#FFF4E4]"
              required
            />
          </div>

          <div className="form-control mb-4">
            <input
              type="text"
              name="recommendedProductName"
              placeholder="Recommended Product Name"
              className="input input-bordered bg-[#FFF4E4]"
              required
            />
          </div>

          <div className="form-control mb-4">
            <input
              type="text"
              name="recommendedProductImage"
              placeholder="Recommended Product Image"
              className="input input-bordered bg-[#FFF4E4]"
              required
            />
          </div>

          <div className="form-control mb-4">
            <input
              type="text"
              name="recommendationReason"
              placeholder="Recommendation Reason"
              className="input input-bordered bg-[#FFF4E4]"
              required
            />
          </div>

          <div className="flex justify-center">
          <button type="submit" className="btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base">
                        Add Recommendation
                      </button>
          </div>
        </form>
      </div>}
    </div>
  );
};

export default QueryDetails;
