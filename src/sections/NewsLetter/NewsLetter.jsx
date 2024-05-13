import React from "react";

const NewsLetter = () => {
  return (
    <div className=" bg-[#F5EAD8]">
    <div className="bg-[#F2DAAC] rounded-xl p-16 max-w-[85%] mx-auto grid grid-cols-1 md:grid-cols-2">
    <div className="flex flex-col gap-4 font-lilita text-[#023373]">
        <h2 className="text-5xl">Subscribe to Newsletter</h2>
        <p className="text-3xl">Get Latest Recommendations <br></br> and Queries</p>
      </div>

      <div className="justify-self-end">
        <div className="join">
          <input
            className="input input-bordered join-item"
            placeholder="Email"
          />
          <button className="btn join-item rounded-r-full">Subscribe</button>
        </div>
      </div>
    </div>
      
    </div>
  );
};

export default NewsLetter;
