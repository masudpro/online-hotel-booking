import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';




const Login = () => {
    const [newUser, setNewUser] = useState(true);
    const [user, setUser] = useState({

        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })

    const onBlur = (e) => {
        let fieldValid = true;
        if (e.target.name === 'name') {
            const nameValid = e.target.value.length > 3;
            fieldValid = nameValid;
        }
        if (e.target.name === 'email') {
            fieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const passwordValidation = e.target.value.length > 6;
            const passwordValid = /\d{1}/.test(e.target.value);
            fieldValid = passwordValid && passwordValidation;
        }
        if (fieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.name && user.password && user.email) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo)
                    history.replace(from);
                })
                .catch(error => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }

        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);

                 setLoggedInUser(newUserInfo)
                history.replace(from);
                })
                .catch(function (error) {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });

        }
        e.preventDefault();
    }


    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    
    var provider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    const habdleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email, photoURL, password } = result.user;
            const singedInUser = { name: displayName, email: email, photo: photoURL, password: password };
            setLoggedInUser(singedInUser);
            history.replace(from);
            var user = result.user;
            console.log('login', user.photoURL)

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;

        });
    }
// handle facebook;
const habdleFacebookSignIn = () => {
    firebase.auth().signInWithPopup(fbProvider)
    .then(result => {
        var token = result.credential.accessToken;
        var user = result.user;
        setUser(user)
        setLoggedInUser(user)
        history.replace(from);

    console.log('facebook check', user);
        
      }).catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
      });
 }


    return (
        <div className="pt-5 mt-5">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-9 col-md-8 col-lg-6">
                        <div className="p-4  p-sm-5">
                            <img src={user.photoURL} alt="" />

                            <p>Name: {user.name}</p>
                            <form className="loginForm" onSubmit={handleSubmit}>

                                <div className="form-group">
                                    {newUser && <input onBlur={onBlur} type="text" name="name" className="form-control" placeholder="First Name" required />}
                                    {newUser && <input onBlur={onBlur} type="text" name="name" className="form-control" placeholder="Last Name" required />}


                                    <input onBlur={onBlur} type="email" name="email" className="form-control" placeholder="name@example.com" required />
                                    <input onBlur={onBlur} name="password" type="password" className="form-control" placeholder="Password" required />

                                    {newUser && <input onBlur={onBlur} name="retypePassword" type="password" className="form-control" placeholder="Confirm Password" required />}
                                    
                                    
                                    <label   className="pr-2 text-danger">{newUser ? user.error : ' '} </label>
                                    {/* <button onClick={handleSubmit} type="submit" > Submit </button> */}
                                    <input type="submit" className="form-control submitButton" value="SUBMIT" />
                                </div>
                               
                            </form>

                            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
                            <label  className="pr-2">{newUser ? ' Already have Account' : ' please Login'} </label>

                            <div className="">
                                <button className="signInButton" onClick={habdleGoogleSignIn}>Google Sign In</button>
                                <button className="signInButton" onClick={habdleFacebookSignIn}>Facebook Sign In</button>
                            </div>

                            
                           
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};
export default Login;