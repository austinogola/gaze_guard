

import React from "react"
import { Box, Text ,Image,Flex,Link} from "@chakra-ui/react"

import logoBackground from './Images/logo.png'
import logoForeGround from './Images/GazeGuard-White.png'


export default function Logo(props) {
  return (
    <Box position='relative'  w='130px'>
      <Link href='/'>
        <Box position='absolute' top='0px' left='25%' >
          <Image src={logoBackground} width={65}/>
        </Box>
        <Box position='absolute' top='18px'>
          <Image src={logoForeGround} width={130}/>
        </Box>

      </Link>
      
                    
     
    </Box>
  )
}