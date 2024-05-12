import { MdQueryStats } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { TbBrandAsana } from "react-icons/tb";
import { BiCommentX } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
const QueryCard = ({query}) => {

    const {productName, productBrand, productImageURL, queryTitle, alternationReason, userEmail, userName, userImage, currentDateAndTime,recommendationCount} = query;
    return (
        <div>
          <div className="card h-min md:h-[400px] md:card-side bg-[#EBD4AE]  shadow-xl">
            <figure className="w-full md:w-[50%]">
              <img
                src={productImageURL}
                alt="Album"
                className="bg-cover w-full h-[300px] md:h-full"
              />
            </figure>
            <div className="card-body text-xl text-[#023373] font-medium">

            <p className="flex items-center gap-2"><MdQueryStats></MdQueryStats> {queryTitle}</p>
            <p className="flex items-center gap-2"><AiOutlineProduct></AiOutlineProduct>{productName}</p>
            <p className="flex items-center gap-2"><TbBrandAsana></TbBrandAsana>{productBrand}</p>
            <p className="flex items-center gap-2"><BiCommentX></BiCommentX>{alternationReason}</p>
            <p className="flex items-center gap-2"><FaRegCalendarAlt></FaRegCalendarAlt>{currentDateAndTime}</p>
            <p className="flex items-center gap-2"><FaRegUser></FaRegUser>{userName}</p>
              <div className="card-actions">
                
              </div>
            </div>
          </div>
        </div>
      );
};

export default QueryCard;