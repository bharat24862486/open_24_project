import { Box, Button, Heading } from "@chakra-ui/react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
// import successGif from "./success.gif";

const PaymentSuccessPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="white"
      mt={'2%'}
      
    >
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
      />
      <Box
        bg="white"
        rounded="md"
        p={8}
        maxW="md"
        w="full"
        boxShadow="md"
        display="flex"
        flexDirection="column"
        alignItems="center"
        textAlign="center"
        // border={'1px solid red'}
      >
        <Heading as="h1" size="xl" color="red.500" mb={6}>
          Payment Successful!
        </Heading>
        <img src='https://i.gifer.com/XD4x.gif' alt="Success GIF" width="300" height="300" />
      </Box>

      <Box m={'auto'}>
        <Link to={'/'}><Button bgColor={'red.500'} color={'white'} _hover={{backgroundColor:"red.700"}}> Back to Shopping</Button></Link>
      </Box>
    </Box>
  );
};

export default PaymentSuccessPage;
