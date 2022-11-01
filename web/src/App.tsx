import './index.css';
import {
  BrowserRouter,
  Route,
  NavLink
} from "react-router-dom";
import {
  Routes,
  Outlet
} from "react-router";
import * as React from 'react';
import Play from './pages/play/Play';

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

function Download() {
  return <h2 style={{color: 'white'}}>Download</h2>
}

function Contact() {
  return <h2 style={{color: 'white'}}>Contact</h2>
}