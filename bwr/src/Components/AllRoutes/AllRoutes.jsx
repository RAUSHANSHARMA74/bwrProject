import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../Home/Home'
import Contact from '../Contact/Contact'
import About from '../About/About'
import NoPage from '../NoPage/NoPage';
import PropertyCardPage from '../PropertyCardPage/PropertyCardPage';
import PropertyDetailPage from '../PropertyDetailPage/PropertyDetailPage';
import Career from '../Career/Career';

function AllRoutes() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/about" element={<About/>} ></Route>
        <Route path="/contact" element={<Contact/>} ></Route>
        <Route path="/property" element={<PropertyCardPage/>} ></Route>
        <Route path="/PropertyDetailPage" element={<PropertyDetailPage/>} ></Route>
        <Route path="/career" element={<Career/>} ></Route>
        <Route path="*" element={<NoPage/>}></Route>
      </Routes>
    </>
  )
}

export default AllRoutes