import { useEffect, useRef, useState } from "react";
import {Box,Button,Container,HStack,Input,VStack} from "@chakra-ui/react"
import Message from "./Components/Message"
import { app } from "./firebase";
import {onAuthStateChanged,getAuth,GoogleAuthProvider,signInWithPopup,signOut} from "firebase/auth"
import {getFirestore,addDoc, collection, serverTimestamp,onSnapshot,query,orderBy} from "firebase/firestore"



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
    const[message,setMessage] = useState("");
    const[messages,setMessages] = useState([]);

    const divForScroll = useRef(null);

    //form submit handler
    const submitHandler = async(e)=>{
        e.preventDefault();
        try {
            setMessage("");
            await addDoc(collection(db,"Messages"),{
                text:message,
                user:user.uid,
                uri:user.photoURL,
                createdAt:serverTimestamp()
            
            });
        
            divForScroll.current.scrollIntoView({behavior:"smooth"})
        } catch (error) {
            alert(error);
        }
    }

    useEffect(()=>{
        const q = query(collection(db,"Messages"),orderBy("createdAt","asc"));
        const unsubscribe = onAuthStateChanged(auth,(data)=>{
        //console.log(data);
        setUser(data);
    })

    const unsubscribeForMessage =  onSnapshot(q,(snap)=>{
        setMessages(snap.docs.map((item)=>{
            const id = item.id;
            return {id,...item.data()};
        }));
    })

    return ()=>{
        unsubscribe();
        unsubscribeForMessage();
    }

    },[])

  return (
    <Box bg={"red.50"}>
        {
            user?(
        <Container h={"100vh"} bg={"#fff"} >
            <VStack h="full" paddingY={2} >
                <Button  value={message} onClick={logoutHandler} colorScheme={"red"} w={"full"} >
                    Logout
                </Button>

                <VStack h={"full"} w={"full"} overflowY={"auto"} css={{"&::-webkit-scrollbar":{
                    display:"none",
                },
                }}>
                    {/* <Message text={"sample message"}/>
                    <Message user="me" text={"sample message"}/>
                    <Message text={"sample message"}/>
                    <Message text={"sample message"}/>
                    <Message  user="me" text={"sample message"}/>
                     */}

                     {
                        messages.map((item)=>(
                            <Message key={item.id} user={item.user === user.uid?"me":"other"} text={item.text} uri={item.uri} />
                        ))
                     }

                     <div ref={divForScroll}></div>
                </VStack>

                <form onSubmit={submitHandler} style={{width:"100%"}}>
                    <HStack>
                        <Input onChange={(e)=>setMessage(e.target.value)} placeholder="Enter a message..."/>
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