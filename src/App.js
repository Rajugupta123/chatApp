import {Box,Button,Center,Container,HStack,Input,VStack} from "@chakra-ui/react"
import Message from "./Components/Message"
import {onAuthStateChanged,getAuth,GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth"
import { app } from "./firebase";
import { useEffect, useState } from "react";

const auth = getAuth(app);

const loginHandler =()=>{
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth,provider)
}

const logoutHandler = ()=> signOut(auth)

const App = () => {

  const[user,setUser] = useState(false);
  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(data)=>{
        setUser(data);
    })
    return ()=>{
        unsubscribe();
    }

  },[])

  return (
    <Box bg={"red.50"}>
        {
            user?(
        <Container h={"100vh"} bg={"#fff"} >
            <VStack h="full" paddingY={2} >
                <Button onClick={logoutHandler} colorScheme={"red"} w={"full"} >
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
            ):<VStack justifyContent={"center"}  h={"100vh"}>
                <Button onClick={loginHandler} color={"#fff"} colorScheme={"purple"}>Sign in With Google</Button>
            </VStack>
        }
    </Box>
  )
}

export default App