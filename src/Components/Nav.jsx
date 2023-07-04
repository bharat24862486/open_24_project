import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding={4}
      bg="red.500" 
      color="white"
    >
      <Box fontSize="xl">Order 24*7</Box>
      <Box display="flex" alignItems="center">
        <Input
          placeholder="Search..."
          variant="filled"
          mr={2}
          width="300px"
        />
        <Button colorScheme="red" variant="outline" bgColor={'white'} _hover={{backgroundColor:"red.500", color:"white"}}>Search</Button> {/* Set colorScheme to red and use outline variant */}
      </Box>
      <Flex align="center">
        
        <Box mr={4}>Orders</Box>
        <Link to={'/admin'}><Button  bgColor={'white'} color={'red.500'} mr={4}>Admin</Button></Link>
        <Button bgColor={'white'} color={'red.500'}>Sign-Up</Button> 
      </Flex>
    </Flex>
  );
};

export default Nav;
