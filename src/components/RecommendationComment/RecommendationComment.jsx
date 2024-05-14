
const RecommendationComment = ({rcmnd}) => {

    const {
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
        recommenderImage,
        currentDateAndTimeStamp,
      } = rcmnd;

      const date = new Date(parseInt(currentDateAndTimeStamp));
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return (
        <div>
            
      <div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img src={recommenderImage} />
    </div>
  </div>
  <div className="chat-bubble  bg-[#EBD4AE] w-full grid grid-cols-1 lg:grid-cols-3 items-center p-8 gap-4">
  <div className="flex flex-col gap-4 text-[#023373] text-xl text-center lg:text-start col-span-2">
  <p>Recommender Name: {recommenderName} </p>
  <p>Recommended Product: {recommendedProductName}</p>
  <p>Recommendation Reason: {recommendationReason}</p>
  <p>Recommended At: {dateTimeString}</p>
  </div>

  <div className="justify-self-end col-span-1">
    <img src={recommendedProductImage} className="w-36 h-36 rounded-full" alt="" />
  </div>
  

  </div>
</div>
        </div>
    );
};

export default RecommendationComment;