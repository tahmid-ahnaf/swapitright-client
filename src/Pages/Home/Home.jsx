import { Helmet } from 'react-helmet-async';
import RecentQueries from '../../sections/RecentQueries/RecentQueries';
import Reviews from '../../sections/Reviews/Reviews';
import NewsLetter from '../../sections/NewsLetter/NewsLetter';
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home</title>
            </Helmet>

            <RecentQueries></RecentQueries>
            <Reviews></Reviews>
            <NewsLetter></NewsLetter>

        </div>
    );
};

export default Home;