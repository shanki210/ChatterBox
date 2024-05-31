import React from 'react'
import { ViewIcon } from '@chakra-ui/icons'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, IconButton, Avatar, Text } from '@chakra-ui/react'

const ProfileModal = ({user,children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
        {
            children?(
                <span onClick={onOpen}>{children}</span>
            ):(<IconButton d={{base: "flex"}} icon={<ViewIcon/>} onClick={onOpen} />)
        }
        <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent display='flex' flexDirection='column' alignItems='center'>
                    <ModalHeader>{user.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexDirection='column' alignItems='center'>
                        <Avatar size='2xl' src={user.pic} />
                        <Text>{user.email}</Text>
                    </ModalBody>

                    <ModalFooter >
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
    </div>
  )
}

export default ProfileModal