import { useEffect, useState } from "react";
import QueryCard from "../../components/QueryCard/QueryCard";
import Vote from "../../components/Vote/Vote";

const AllQueries = () => {
    const [queries, setQueries] = useState([]);
    const [filter, setFilter] = useState("All");
    const [voteChange,setVoteChange] = useState(true);
    const handleSubmit = (e) => {
        e.preventDefault();

    const searchText = e.target.elements.searchText.value;
    setFilter(searchText);
    console.log(filter);
    }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://swapitright-server.vercel.app/allqueries/${filter}`
        );
        const data = await response.json();
        setQueries(data);
      } catch (error) {
        console.error("Could not fetch items", error);
      }
    }

    fetchData();
  }, [filter, voteChange]);
  return (
    <div className="bg-[#F5EAD8]">
      <h2 className="pt-20 pb-20 text-6xl text-[#023373] text-center font-lilita font-bold">
        All Queries
      </h2>

      <form onSubmit={handleSubmit} className="max-w-[50%] mx-auto mb-8 ">
      <div className="form-control mb-4">
            <input
              type="text"
              name="searchText"
              placeholder="Search By Product Name"
              className="input input-bordered bg-[#FFF4E4]"
              required
            />
          </div>
          <div className="flex justify-center">
          <button type="submit" className="btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base">
                        Search
          </button>
          
          </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-[85%] mx-auto gap-4">
        {queries.map((query) => (
          <QueryCard setVoteChange={setVoteChange} voteChange={voteChange} from="allqueries" key={query._id} query={query}></QueryCard>
        ))}
      </div>
    </div>
  );
};

export default AllQueries;
