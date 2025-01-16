import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp , query , where, onSnapshot , orderBy} from "firebase/firestore"; 
import { db, auth } from "../firebase-config";


export const Chat = ({room}) => {

    const [messages , setMessages] = useState([]) ; 
    const [newMessage, setNewMessage] = useState(""); 
    const messagesRef = collection(db, "messages");



    useEffect(() => {
        const queryMssg = query(
          messagesRef,
          where("room", "==", room),
          orderBy("createdAt")
        );
        const unsuscribe = onSnapshot(queryMssg, (snapshot) => {
          let messages = []; 
          console.log("Snapshot received: ", snapshot.docs.length); 
          snapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
          });
          console.log(messages);
          setMessages(messages);
        });
    
        return () => unsuscribe();
      }, [room,messagesRef]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === "") return;

        console.log(room);
        
        if (!room) {
            alert("Room is not defined. Please select a valid room.");
            return;
        }

        try {
            await addDoc(messagesRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                room: room,
            });
            setNewMessage(""); // Clear the input field
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        }
    };

    return (
        <div className="chat-app"> 
         <h1 className="chat-app-title"> Chat App ♥️</h1> 
         <h3 className="room-name">{room}</h3>

            <div className="chat-app-message"> {messages.map((message) => 
                
                <p 
                className="message-text"
                key={message.id}><strong style={{fontFamily : 'Lexend'}}>{message.user  || "Anonymous"}</strong> : {message.text}</p>)} 
                
                 </div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className="new-message-input"
                    placeholder="Type your message here..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button 
                    type="submit" 
                    className="submit-btn" 
                    disabled={!newMessage.trim()}
                >
                    Send
                </button>
            </form>
        </div>
    );
};
