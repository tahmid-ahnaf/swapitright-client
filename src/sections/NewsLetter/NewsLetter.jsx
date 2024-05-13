const NewsLetter = () => {
  return (
    <div className=" bg-[#F5EAD8]">
    <div className="bg-[#F2DAAC] rounded-xl p-12 md:p-16 max-w-[85%] mx-auto flex md:flex-row flex-col justify-between items-center gap-4
    ">
    <div className="flex flex-col gap-4 font-lilita text-[#023373]">
        <h2 className="text-4xl md:text-5xl text-center md:text-start">Subscribe to Newsletter</h2>
        <p className="text-2xl md:text-3xl text-center md:text-start">Get Latest Recommendations <br></br> and Queries</p>
      </div>

      <div className="">
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
