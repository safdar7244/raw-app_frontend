import { Navbar } from 'react-bootstrap/Navbar';
import React,{useContext}  from 'react';
import Header from './Components/Header.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter
} from "react-router-dom";
import 'antd/dist/antd.css'
import Users from './Components/Users'
import NavBar from "./Components/NavBar"
import AllContent from "./Components/AllContent"
import NewUsers from "./Components/NewUser"
import UserDetails from "./Components/UserDeatails"
import RecentVideos from "./Components/RecentVideos"
import Sidebar from "./Components/Sidebar"
import UserDet from "./Components/UserDet"
import LogIn from "./Components/LogIn"
import VideoDetails from "./Components/VideoDetails";
import FlaggedContent from './Components/FlaggedContent.js';
import VideoDetails1 from "./Components/VideoDetails1";
import DeletedUsers from './Components/DeletedUsers.jsx';
import {AuthContext,AuthProvider} from "./context/AuthContext";
import { FetchProvider } from './context/FetchContext';
import Videos from "./Components/Videos";
import Stats from "./Components/Stats"
import ImageCarousel from "./Components/ImagesCarousels"
import BannedUsers from './Components/BannedUsers'
import ReportedVideoDetails from './Components/ReportedVideoDetails.js';
import 'bootstrap/dist/css/bootstrap.min.css';

 const ProtectedRoute = ({component: Component,...rest}) => {
  const auth = useContext(AuthContext);
  console.log(auth.isAuthenticated());
  console.log(rest.path);
  console.log(Component);
  	return (
        <Route {...rest}
        render={(props) => 
            auth.isAuthenticated() ?(
                <Component {...props} />
            ):(
              <Redirect to="/login" />
            )
          }
          />
          
    );

}

const SideBar = () =>{
 const auth = useContext(AuthContext);
 console.log(auth.isAuthenticated())
  return(
    <>
    {auth.isAuthenticated()? <Sidebar/> :null }
    </>
  );

}


function App() {
  return (
    <div className="App">
    <Router>
      <AuthProvider>
          
      <FetchProvider>
          {  <SideBar/> }
          <Switch>
              <Route path="/videos/:id" exact component={VideoDetails1}/>
              <ProtectedRoute path="/users/:id" exact component={UserDetails}  render={props => 
                <UserDetails {...props} />} />
              <ProtectedRoute path="/reportedvideos/:id" exact component={ReportedVideoDetails}  render={props => 
                <ReportedVideoDetails {...props} />} />
              <ProtectedRoute path="/newusers" exact component={NewUsers} />
              <ProtectedRoute path="/bannedusers" exact component={BannedUsers} />
              <ProtectedRoute path="/deletedusers" exact component={DeletedUsers} />
              <ProtectedRoute path="/allcontent" exact component={AllContent} />
              <ProtectedRoute path="/newvideos" exact component={RecentVideos} />
              <ProtectedRoute path="/flagggedcontent" exact component={FlaggedContent} />
              <ProtectedRoute path="/stats" exact component={Stats} />
              <Route path="/login" exact component={LogIn} />

              <ProtectedRoute path="/" exact component={Users} />

            </Switch>
            </FetchProvider>
          </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
