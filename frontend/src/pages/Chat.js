import React from 'react'
import { Box } from '@chakra-ui/react'
import ChatBox from '../components/ChatBox'
import ChatList from '../components/ChatList'
import Navbar from '../components/Navbar' 
import { useState } from 'react'
import { ChatState } from '../context/ChatProvider'

const Chat = () => {

  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();
  


  return (
    <div style={{ width: "100%" }}>
      {user && <Navbar />}
      <Box display="flex" flexDir="row" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <ChatList fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  )
}

export default Chat