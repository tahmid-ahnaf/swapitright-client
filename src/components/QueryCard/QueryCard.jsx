import { MdQueryStats } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { TbBrandAsana } from "react-icons/tb";
import { BiCommentX } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdPreview } from "react-icons/md";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Vote from "../Vote/Vote";
import { useState } from "react";
import axios from 'axios';
const QueryCard = ({ query, from, myQueries,setMyQueries,setVoteChange,voteChange }) => {
  const {
    _id,
    productName,
    productBrand,
    productImageURL,
    queryTitle,
    alternationReason,
    userEmail,
    userName,
    userImage,
    currentDateAndTime,
    recommendationCount,
    voteCount
  } = query;

  const [voteToggle,setVoteToggle] = useState(true); 
  const date = new Date(parseInt(currentDateAndTime));

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Constructing the date and time string
  const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
        fetch(`https://swapitright-server.vercel.app/queries/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your query has been deleted.",
                icon: "success",
              });

              const remaining = myQueries.filter((item) => item._id !== id);
              setMyQueries(remaining);
            }
          });
      }
    });
  };

  const handleVote = async ()=> {
    try {
      const response = await axios.put(`https://swapitright-server.vercel.app/queries/${_id}/vote`);
      console.log(response.data);
      setVoteChange(!voteChange);
    } catch (error) {
      console.error(error);
    }
    // navigate("/myqueries");
    setVoteToggle(!voteToggle);
  };
    
  return (
    <div>
      <div className="flex flex-col lg:flex-row h-min md:h-[600px] lg:h-[600px] bg-[#EBD4AE] shadow-xl rounded-xl">
        <figure className="lg:w-[500px] rounded-xl">
          <img
            src={productImageURL}
            alt="Album"
            className="bg-contain w-full h-[200px] lg:h-full"
          />
        </figure>
        <div className="card-body text-xl text-[#023373] font-medium">
          <p className="flex items-center gap-2">
            <MdQueryStats className="text-2xl"></MdQueryStats> {queryTitle}
          </p>
          <p className="flex items-center gap-2">
            <AiOutlineProduct className="text-2xl"></AiOutlineProduct>
            {productName}
          </p>
          <p className="flex items-center gap-2">
            <TbBrandAsana className="text-2xl"></TbBrandAsana>
            {productBrand}
          </p>
          <p className="flex items-center gap-2">
            <BiCommentX className="text-2xl"></BiCommentX>
            {alternationReason}
          </p>
          <p className="flex items-center gap-2">
            <FaRegCalendarAlt className="text-2xl"></FaRegCalendarAlt>
            {dateTimeString}
          </p>

          <p className="flex items-center gap-2">
            Total Recommendations: { recommendationCount}
          </p>

          <p className="flex items-center gap-2">
            Total Votes: { voteCount}
          </p>
          <p className="flex items-center gap-2">
            {/* <FaRegUser className="text-2xl"></FaRegUser> */}
            <div className="w-10 h-10 rounded-full">
            <img src={userImage} alt="" />
            </div>
            
            {userName}
          </p>
          <div className="mt-4 card-actions justify-center md:justify-start">
            {(() => {
              if (from === "myqueries") {
                return (
                  <div className="flex items-center justify-center md:gap-2 gap-4" >
                    <Link to={`/view-details/${_id}`}>
                      <button className="hidden md:flex btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base">
                        View Details
                      </button>

                      <p className="md:hidden text-4xl"><MdPreview></MdPreview></p>
                    </Link>

                    <Link to={`/updatequery/${_id}`}>
                      <button
                        onClick={() =>
                          document.getElementById("my_modal_5").showModal()
                        }
                        className="hidden md:flex btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base"
                      >
                        Update
                      </button>
                      <p className="md:hidden text-4xl"><MdOutlineModeEdit></MdOutlineModeEdit></p>
                    </Link>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="hidden md:flex btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base"
                    >
                      Delete
                    </button>
                    <p className="md:hidden text-4xl"><MdDeleteOutline></MdDeleteOutline></p>
                  </div>
                );
              } 
              else if(from==="home") {
                return "";
              }
              else if(from==="allqueries")
              {
                return (
                  <div className="flex items-center justify-center md:gap-2 gap-4" >
                    <Link to={`/view-details/${_id}`}>
                      <button className="hidden md:flex btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base">
                        Recommend
                      </button>
                      

                      <p className="md:hidden text-4xl"><MdPreview></MdPreview></p>
                    </Link>
                    <Vote handleVote={handleVote} toggled={voteToggle} ></Vote>
                    </div>
                )
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryCard;
