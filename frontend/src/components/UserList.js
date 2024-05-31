import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'

const UserList = ({user,handleFunction}) => {
  return (
    <Box
        onClick={handleFunction}
        display="flex"
        alignItems="center"
        cursor="pointer"
        bg="#E8E8E8"
        _hover={{
            background: "#38B2AC",
            color: "white",
        }}
        w="92%"
        p={3}
        borderRadius="lg"
        borderWidth="3px"
        m={2}
        gap={3}
    >
        <Avatar size='md' name={user.name} src={user.pic} />
        <Box>
            <Text>{user.name}</Text>
            <Text fontSize="xs">{user.email}</Text>
        </Box>
    </Box>
  )
}

export default UserList