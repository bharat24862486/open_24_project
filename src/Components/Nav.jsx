import { Box, Flex, Input, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Auth } from "../Context/Auth";
import { useContext } from "react";

const Nav = () => {
  let {auth,setAuth,type,setType,info,setInfo} = useContext(Auth)


  function logout(){
    setAuth(false)
    setInfo({})
  }


  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding={4}
      bg="red.500" 
      color="white"
    >
      <Link to={'/'}><Heading fontSize={['2rem','1.5rem','1.8rem','2rem']}>Order 24*7</Heading></Link>
      <Box display="flex" alignItems="center">
        <Input
          placeholder="Search..."
          variant="filled"
          mr={2}
          width="100%"
        />
        <Button colorScheme="red" variant="outline" bgColor={'white'} _hover={{backgroundColor:"red.500", color:"white"}}>Search</Button> {/* Set colorScheme to red and use outline variant */}
      </Box>
      <Flex align="center">
        
      {auth && info.Role == "User"? <Link to={'/'}><Box cursor={'pointer'} mr={4}>{info.Name}</Box></Link>:''}
        {auth && info.Role == "User"? <Link to={'/trace'}><Box cursor={'pointer'} mr={4}>Trace Order</Box></Link>:''}
        {auth && info.Role == "User"? <Link to={'/orders'}><Box cursor={'pointer'} mr={4}>Orders</Box></Link>:''}
        {auth && info.Role == "User"? <Link to={'/cart'}><Box cursor={'pointer'} mr={4}>Cart</Box></Link>:''}
        {auth && info.Role == "Admin"? <Link to={'/adminallorder'}><Box cursor={'pointer'} mr={4}>Orders</Box></Link>:''}
        {auth && info.Role == "Admin"? <Link to={'/adminorder'}><Box cursor={'pointer'} mr={4}>Pendings</Box></Link>:''}
        {auth && info.Role=="Admin"? <Link to={'/admin'}><Button  bgColor={'white'} color={'red.500'} mr={4}>Add Item</Button></Link>:''}
        {auth?<Button onClick={logout} bgColor={'white'} color={'red.500'}>Log-Out</Button> : <Link to={'/login'}><Button bgColor={'white'} color={'red.500'}>Login</Button> </Link>}
        {/* <Link to={'/login'}><Button bgColor={'white'} color={'red.500'}>Login</Button> </Link> */}
      </Flex>
    </Flex>
  );
};

export default Nav;
