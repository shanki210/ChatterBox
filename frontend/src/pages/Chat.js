import React from 'react'
import { Box } from '@chakra-ui/react'
import ChatBox from '../components/ChatBox'
import ChatList from '../components/ChatList'
import Navbar from '../components/Navbar' 

const Chat = () => {
  return (
    <div style={{display: "flex", flexDirection: "column", height: "100vh", width: "100vw"}}>
      <Navbar/>
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="90vh"
      >
        <ChatList/>
        <ChatBox/> 
      </Box>
    </div>
  )
}

export default Chat