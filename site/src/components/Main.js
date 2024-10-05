import {
  Box,
  Text,
  Flex,
  Image,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "./Logo";
import mainImage from "./Images/main.png";
import arrowsImage from "./Images/arrows.png";
import Navbar from "./Navbar";

import "../App.css";

const Links = ["Home", "Explore", "Contact", "Pricing"];

const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      padding="0px"
      backgroundImage={mainImage}
      zIndex="1"
      mb="150px"
      height="700px"
      position="relative"
      id="home"
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Box>
        <Navbar />
      </Box>
      <Box
        zIndex={2}
        color="white"
        textAlign="center"
        pt="40px"
        id="main_text_parent"
        px="10px"
        className="title"
      >
        <Text fontWeight={900} margin="0px" padding="0px" id="bold">
          YOUR GAZE
        </Text>
        <Text fontWeight={900} margin="0px" padding="0px" id="bold">
          IS AN
        </Text>
        <Text fontWeight={900} color="#2C75FF" margin="0px" id="bold">
          AMMANAH
        </Text>
      </Box>

      {/* <Box zIndex={2} color='white' textAlign='center' pt='40px'
            id='main_text_parent' px='10px'
            className='title'>
            <Text fontWeight={900} margin='0px' padding='0px' id='bold'>
            SHIELD YOUR </Text>
            <Text fontWeight={900} color='#2C75FF' margin='0px' id='bold'>
            GAZE  <Text as='span' fontWeight={900}
             margin='0px' padding='0px' id='bold' color='white'>
            FROM</Text>
            </Text>
            <Text fontWeight={900} color='#2C75FF' margin='0px' id='bold'>
            HARMFUL
            </Text>
            <Text fontWeight={900} margin='0px' padding='0px' id='bold'>
            CONTENT. </Text>
         </Box> */}
      <Flex
        justifyContent="center"
        alignItems="center"
        mt="10px"
        className="reg"
      >
        <Text
          textAlign="center"
          fontSize="1.2rem"
          margin="0px"
          w="80%"
          color="white"
          fontWeight={500}
        >
          Use Our AI trained smart filter to protect you from unwanted content,
          so you can surf safely.
        </Text>
      </Flex>

      <div className="arrowsBottom">
        <Link href="#features">
          <Image src={arrowsImage} w="70px" cursor="pointer" />
        </Link>
      </div>

      {/* <Flex justifyContent='center' alignItems='center' position='relative' top='80px'>
            <Link href='#features'>
               <Image src={arrowsImage} w='70px' cursor='pointer'/>
            </Link>
            
         </Flex> */}
    </Box>
  );
};

export default Main;
