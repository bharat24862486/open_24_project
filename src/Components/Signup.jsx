import React, { useContext, useRef, useState } from 'react';
import { Input, Button, FormControl, FormLabel, Stack, Box, Text, Flex } from "@chakra-ui/react";
import { Auth } from '../Context/Auth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

let url = "https://open24.onrender.com"

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formData = useRef({ Email: "", Password: "", Name:"", Role:"User" });
    let { auth, setAuth, type, setType, info, setInfo } = useContext(Auth)
    const navigate = useNavigate()

    const handleSignIn = () => {
        console.log(formData.current);
        formData.current.Role = "User"

        axios.post(`${url}/set_user`, formData.current).then((res) => {
            console.log(res.data)
            navigate("/login")
            
        }).catch((err) => console.log(err))
    };

    const handleInputChange = (e, fieldName) => {
        formData.current[fieldName] = e.target.value;
    };

    return (
        <Box bg="white" minH="100vh" display="flex" alignItems="center" justifyContent="center">
            <Box bg="white" rounded="md" p={8} maxW="md" w="full" boxShadow="md">
                <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
                    Sign-Up
                </Text>
                <Stack spacing={4}>
                <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" placeholder="Enter your email" onChange={(e) => handleInputChange(e, "Name")} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Enter your email" onChange={(e) => handleInputChange(e, "Email")} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Enter your password" onChange={(e) => handleInputChange(e, "Password")} />
                    </FormControl>
                    <Button colorScheme="red" size="lg" fontSize="md" onClick={handleSignIn}>
                        Sign Up
                    </Button>
                </Stack>
                <Flex mt={'2%'}>
                    <Text>Already have account?&nbsp;&nbsp;</Text>
                    <Link to={'/login'}><Text color={'blue.500'}>Login</Text></Link>
                </Flex>
            </Box>
        </Box>
    );
};

export default Signup;
