import { useState, useContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Logo from "../../olx-logo.png";
import "./Signup.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/config";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const firebase = useContext(FirebaseContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
  
    if (!username) {
      setUsernameError("Please enter a username.");
      isValid = false;
    } else if (username.length < 4) {
      setUsernameError("Username should be at least 4 characters long.");
      isValid = false;
    } else {
      setUsernameError("");
    }
  
    if (!email) {
      setEmailError("Please enter an email.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }
  
    if (!phone) {
      setPhoneError("Please enter a phone number.");
      isValid = false;
    } else if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      isValid = false;
    } else {
      setPhoneError("");
    }
  
    if (!password) {
      setPasswordError("Please enter a password.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password should be at least 6 characters long.");
      isValid = false;
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setPasswordError("Password should contain at least one digit and one character.");
      isValid = false;
    } else {
      setPasswordError("");
    }
  
    if (!isValid) {
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = userCredential.user.uid;
        console.log(uid);
        updateProfile(user, { displayName: username })
          .then(() => {
            addDoc(collection(db, "users"), {
              id: uid,
              username: username,
              phone: phone,
            })
              .then(() => {
                navigate("/login");
              })
              .catch((error) => {
                setErrorMessage(error.message);
              });
          })
          .catch((error) => {
            setErrorMessage(error.message);
          });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img style={{marginLeft:'100px'}} width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
          {usernameError ? (
            <p style={{ color: "red" }}>{usernameError}</p>
          ) : null}

          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          {emailError ? <p style={{ color: "red" }}>{emailError}</p> : null}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
          <br />
          {phoneError ? <p style={{ color: "red" }}>{phoneError}</p> : null}

          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <br />
          {passwordError ? (
            <p style={{ color: "red" }}>{passwordError}</p>
          ) : null}
          <br />
          {errorMessage ? (
            <p style={{ color: "red" }}>{errorMessage}</p>
          ) : null}
          <br />
          <button>Signup</button>
        </form>
        <br />
        <a
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </a>
        <br />
      </div>
    </div>
  );
}
