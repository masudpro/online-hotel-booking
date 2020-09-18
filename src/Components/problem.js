import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import './Login.css';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import fbIcon from '../../Image/Icon/fb.png';
import googleIcon from '../../Image/Icon/google.png';


firebase.initializeApp(firebaseConfig);
const LogIn = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })

    //constext api;
    const [logedInUser, setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const gProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(gProvider)
        .then( res => {
            console.log('res', res);
            const {photoURL, displayName, email} = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            setUser(signedInUser)
            setLoggedInUser(signedInUser)
            history.replace(from);
            // console.log(photoURL, displayName, email);
        })
        .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // console.log(errorMessage, errorCode);
          });
    }

const handleSignOut = () => {
    // console.log('checked');
    firebase.auth().signOut()
    .then(res => {
        const signOutUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: ''
        }
        setUser(signOutUser);
    })
}
// handle facebook;
 const handleFb = () => {
    firebase.auth().signInWithPopup(fbProvider)
    .then(result => {
        var token = result.credential.accessToken;
        var user = result.user;
        setUser(user)
        setLoggedInUser(user)
        history.replace(from);
      }).catch(function(error) {
        var errorMessage = error.message;
        // console.log(errorMessage);
      });
 }



const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
        isFieldValid= /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
    const isPassWordValid = e.target.value.length > 6;
    const passwordHasNumber = /\d+/.test(e.target.value);
    isFieldValid = isPassWordValid && passwordHasNumber;
    }
    if (isFieldValid) {
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
    }
}
    const handleSubmit = (e) => {
        // console.log(user.email, user.password);
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name)
            })
            .catch( error => {
                const newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
              });
        }
        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo); 
                setLoggedInUser(newUserInfo)
                history.replace(from);
                // console.log(res.user);
            })
            .catch(error => {
                const newUserInfo = {...user}
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)
              });
        }
        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: name,
          // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(function() {
          // Update successful.
        //   console.log('user name update successfully');
        }).catch(function(error) {
          // An error happened.
        //   console.log(error);
        });
      }

    return (
        <div className="login">
            {
                user.isSignedIn && <p>welcome {user.name}</p>
            }
            <div style={{textAlign:'center', marginLeft: '300px'}}>
            <form style={{width:'600px'}} onSubmit={handleSubmit}>
                <input onChange={()=> setNewUser(!newUser)} type="checkbox" name="newUser" id=""/>
                <label htmlFor="newUser"><h2>Register</h2></label>
                <br/>
                <h2>{newUser ? 'Create an account' : 'Login'}</h2>
                <br/>
                {newUser && <input className="form-control" type="text" name="name" onBlur={handleBlur} placeholder="Enter Your First Name" required/>}
                <br/>
                {newUser && <input className="form-control" type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Last Name" required/>}
                <br/>
                <input type="text" className="form-control" name="email" onBlur={handleBlur} required placeholder="Your Email Address"/>
                <br/>
                <input type="password" className="form-control" name="password" onBlur={handleBlur} required placeholder="Your Password" id=""/>
                {newUser && <button className="btn btn-warning">Create an account</button>}
               <div className="font-bottom">
                    <div>
                    <input type="checkbox" name="newUser" id=""/>
                    <label htmlFor="newUser"><p><small style={{color: 'black'}}>Remember Me</small></p></label>
                    </div>
                    <p className="text-warning">Forget password</p>
               </div>
                <input type="submit" className="form-control bg-warning" value={!newUser && "Login"}/>
                <div className="font-bottom">
                    <p>Don't have an account?</p>
                    <input onChange={()=> setNewUser(!newUser)} type="checkbox" name="newUser" id=""/>
                <label htmlFor="newUser"><p>Create an account</p></label>
                </div>
            </form>
            </div>
            <p style={{color: 'red'}}>{user.error}</p>
            {
                user.success && <p style={{color: 'green'}}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>
            }
            <div className="duel-style">
                <img style={{width:'25px'}} src={fbIcon} alt=""/>
                <button onClick={handleFb}>Continue with Facebook</button>
            </div>
            <div className="duel-style">
                <img style={{width:'25px'}} src={googleIcon} alt=""/>
                {
                    user.isSignedIn ? <button onClick={handleSignOut}>Continue with Google</button> : <button onClick={handleSignIn}>Continue with Google</button>
                }
            </div>
        </div>
    );
};
export default LogIn;