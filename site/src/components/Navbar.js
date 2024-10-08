import {Box,
    Flex,
    Image,
    Text,
    HStack,
    Link,
    IconButton,
    Button,
    useDisclosure,
    useColorModeValue,
    Stack,} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Logo from './Logo';
import logoImage from './Images/logo.png'

import '../App.css'



  const Links = ['Home', 'Explore', 'Contact', 'Pricing'];

const Navbar=()=>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    return(
        <Box  w='100vw' top={0} left={0} zIndex={4} m={0}>
            <Flex justifyContent='space-between' alignItems='center' 
            padding='0px' margin='0px'
            pl={80} pr={80}  color='white'  id='navbar'>
                <Box>
                    <Image src={logoImage} width={50}/>
                </Box>
                <Flex w='55%' justifyContent='space-between' alignItems='center'>
                    <Link href='#home'
                    color='white' fontWeight='400' textDecoration='none'>Home

                    </Link>
                    <Link color='white' href='#explore' fontWeight='400' textDecoration='none'>
                    Explore
                    </Link>
                    <Link color='white' href='#about' fontWeight='400' textDecoration='none'>
                    About
                    </Link>
                    <Link color='white'fontWeight='400' textDecoration='none'
                    href='#contact'>
                    Contact
                    </Link>
                    <Link href='#pricing'
                      textDecoration='none' fontWeight='500'>
                        <Button border='none' outline='none' borderRadius='6px'
                        fontWeight='500' p='10px' px='20px' 
                        boxShadow='0 4px 8px rgba(44, 117, 255, 0.3), 0 6px 20px rgba(44, 117, 255, 0.2)'
                         height='30px' color='white' backgroundColor='#2c75ff'>
                         <Text m='0px' fontWeight={800} fontSize='16px'>Pricing</Text>
                            
                        </Button>
                    </Link>
                </Flex>
                
            </Flex>
        </Box>
    )
}

export default Navbar