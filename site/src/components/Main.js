import {Box,
    Text,
    Flex,
    Image,
    HStack,
    Link,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from './Logo';
import mainImage from './Images/main.png'
import arrowsImage from './Images/arrows.png'
import Navbar from './Navbar';

import '../App.css'


  const Links = ['Home', 'Explore', 'Contact', 'Pricing'];

const Main=()=>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    return(
        <Box padding='0px'  backgroundImage={mainImage} zIndex='1'
        width='100vw' w='100vw' mb='100px'
        height='700px' position='relative' id='home'
        backgroundSize='cover' backgroundPosition='center' backgroundRepeat='no-repeat'>
         <Box pt='20px'>
            <Navbar/>
         </Box>

         <Box zIndex={2} color='white' textAlign='center' pt='40px' lineHeight='90px'>
            <Text fontSize='6rem' fontWeight={900} margin='0px' padding='0px' id='bold'>
            SHIELD YOUR </Text>
            <Text fontSize='6rem' fontWeight={900} color='#2C75FF' margin='0px' id='bold'>
            GAZE  <Text as='span' fontSize='6rem' fontWeight={900}
             margin='0px' padding='0px' id='bold' color='white'>
            FROM</Text>
            </Text>
            <Text fontSize='6rem' fontWeight={900} color='#2C75FF' margin='0px' id='bold'>
            HARAM
            </Text>
            <Text fontSize='6rem' fontWeight={900} margin='0px' padding='0px' id='bold'>
            CONTENT. </Text>
         </Box>
         <Flex justifyContent='center' alignItems='center' mt='10px' >
            <Text textAlign='center' margin='0px' w='50%' color='white' fontWeight={400}>
            Use Our AI trained smart filter to protect you from unwanted content, so you can surf safely.
            </Text>
         </Flex>

         <Flex justifyContent='center' alignItems='center' 
         position='absolute' bottom='20px' left='50%'>
            <Image src={arrowsImage} w='70px' cursor='pointer'/>
         </Flex>
         
        </Box>
    )
}

export default Main