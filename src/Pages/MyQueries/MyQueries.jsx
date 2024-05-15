import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/AuthProvider/AuthProvider";
import QueryCard from "../../components/QueryCard/QueryCard";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const MyQueries = () => {
    const [myQueries, setMyQueries] = useState([]);
    const {user} = useContext(AuthContext);
    useEffect(() => {

        async function fetchData() {
          try {
            const response = await fetch(`https://swapitright-server.vercel.app/queriesByEmail/${user.email}`, {credentials:'include'});
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
    <Helmet>
                <title>My Queries</title>
            </Helmet>
      <div className="hero h-[75vh] rounded-xl mb-6 bg-[#EBD4AE] max-w-[85%] mx-auto">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Hello there</h1>
            <p className="py-6">
              Without further ado, let us get you to your needed query. Click the button below to add a query about the alternative product you need.
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
