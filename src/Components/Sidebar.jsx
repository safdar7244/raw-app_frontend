import React from 'react'
import { NavLink,Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import FlagIcon from '@material-ui/icons/Flag';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import BlockIcon from '@material-ui/icons/Block';
import DeleteIcon from '@material-ui/icons/Delete';
function Sidebar() {

 return (
  <div>
   <div className="sidebar">
   <h1><img src='../logo.svg' alt="bpga"/> </h1>
   {/* <NavLink className="links" activeClassName='linksactive' to="/" exact={true}><img src='../icon_psd.png' alt="bpga"/> </NavLink> */}
   <NavLink className="links" activeClassName='linksactive' to="/" exact={true}> <AccountCircleIcon/>&nbsp; &nbsp;&nbsp;Users</NavLink>
   <NavLink className="links" activeClassName='linksactive' to="/allcontent"><BorderAllIcon/>&nbsp;&nbsp;&nbsp; All Content</NavLink>
   <NavLink className="links" activeClassName='linksactive' to="/stats"> <EqualizerIcon/>&nbsp;&nbsp;&nbsp;  Stats</NavLink>
   <NavLink className="links" activeClassName='linksactive' to="/newusers"><PersonAddIcon/>&nbsp;&nbsp;&nbsp;  New Users</NavLink>
   <NavLink className="links" activeClassName='linksactive' to="/newvideos"><VideoLibraryIcon/>&nbsp;&nbsp;&nbsp;  New Videos</NavLink>
   <NavLink className="links" activeClassName='linksactive' to="/flagggedcontent"><FlagIcon/>&nbsp;&nbsp;&nbsp;  Flagged Content</NavLink>
   <NavLink className="links" activeClassName='linksactive' to="/bannedusers"><BlockIcon/>&nbsp;&nbsp;&nbsp;  Banned Users</NavLink>
  <NavLink className="links" activeClassName='linksactive' to="/deletedusers"><DeleteIcon/>&nbsp;&nbsp;&nbsp;  Deleted Users</NavLink>
 </div>

  </div>
 )
}

export default Sidebar
