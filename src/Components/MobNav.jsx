import { useContext, useState } from 'react';
import {
    Box,
    Flex,
    Spacer,
    IconButton,
    Icon,
    Collapse,
    Text,
    ChakraProvider,
    Heading,
    Button,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';


import { Auth } from '../Context/Auth';
import { Link } from 'react-router-dom';


const MabNav = () => {
    let {hamburger, setHamburger, auth, setAuth, info,setInfo} = useContext(Auth)

    const toggleNavbar = () => {
        setHamburger(!hamburger);
    };
    function logout(){
        setAuth(false)
        setInfo({})
      }

    return (

        <Box bg="red.500" py={2} position={'sticky'} top={'0'} color={'white'}>
            <Flex align="center" px={4} justifyContent={'space-between'}>
            <IconButton bgColor={'red.500'} onClick={toggleNavbar} _hover={{backgroundColor:'red.500'}}>{hamburger? <ImCross color={'white'}/>: <GiHamburgerMenu color={'white'}/>}</IconButton>
            <Link to={'/'}><Heading fontSize={['1.2rem','1.5rem','1.8rem','2rem']}>Order 24*7</Heading></Link>
                {/* <Spacer /> */}
                
            </Flex>
            {hamburger? <Box>
                <Box
                    py={2}
                    pl={4}
                    bgColor={'red.400'}
                    w="100%"
                    pos="absolute"
                    top="50px"
                    left={hamburger ? 0 : '-100%'}
                    transition="left 0.5s ease-in-out"
                    minHeight="100vh"
                    
                    
                >
                    {auth?<Button onClick={logout} bgColor={'white'} color={'red.500'}>Log-Out</Button> : <Link to={'/login'}><Button bgColor={'white'} color={'red.500'}>Login</Button> </Link>}
                    <Flex mt={['10%']} h={'50vh'} flexDirection={'column'} justifyContent={'space-around'}>
                        <Text fontSize={['1.1rem']} borderBottom={'0.5px solid white'}>Oders</Text>
                        <Text fontSize={['1.1rem']} borderBottom={'1px solid white'}>Trace Order</Text>
                        <Text fontSize={['1.1rem']} borderBottom={'1px solid white'}>About Us</Text>
                        <Text fontSize={['1.1rem']} borderBottom={'1px solid white'}>Contact Us</Text>
                        <Text fontSize={['1.1rem']} borderBottom={'1px solid white'}>FQA</Text>
                    </Flex>

                </Box>
            </Box>:''}


        </Box>

    );
};

export default MabNav;
