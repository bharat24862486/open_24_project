import { Box, Button, FormControl, FormLabel, Input, Stack, Text, useConst } from "@chakra-ui/react";
import axios from "axios";
import { useContext, useRef } from "react";
import { Auth } from "../Context/Auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    
    const formData = useRef({ Email: "", Password: "" });
    let {auth,setAuth,type,setType,info,setInfo} = useContext(Auth)
    const navigate = useNavigate()

    const handleSignIn = () => {
        console.log(formData.current);

        axios.post(`http://localhost:5000/get_user`, formData.current).then((res)=>{
            console.log(typeof res.data)
            if(typeof res.data != "string"){
                console.log('hello')
                setAuth(true)
                setInfo(res.data)
                navigate("/")

            } else{
                alert(res.data)
            }
        }).catch((err)=>console.log(err))
    };

    const handleInputChange = (e, fieldName) => {
        formData.current[fieldName] = e.target.value;
    };

    return (
        <Box bg="white" minH="100vh" display="flex" alignItems="center" justifyContent="center">
            <Box bg="white" rounded="md" p={8} maxW="md" w="full" boxShadow="md">
                <Text fontSize="3xl" fontWeight="bold" textAlign="center" mb={6}>
                    Login
                </Text>
                <Stack spacing={4}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Enter your email" onChange={(e) => handleInputChange(e, "Email")} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Enter your password" onChange={(e) => handleInputChange(e, "Password")} />
                    </FormControl>
                    <Button colorScheme="red" size="lg" fontSize="md" onClick={handleSignIn}>
                        Sign In
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
};
