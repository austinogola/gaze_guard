import logo from './logo.svg';
import './App.css';
import {Box} from '@chakra-ui/react'
import Navbar from './components/Navbar';
import Main from './components/Main';
import AboutUs from './components/AboutUs';
import OurSpecialty from './components/OurSpecialty';
import HowWorks from './components/HowWorks';
import Tutorial from './components/Tutorial';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import mainImage from './components/Images/main.png'


function App() {
  return (
    <Box className="App" padding='0px'  overflow='hidden' margin='0px'>
      {/* <Navbar/> */}
      <Main/>
      <AboutUs/>
      <OurSpecialty/>
      <HowWorks/>
      <Tutorial/>
      <Pricing/>
      <Footer/>
      {/* 
       */}
    </Box>
  );
}

export default App;
