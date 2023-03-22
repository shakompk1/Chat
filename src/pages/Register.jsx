import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { auth, storage, db } from "../firebase";
import Add from "../img/addAvatar.png";

const Register = () => {
    const [err, setErr] = useState(false);
    const navigation = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        console.log(file);
        try {
            const res = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );

            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(true);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadURL) => {
                            await updateProfile(res.user, {
                                displayName,
                                photoURL: downloadURL,
                            });
                            await setDoc(doc(db, "users", res.user.uid), {
                                uid: res.user.uid,
                                displayName,
                                email,
                                photoURL: downloadURL,
                            });
                            await setDoc(
                                doc(db, "userChats", res.user.uid),
                                {},
                            );
                            navigation("/");
                        },
                    );
                },
            );
        } catch (err) {
            setErr(true);
        }
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">Friends Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="display name" />
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="avatar"
                    />
                    <label htmlFor="avatar">
                        <img src={Add} alt="addImg" />
                        <span>Add an avatar</span>
                    </label>
                    <button type="submit">Sign up</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    You do have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
