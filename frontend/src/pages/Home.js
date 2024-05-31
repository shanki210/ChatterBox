import React from 'react'
import { Container,Box,Text,Center,Tabs,TabList,Tab,TabPanel,TabPanels } from '@chakra-ui/react'
import Login from '../components/authenticate/Login'
import SignUp from '../components/authenticate/SignUp'

const Home = () => {
  return (
    <Container>
        <Center bg='gray.500' h='50px' color='white' mt={8} borderWidth='1.5px' borderRadius='lg'>
           <Text fontSize={"3xl"}>ChatterBox</Text>
        </Center>
        <Box mt={3} borderWidth='1.5px' borderRadius='lg' p={4}>
        <Tabs variant='soft-rounded'  mt={2}>
          <TabList>
            <Tab w='50%'>Login</Tab>
            <Tab w='50%'>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel><Login/></TabPanel>
            <TabPanel><SignUp/></TabPanel>
          </TabPanels>
        </Tabs>
        </Box>
    </Container>
  )
}

export default Home