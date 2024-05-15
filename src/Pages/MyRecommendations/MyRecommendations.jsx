import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const MyRecommendations = () => {
    const [myRecommendations, setMyRecommendations] = useState([]);
    const {user} = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://swapitright-server.vercel.app/recommendationsByEmail/${user.email}`,
          { credentials: "include" }
        );
        const data = await response.json();
        setMyRecommendations(data);
      } catch (error) {
        console.error("Could not fetch data", error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://swapitright-server.vercel.app/recommendations/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your recommendation has been deleted.",
                icon: "success",
              });

              const remaining = myRecommendations.filter((recommendation) => recommendation.queryId !== id);
              setMyRecommendations(remaining);
            }
          });
      }
    });
  };
  return (
    <div className=" p-8 lg:p-16 bg-[#FFF4E4]">
    <Helmet>
                <title>My Recommendations</title>
            </Helmet>
        <div className=" max-w-[85%] mx-auto">
    <h2 className="text-center text-4xl mb-6 font-lilita text-[#023373]">My Recommendations</h2>
      <div className="overflow-x-auto bg-[#FAE8D3] rounded-lg p-4">
        <table className="table text-xl table-pin-rows table-pin-cols">
          <thead>
            <tr className="bg-[#FAE8D3] text-2xl">
              <td></td>
              <td>Product Name</td>
              <td>Query Adder</td>
              <td>Query Title</td>
              <td>Recommended Product</td>
              <td>Reason</td>
            </tr>
          </thead>
          <tbody>
            {myRecommendations.map((recommendation, idx) => (
              <tr key={recommendation._id}>
                <td>{idx + 1}</td>
                <td>{recommendation.productName}</td>
                <td>{recommendation.userName}</td>
                <td>{recommendation.queryTitle}</td>
                <td>{recommendation.recommendedProductName}</td>
                <td>{recommendation.recommendationReason}</td>
                <td>
                  <button
                    onClick={() => handleDelete(recommendation.queryId)}
                    className="btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    
  );
};

export default MyRecommendations;
