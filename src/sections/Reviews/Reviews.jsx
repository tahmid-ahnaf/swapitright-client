import { useEffect, useState } from "react";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

const Reviews = () => {
    const [reviewData, setReviewData] = useState([]);
    useEffect(() => {

        async function fetchData() {
          try {
            const response = await fetch('reviews.json');
            const data = await response.json();
            setReviewData(data);
          } catch (error) {
            console.error("Could not fetch data", error);
          }
        }
    
        fetchData();
      }, []);
    return (
        <div className="bg-[#F5EAD8] py-20">

        <h2 className=" pb-20 text-6xl text-[#023373] text-center font-lilita">Customer&apos;s Talk</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[85%] mx-auto ">
        {reviewData.map((review)=>(
            <ReviewCard key={review.id} review={review}></ReviewCard>
        ))}
        </div>
        
            
        </div>
    );
};

export default Reviews;