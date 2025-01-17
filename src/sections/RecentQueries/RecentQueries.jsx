import { useLoaderData } from "react-router-dom";
import QueryCard from "../../components/QueryCard/QueryCard"

const RecentQueries = () => {

    const data = useLoaderData();

    return (
        <div className='bg-[#F5EAD8]'>

        <h2 className="pt-8 pb-20 text-4xl md:text-6xl text-[#023373] text-center font-lilita font-bold">
            Recent Queries
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-[85%] mx-auto gap-4">
            {data.slice(0,6).map((query) => (
                <QueryCard from="home" key={query._id} query={query}></QueryCard>
            ))}
        </div>
            
        </div>
    );
};

export default RecentQueries;