import {Box,Button,Container,HStack,Input,VStack} from "@chakra-ui/react"
import Message from "./Components/Message"

const App = () => {
  return (
    <Box bg={"red.50"}>
        <Container h={"100vh"} bg={"#fff"} >
            <VStack h="full" paddingY={2} >
                <Button colorScheme={"red"} w={"full"} >
                    Logout
                </Button>

                <VStack h={"full"} w={"full"} overflowY={"auto"} >
                    <Message text={"sample message"}/>
                    <Message user="me" text={"sample message"}/>
                    <Message text={"sample message"}/>
                    <Message text={"sample message"}/>
                    <Message  user="me" text={"sample message"}/>
                    <Message text={"sample message"}/>
                    <Message text={"sample message"}/>
                    <Message  user="me" text={"sample message"}/>
                    <Message text={"sample message"}/>
                    <Message user="me" text={"sample message"}/>
                    <Message text={"sample message"}/>
                </VStack>

                <form style={{width:"100%"}}>
                    <HStack>
                        <Input placeholder="Enter a message..."/>
                        <Button type="submit" colorScheme="purple">
                            send
                        </Button>                        
                    </HStack>
                </form>


            </VStack>
        </Container>
    </Box>
  )
}

export default App