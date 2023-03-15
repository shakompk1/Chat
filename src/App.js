import "./App.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState } from "react";

firebase.initializeApp({
    apiKey: "AIzaSyC0y6Pb1IOmJ2Ie4gh3q55_CUtnpECR5u0",
    authDomain: "friends-chat-6c791.firebaseapp.com",
    databaseURL:
        "https://friends-chat-6c791-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "friends-chat-6c791",
    storageBucket: "friends-chat-6c791.appspot.com",
    messagingSenderId: "858657768018",
    appId: "1:858657768018:web:6c01af63e83a773222558b",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
    const [user] = useAuthState(auth);
    return (
        <div className="App">
            <header className="App-header">
                <section>{user ? <SignOut /> : <SignIn />}</section>
            </header>
            <main>
                <ChatRoom />
            </main>
        </div>
    );
}

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    };
    return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}
function SignOut() {
    return (
        auth.currentUser && (
            <button onClick={() => auth.signOut()}>Sign Out</button>
        )
    );
}
function ChatRoom() {
    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);

    const [messages] = useCollectionData(query, { idField: "id" });
    const [formValue, setFormValue] = useState("");

    const sendMessage = async (e) => {
        e.preventDefault();
        const { uid, photoUrl } = auth.currentUser;
        console.log(auth.currentUser.displayName);

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setFormValue("");
    };

    return (
        <>
            <div>
                {messages &&
                    messages.map((msg) => <p key={msg.id}>{msg.text}</p>)}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </>
    );
}

export default App;
