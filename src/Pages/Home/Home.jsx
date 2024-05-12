import { Helmet } from 'react-helmet-async';
import RecentQueries from '../../sections/RecentQueries/RecentQueries';
import Reviews from '../../sections/Reviews/Reviews';
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>

            <RecentQueries></RecentQueries>
            <Reviews></Reviews>

        </div>
    );
};

export default Home;