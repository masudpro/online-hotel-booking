import React, { createContext, useState } from 'react';
import './App.css';
import News from './Components/News/News';
import Header from './Components/Header/Header';
import Blog from './Components/Blog/Blog';
import Destination from './Components/Destination/Destination';
import Contact from './Components/Contact/Contact';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PlaceDetails from './Components/PlaceDetails/PlaceDetails';
import RoomDetails from './Components/RoomDetails/RoomDetails';
import NoFound from './Components/NoFound/NoFound';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = React.createContext();
function App() {
   const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div className="App">
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
 
      <Router>
       <Header></Header>
        <Switch>
          <Route path="/news" >
             <News></News>
          </Route>
          <Route path="/destination" >
             <Destination></Destination>
          </Route>
          <Route path="/blog" >
             <Blog></Blog>
          </Route>
          <Route path="/contact" >
             <Contact></Contact>
          </Route>
          
          <Route path="/placedetails/:placedetail" >
             <PlaceDetails></PlaceDetails>
          </Route>
          <PrivateRoute path="/roomdetails/:roomdetail" >
             <RoomDetails></RoomDetails>
          </PrivateRoute>
          <Route path="/news" >
             <News></News>
          </Route>
          <Route path="/login" >
             <Login></Login>
          </Route>
          <Route exact path="/" >
             <News></News>
          </Route>
          <Route path="*" >
            <NoFound></NoFound>
          </Route>

   
          
         
           
        </Switch>
      </Router>
    
   </UserContext.Provider>
       
    </div>
  );
}

export default App;
