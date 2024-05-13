import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";

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
    </div>
  );
};

export default QueryDetails;
