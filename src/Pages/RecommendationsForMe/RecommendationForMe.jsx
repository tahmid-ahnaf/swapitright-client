import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../components/AuthProvider/AuthProvider';
import { Helmet } from 'react-helmet-async';

const RecommendationForMe = () => {
    const [recommendationsForMe, setRecommendationsForMe] = useState([]);
    const {user} = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://swapitright-server.vercel.app/recommendationsForEmail/${user.email}`,
          { credentials: "include" }
        );
        const data = await response.json();
        setRecommendationsForMe(data);
      } catch (error) {
        console.error("Could not fetch data", error);
      }
    }

    fetchData();
  }, []);
    return (
        <div className=" p-8 lg:p-16 bg-[#FFF4E4]">
        <Helmet>
                <title>Add Queries</title>
            </Helmet>
        <div className=" max-w-[85%] mx-auto">
    <h2 className="text-center text-4xl mb-6 font-lilita text-[#023373]">Recommendations for Me</h2>
      <div className="overflow-x-auto bg-[#FAE8D3] rounded-lg p-4">
        <table className="table text-xl table-pin-rows table-pin-cols">
          <thead>
            <tr className="bg-[#FAE8D3] text-2xl">
              <td></td>
              <td>Product Name</td>
              <td>Query Title</td>
              <td>Recommender</td>
              <td>Recommended Product</td>
              <td>Reason</td>
            </tr>
          </thead>
          <tbody>
            {recommendationsForMe.map((recommendation, idx) => (
              <tr key={recommendation._id}>
                <td>{idx + 1}</td>
                <td>{recommendation.productName}</td>
                <td>{recommendation.queryTitle}</td>
                <td>{recommendation.recommenderName}</td>
                <td>{recommendation.recommendedProductName}</td>
                <td>{recommendation.recommendationReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    );
};

export default RecommendationForMe;