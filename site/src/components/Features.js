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

    const SingleFeature=({mainText,expl})=>{
        return (
            <Box w='45%' p='10px' px='20px' mb='50px' minWidth='300px'>
                <Text m='0px' mb='10px' fontSize='25px' fontWeight={500}>{mainText}</Text>
                <Box w='50px' h='2px' backgroundColor='black'></Box>
                <Text m='0px' mt='20px' fontSize='20px' fontWeight={400}>
                    {expl}
                </Text>
            </Box>
        )
    }

    const Features=()=>{
        return(
        <Flex justifyContent='center' id='features' mb='100px' >
            <Flex w='80%' flexWrap='wrap'>
            <SingleFeature mainText='Filter Explicit Media'
                    expl=" Automatically detect and filters out any media content deemed explicit or inappropriate according to your personal or religious standards. Whether you're browsing social media, news websites, or any other online platform, the extension works in real-time to analyze images and videos, blurring or blocking content that doesn't align with your values"                    />

            <SingleFeature mainText='Gender-Based Detection'
            expl="Experience advanced gender-based detection, allowing you to filter content based on the gender of the individuals featured in the media. Whether you want to avoid images or videos that prominently feature men, women, or both, the extension provides precise control over what you see"                    />

            <SingleFeature mainText='Customizable Settings'
                    expl='We understand that everyone has unique needs and preferences, the extension comes with a wide range of customizable settings. You can fine-tune the level of filtering, choose specific types of content to block, and even set different rules for different websites'                    />

            <SingleFeature mainText='Seamless Integration'
            expl='Designed to work effortlessly with your favorite web browsers and online platforms, the extension integrates seamlessly into your daily digital routine. Once installed, it operates quietly in the background, requiring minimal interaction from you'                    />
            
            </Flex>

        </Flex>)
    }


    export default Features