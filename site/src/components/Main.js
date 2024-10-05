import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Link, Image as ChakraImage } from "@chakra-ui/react";
import Navbar from "./Navbar";
import mainImage from "./Images/main.png";
import arrowsImage from "./Images/arrows.png";
import "../App.css";

const LazyImage = ({ src, alt, className, ...rest }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => setImageSrc(src);
    img.onerror = () => setError(true);

    return () => {
      setImageSrc(null);
      setError(false);
    };
  }, [src]);

  return error ? (
    <div
      className={`error-placeholder ${className}`}
      style={{ width: "100%", height: "100%" }}
    >
      <p>Error loading image</p>
    </div>
  ) : imageSrc ? (
    <ChakraImage
      src={imageSrc}
      alt={alt}
      className={className}
      {...rest}
      loading="lazy"
    />
  ) : (
    <div
      className={`image-placeholder ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

const Links = ["Home", "Explore", "Contact", "Pricing"];

const Main = () => {
  return (
    <Box
      padding="0px"
      backgroundImage={`url(${mainImage})`}
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
          Use Our AI-trained smart filter to protect you from unwanted content,
          so you can surf safely.
        </Text>
      </Flex>

      <div className="arrowsBottom">
        <Link href="#features">
          <LazyImage src={arrowsImage} w="70px" cursor="pointer" />
        </Link>
      </div>
    </Box>
  );
};

export default Main;
