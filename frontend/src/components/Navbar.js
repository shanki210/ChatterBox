import React from 'react'
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip, Text, Button, Menu, MenuButton, MenuList, MenuItem,MenuDivider, Avatar,Input, useToast } from '@chakra-ui/react'
import { BellIcon, SearchIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../context/ChatProvider';
import ProfileModal from './ProfileModal';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { useRef, useState } from 'react';
import axios from 'axios';
import ChatLoader from './ChatLoader';
import UserList from './UserList';

const Navbar = () => {

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const navigate = useNavigate()
  const toast = useToast();

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();
  console.log(user)

  const handleLogout = ()=>{
   //localStorage.removeItem("userInfo")
    navigate("/")
  }

  const handleSearch = async() => {
    if(!search){
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      })
      return;
    }
    try{
      setLoading(true);
      const config = {
        headers: {
          Authorization : `Bearer ${user.token}`
        },
      };
      const {data} = await axios.get(`/api/user?search=${search}`,config);
      console.log(data)
      setSearchResult( data);
      setLoading(false);
    }catch(error){
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
      setLoading(false);
    }

  }
  const handleClick = async (userId) => {
    console.log(userId);

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoading(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <div>
      <Box
        w="100%"
        bg="black"
        color="white"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={4}
        >
        <Tooltip label="Search">
          <Button  ref={btnRef}  onClick={onOpen}>
            <SearchIcon/>
            <Text display={{ base: "none", md: "flex" }} px={4}>Search</Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl">ChatterBox</Text>
        <div>
          <Menu>
            <MenuButton>
              <BellIcon mr={4} />
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                
              />
            </MenuButton>
            <MenuList>
                <ProfileModal user={user}>
                    <MenuItem><Text color={'black'}>My Profile</Text></MenuItem>{" "}
                </ProfileModal>
              <MenuDivider /> 
              <MenuItem>
                <Button onClick={handleLogout}>LogOut</Button>
              </MenuItem>
              
            </MenuList>
          </Menu>

        </div>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody display="flex" gap = "2" flexDirection="column">
          <Box display="flex" gap = "2">
            <Input placeholder='Search user name or email' onChange={(e)=>setSearch(e.target.value)} />
            <Button onClick={handleSearch}>Go</Button>
          </Box>
            {
              loading ? (
                <div><ChatLoader/></div>
              ):(
                searchResult?.map((user)=>(
                  <UserList key={user._id} user={user} handleFunction={()=>handleClick(user._id)} />
                ))
              )
            }
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Navbar