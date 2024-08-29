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

         <Box zIndex={2} color='white' textAlign='center' pt='40px' lineHeight='100px'>
            <Text fontSize='7rem' fontWeight={900} margin='0px' padding='0px' id='bold'>YOUR GAZE</Text>
            <Text fontSize='7rem' fontWeight={900} margin='0px' padding='0px' id='bold'>IS AN</Text>
            <Text fontSize='7rem' fontWeight={900} color='#2C75FF' margin='0px' id='bold'>AMMANAH</Text>
         </Box>
         <Flex justifyContent='center' alignItems='center' mt='10px' >
            <Text textAlign='center' margin='0px' w='50%' color='white'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum porta ante non ante
            dignissim aliquadm. Pellentesque nunc leo, pretium a lorem vel, ornare mollis leo.
            </Text>
         </Flex>

         <Flex justifyContent='center' alignItems='center' 
         position='absolute' bottom='40px' left='50%'>
            <Image src={arrowsImage} w='70px' cursor='pointer'/>
         </Flex>
         
        </Box>
    )
}

export default Main