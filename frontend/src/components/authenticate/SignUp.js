import React, { useState} from 'react'
import { useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, VStack, Button, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import axios from 'axios'

const SignUp = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [profile,setProfile] = useState('');
    const [show, setShow] = React.useState(false)
    const [loading, setLoading] = useState(false);

    const toast = useToast()
    const navigate = useNavigate();

    const handleprofile = (pic) => {
        setLoading(true);
        if(pic === undefined){
            toast({
                title: 'Error!',
                description: "Please upload an image.",
                status: 'warning',
                duration: 9000,
                isClosable: true,
              })
            setLoading(false);
            return;
        }
        if(pic.type==="image/jpeg" || pic.type==="image/png"){
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'chat-app');
            data.append('cloud_name', 'drydxqrlb');
            fetch("https://api.cloudinary.com/v1_1/drydxqrlb/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                setProfile(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
                })
                .catch((err) => {
                console.log(err);
                setLoading(false);
                });
            } else {
                toast({
                    title: "Please Select an Image!",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setLoading(false);
                return;
            }
    }

    const handleSubmit = async ()=>{
        setLoading(true);
        if(!name || !email || !password || !confirmPassword){
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
        if(password !== confirmPassword){
            toast({
                title: "Please enter the same password!",
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
            const {data} = await axios.post('/api/user', {name, email, password, profile}, config);
            toast({
                title: "Registration Successful!",
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
    <VStack spacing={2}>
        <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter your name' type='text' onChange={(e)=>setName(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input placeholder='Enter your email' type='email' onChange={(e)=>setEmail(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={(e)=>setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size='md'>
            <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter confirm password'
                onChange={(e)=>setConfirmPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
                {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl >
            <FormLabel>Upload your profile picture</FormLabel>
            <Input  type='file' accept='image/*' p={1.5} onChange={(e)=>handleprofile(e.target.files[0])} />
        </FormControl>
        <Button w='100%' colorScheme='blue' onClick={handleSubmit} isLoading={loading}>SignUp</Button>
    </VStack>
  )
}

export default SignUp