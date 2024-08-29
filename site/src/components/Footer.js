import {Box,
    Text,
    Flex,
    Image,
    Input,
    FormControl,
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
import logoImage from './Images/logo.png'

import xImg from './Images/xcom.png'
import fbImg from './Images/fb.png'
import tgImg from './Images/telegram.png'
import igImg from './Images/ig.png'

const Footer=()=>{
    return(
        <Box id='footer'>
            <Flex justifyContent='center'>
                <Text fontWeight='500' fontSize='25px'>GET NEWSLETTER</Text>
            </Flex>
            <Flex justifyContent='center'>
                <FormControl>
                    <Input type='email' border='none' placeholder='Your Email' px='10px'
                    outline='none' h='48px' width='350px' backgroundColor='#f1f1f1'
                        borderRadius='10px'
                    />

                    <Flex justifyContent='center' mt='50px'>
                        <Button type='submit' backgroundColor='#2C75FF' h='35px' px='20px'
                        outline='none' border='none' borderRadius='5px' color='white'>SUBSCRIBE</Button>
                    </Flex>
                </FormControl>
                
            </Flex>
            <Flex justifyContent='center' alignItems='center' mt='80px'>
                <Flex justifyContent='space-between' w='80%'>
                    <Flex w='20%'>
                        <Image src={logoImage} width={40}/>
                    </Flex>
                    <Flex w='60%' justifyContent='space-around'>
                        <Text>Home</Text>
                        <Text>Explore</Text>
                        <Text>About</Text>
                        <Text>Contact</Text>
                    </Flex>
                    <Flex w='20%' justifyContent='space-around' alignItems='center'>
                        <Image src={fbImg} w='25px'/>
                        <Image src={igImg} w='25px' />
                        <Image src={tgImg} w='25px'/>
                        <Image src={xImg} w='25px'/>
                    </Flex>

                </Flex>

            </Flex>

            <Flex justifyContent='center' alignItems='center' mb='20px'>
                <Text m={0} fontSize='8px'>CopyRight &#169;, GazeGuard, 2024</Text>
            </Flex>
            
            

        </Box>
    )
}

export default Footer