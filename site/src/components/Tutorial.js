
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
import FloatingTitle from './FloatingTitle';
import mainImage from './Images/main.png'
import logoImage from './Images/logo-bigger.png'

const Tutorial=()=>{
    return(
        <Box  padding='0px' mb='100px'
        backgroundColor='white' position='relative' id='tutorial'>

            <Flex justifyContent='center' alignItems='center'>
                <FloatingTitle text={"Tutorial"}/>
            </Flex>

            <Box textAlign='center' >
                    <Text lineHeight='50px'margin={0} fontWeight='500' fontSize='2.5rem'>
                    Our Expert Tells Via</Text>
                    <Text margin={0} fontWeight='500' fontSize='2.5rem'>
                     <Text as='span' color='#2C75FF'>Tutorial</Text>
                    </Text>
            </Box>
            <Flex justifyContent='center' alignItems='center'>
            <Text textAlign='center' w='50%' fontSize='12px'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
porta ante non ante dignissim aliquam. Pellentesque nunc leo,
pretium a lorem vel, ornare mollis leo.</Text>
            </Flex>

            <Flex justifyContent='center' alignItems='center' mt='60px'>
                <Flex w='50%' justifyContent='center' alignItems='center'
                h='300px'>
                    <video controls height='100%'>

                    </video>
                </Flex>
            </Flex>


            
        </Box>
    )
    
}

export default Tutorial

