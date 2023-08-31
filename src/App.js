import { useEffect, useState } from "react";
import {Box,Button,Container,HStack,Input,VStack} from "@chakra-ui/react"
import Message from "./Components/Message"
import { app } from "./firebase";
import {onAuthStateChanged,getAuth,GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth"
import {getFirestore,addDoc, collection, serverTimestamp} from "firebase/firestore"



const auth = getAuth(app);
const db = getFirestore(app);

//sign in with google
const loginHandler =()=>{
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth,provider)
}
//logout
const logoutHandler = ()=> signOut(auth)


const App = () => {

    const[user,setUser] = useState(false);
    //console.log(user);

    //form submit handler
    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            await addDoc(collection(db,"Messages"),{
                text:"adbs",
                user:user.uid,
                uri:user.photoURL,
                createdAt:serverTimestamp()
            
            })

        } catch (error) {
            alert(error);
        }
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(data)=>{
        console.log(data);
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

                <form onSubmit={submitHandler} style={{width:"100%"}}>
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