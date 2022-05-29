import React from "react";
import Nav from "../Component/Nav";
import Banner from "../Component/Banner";
import Row from "../Component/Row";
import "../Css/HomeScreen.css";
import Footer from "../Component/Footer";


function Homescreen() {
  
  return (
    <div className="homescreen">
      <Nav />
      <Banner />
      <Row movietype="recommended" title="Recommended" method ="get" />
      <Row movietype="intheater" title="In Theater" method ="get" />
      <Row movietype="upcoming" title="Upcoming" method ="get" />
      <Row movietype="explore" title="Explore" method ="get" /> 
      <Footer/>
    </div>
  );
}

export default Homescreen;
