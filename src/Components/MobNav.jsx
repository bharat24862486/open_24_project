import { useContext, useRef, useState } from 'react';
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
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ImCross } from 'react-icons/im';


import { Auth } from '../Context/Auth';
import { Link } from 'react-router-dom';


const MabNav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let { hamburger, setHamburger, auth, setAuth, info, setInfo } = useContext(Auth)

    let btnRef = useRef()

    const toggleNavbar = () => {
        setHamburger(!hamburger);
    };
    function logout() {
        setAuth(false)
        setInfo({})
    }

    return (

        <Box bg="red.500" py={2} position={'sticky'} top={'0'} color={'white'}>
            <Flex align="center" px={4} justifyContent={'space-between'}>
                <IconButton bgColor={'red.500'} onClick={onOpen} _hover={{ backgroundColor: 'red.500' }}>{hamburger ? <ImCross color={'white'} /> : <GiHamburgerMenu color={'white'} />}</IconButton>
                <Link to={'/'}><Heading fontSize={['1.2rem', '1.5rem', '1.8rem', '2rem']}>Order 24*7</Heading></Link>
                {/* <Spacer /> */}

            </Flex>
            {/* {hamburger? <Box>
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
            </Box>:''} */}
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bgColor={'red.500'} color={'white'}>
                    <DrawerCloseButton />
                    <DrawerHeader>Open24*7</DrawerHeader>

                    <DrawerBody>
                        {auth && info.Role == "User" ? <Link to={'/'}><Box cursor={'pointer'}  onClick={()=>onClose()} mr={4}>{info.Name}</Box></Link> : ''}
                        {auth && info.Role == "User" ? <Link to={'/trace'}><Box  marginTop={['10%']}  onClick={()=>onClose()} cursor={'pointer'} mr={4}>Trace Order</Box></Link> : ''}
                        {auth && info.Role == "User" ? <Link to={'/orders'}><Box  marginTop={['10%'] } onClick={()=>onClose()} cursor={'pointer'} mr={4}>Orders</Box></Link> : ''}
                        {auth && info.Role == "User" ? <Link to={'/cart'}><Box onClick={()=>onClose()} marginTop={['10%']} cursor={'pointer'} mr={4}>Cart</Box></Link>:''}
                        {auth && info.Role == "Admin" ? <Link to={'/adminallorder'}><Box  marginTop={['10%']}  onClick={()=>onClose()} cursor={'pointer'} mr={4}>Orders</Box></Link> : ''}
                        {auth && info.Role == "Admin" ? <Link to={'/adminorder'}><Box  marginTop={['10%']}  onClick={()=>onClose()} cursor={'pointer'} mr={4}>Pendings</Box></Link> : ''}
                        {auth && info.Role == "Admin" ? <Link to={'/admin'}><Box color={'white'} onClick={()=>onClose()}  marginTop={['10%']} mr={4}>Add Item</Box></Link> : ''}
                        <Text marginTop={['10%']} fontSize={['1.1rem']}>About Us</Text>
                        <Text marginTop={['10%']} fontSiz10={['1.1rem']}>Contact Us</Text>
                        <Text marginTop={['10%']} fontSize={['1.1rem']}>FQA</Text>
                    </DrawerBody>

                    <DrawerFooter>
                    {auth?<Button onClick={logout} bgColor={'white'} color={'red.500'}>Log-Out</Button> : <Link to={'/login'}><Button bgColor={'white'} color={'red.500'}>Login</Button> </Link>}
                        {/* <Button colorScheme='blue'>Save</Button> */}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>




        </Box >

    );
};

export default MabNav;
