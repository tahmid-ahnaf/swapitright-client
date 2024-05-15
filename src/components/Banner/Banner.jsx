import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div className=" bg-[#F5EAD8] p-8  ">
            <div className="hero h-[75vh] bg-[#EBD4AE] mx-auto max-w-[85%] rounded-xl  ">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">With SwapItRight, you can choose the best alternative for your daily life products with the best recommendations from huge number of people. </p>
      <Link to={`/allqueries`}>
                      <button className="btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base">
                        See Queries
                      </button>
                    </Link>
    </div>
  </div>
</div>
        </div>
    );
};

export default Banner;