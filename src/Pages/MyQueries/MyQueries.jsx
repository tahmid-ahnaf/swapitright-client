import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import QueryCard from "../../components/QueryCard/QueryCard";
import { Link } from "react-router-dom";

const MyQueries = () => {
    const [myQueries, setMyQueries] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(() => {

        async function fetchData() {
          try {
            const response = await fetch(`http://127.0.0.1:5000/queriesByEmail/${user.email}`);
            const data = await response.json();
            setMyQueries(data);
          } catch (error) {
            console.error("Could not fetch data", error);
          }
        }
    
        fetchData();
      }, []);
  return (
    <div className="bg-[#F5EAD8] pt-6">
      <div className="hero h-[75vh] rounded-xl mb-6 bg-[#EBD4AE] max-w-[85%] mx-auto">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link to={`/addqueries`}>
                      <button className="btn bg-transparent border-[#023373] text-[#023373] hover:bg-[#023373] hover:text-white text-base">
                        Add Queries
                      </button>
                    </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[85%] mx-auto gap-4">
        {
            myQueries.map((query)=>(
                <QueryCard from="myqueries" key={query._id} query={query} myQueries={myQueries} setMyQueries={setMyQueries}></QueryCard>
            ))
        }
      </div>

    </div>
  );
};

export default MyQueries;
