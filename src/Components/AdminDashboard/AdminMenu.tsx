import React, { useState } from "react";
import { Link } from "react-router-dom";
import adminStyle from "./adminDashboard.module.css";

const AdminMenu = () => {
  return (
    <React.Fragment>
      <div className={adminStyle.container}>
        <Link to="/adminallsong">VIEW/ADD ALLSONG</Link>
        <Link to="/genreadmin" >VIEW/ADD Genre</Link>
        <Link to="/artistadmin" >VIEW/ADD Artist</Link>
        <Link to="/podcastadmin" >VIEW/ADD Podcast</Link>
        <Link to="/pdcategoriesAdmin">VIEW/ADD Podcast Category</Link>
      </div>
    </React.Fragment>
  )
}

export default AdminMenu