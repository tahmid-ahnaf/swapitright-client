import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import { useLoaderData, useNavigate } from "react-router-dom";
const UpdateQuery = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const data = useLoaderData();
  const DateAndTime = Date.now();
  const currentDateAndTime = "" + DateAndTime;

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
  } = data;

  // Convert the timestamp to a Date object
  const date = new Date(DateAndTime);

  // Extracting date and time components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Constructing the date and time string
  const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  console.log(dateTimeString); // Displays date and time in local timezone
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submit action

    const productImageURL = e.target.elements.productImageURL.value;
    const productName = e.target.elements.productName.value;
    const productBrand = e.target.elements.productBrand.value;
    const alternationReason = e.target.elements.alternationReason.value;
    const queryTitle = e.target.elements.queryTitle.value;
    const userEmail = user.email;
    const userName = user.displayName;
    const userImage = user.photoURL;
    const recommendationCount = 0;

    const newQuery = {
      productName,
      productBrand,
      productImageURL,
      queryTitle,
      alternationReason,
      userEmail,
      userImage,
      userName,
      currentDateAndTime,
      recommendationCount,
    };

    fetch(`http://127.0.0.1:5000/update/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newQuery),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount) {
          Swal.fire({
            title: "Success!",
            text: "Item Updated Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
    // navigate("/myqueries");
  };
  return (
    <div className="mx-auto bg-[#FFF4E4] p-4 lg:p-8 rounded-lg">
      <div className="w-[95%] md:w-[50%] bg-[#EBD4AE] mx-auto p-4 lg:px-12 lg:py-10 rounded-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="font-semibold text-4xl text-center mb-4 text-[#023373] font-lilita">
            Add Queries
          </h2>
          <div className="form-control mb-4">
            <input
              type="text"
              name="productImageURL"
              defaultValue={productImageURL}
              className="input input-bordered bg-[#FFF4E4]"
              required
            />
          </div>

          <div className="form-control mb-4">
            <input
              type="text"
              name="productName"
              defaultValue={productName}
              className="input input-bordered bg-[#FFF4E4]"
              required
            />
          </div>

          <div className="form-control mb-4">
            <input
              type="text"
              name="productBrand"
              defaultValue={productBrand}
              className="input input-bordered bg-[#FFF4E4]"
              required
            />
          </div>

          <div className="form-control mb-4">
            <input
              type="text"
              name="queryTitle"
              defaultValue={queryTitle}
              className="input input-bordered bg-[#FFF4E4]"
              required
            />
          </div>

          <div className="form-control mb-4">
            <input
              type="text"
              name="alternationReason"
              defaultValue={alternationReason}
              className="input input-bordered bg-[#FFF4E4]"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label htmlFor="userEmail" className="mb-2 font-semibold">
              Added By
            </label>
            <input
              type="email"
              name="userEmail"
              placeholder={user.email}
              className="input input-bordered bg-[#FFF4E4]"
              required
              disabled
            />
          </div>

          <div className="form-control mb-4">
            <input
              type="text"
              name="userName"
              placeholder={user.displayName}
              className="input input-bordered bg-[#FFF4E4]"
              required
              disabled
            />
          </div>

          <div className="form-control mb-4">
            <input
              type="text"
              name="userImage"
              placeholder={user.photoURL}
              className="input input-bordered bg-[#FFF4E4]"
              required
              disabled
            />
          </div>

          <div className="form-control mb-4">
            <input
              type="text"
              name="currentDateAndTime"
              placeholder={dateTimeString}
              className="input input-bordered bg-[#FFF4E4]"
              required
              disabled
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base"
            >
              Update Query
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateQuery;
