
import {Box} from '@chakra-ui/react'
import Navbar from './Navbar';
import Main from './Main';
import AboutUs from './AboutUs';
import OurSpecialty from './OurSpecialty';
import HowWorks from './HowWorks';
import Tutorial from './Tutorial';
import Pricing from './Pricing';
import Footer from './Footer';
import mainImage from './Images/main.png'
import ShowCase from './ShowCase';
import Features from './Features'
import Download from './Download';


function Home() {
  return (
    <Box className="App" padding='0px'  overflow='hidden' margin='0px'>
      {/* <Navbar/> */}
      <Main/>
      <ShowCase/>
      <Features/>
      <Download/>
      {/* <AboutUs/> */}
      {/* <OurSpecialty/> */}
      {/* <HowWorks/> */}
      <Tutorial/>
      {/* <Pricing/> */}
      <Footer/>
      {/* 
       */}
    </Box>
  );
}

export default Home;
