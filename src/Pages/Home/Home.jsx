import { Helmet } from 'react-helmet-async';
import RecentQueries from '../../sections/RecentQueries/RecentQueries';
import Reviews from '../../sections/Reviews/Reviews';
import NewsLetter from '../../sections/NewsLetter/NewsLetter';
import { useEffect, useState } from 'react';
import Slider from '../../components/Slider/Slider';
import Banner from '../../components/Banner/Banner';
const Home = () => {
    const [sliderData, setSliderData] = useState([]);
    useEffect(() => {

        async function fetchData() {
          try {
            const response = await fetch('slider.json');
            const data = await response.json();
            setSliderData(data);
          } catch (error) {
            console.error("Could not fetch data", error);
          }
        }
    
        fetchData();
      }, []);
    return (
        <div>
            <Helmet>
                <title>SwapItRight|Home</title>
            </Helmet>

            <div className='bg-[#F5EAD8]'> <Slider sliderData = {sliderData}></Slider></div>

            <Banner></Banner>
           

            <RecentQueries></RecentQueries>
            <Reviews></Reviews>
            <NewsLetter></NewsLetter>

        </div>
    );
};

export default Home;