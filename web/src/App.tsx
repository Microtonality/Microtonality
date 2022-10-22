import './index.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  NavLink
} from "react-router-dom";
import * as React from 'react';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Learn />}/>
          <Route path="play" element={<Play />}/>
          <Route path="download" element={<Download />}/>
          <Route path="contact" element={<Contact />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Layout = () => {
  return (
    <>
      <div className="navBar">
        <span id="navTitle">MICROTONAL SYNTHESIZER PROJECT</span>
          <span id="navText">
            <NavLink to="/" className="linkText">LEARN</NavLink>
            <NavLink to="/play" className="linkText">PLAY</NavLink>
            <NavLink to="/download" className="linkText">DOWNLOAD</NavLink>
            <NavLink to="/contact" className="linkText">CONTACT</NavLink>
          </span>
      </div>

      <Outlet />
    </>
  )
}

function Learn() {
  return (
    <h2 style={{color: 'white'}}>Learn</h2>
  )
}

function Play() {
  return <h2 style={{color: 'white'}}>Play</h2>
}

function Download() {
  return <h2 style={{color: 'white'}}>Download</h2>
}

function Contact() {
  return <h2 style={{color: 'white'}}>Contact</h2>
}