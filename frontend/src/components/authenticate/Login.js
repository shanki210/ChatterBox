import React from 'react'
import { useState} from 'react'
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, VStack, Button, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import axios from 'axios'

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [show, setShow] = useState(false);

    const [loading,setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async ()=>{
        setLoading(true);
        if( !email || !password ){
            toast({
                title: "Please enter all fields!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return
        }
        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            const {data} = await axios.post('/api/user/login', { email, password}, config);
            toast({
                title: "Login Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo",JSON.stringify(data));
            setLoading(false);
            navigate("/chat");
        }catch(error){
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false);
        }
    }
  return (
    <VStack spacing={4}>
        <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input placeholder='Enter your email' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button w='100%' colorScheme='blue' onClick={handleSubmit} isLoading={loading}>Login</Button>
        <Button w='100%' colorScheme='red' onClick={()=>{
            setEmail('jwvXv@example.com');
            setPassword('123456');
        }}>Get Guest Access</Button>
    </VStack>
  )
}

export default Login