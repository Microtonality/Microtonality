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

const activeLink = "text-xl font-agrandirwide leading-relaxed inline-block mr-4 px-5 py-2 whitespace-nowrap uppercase text-gold underline"
const inactiveLink = "text-xl font-agrandirwide leading-relaxed inline-block mr-4 px-5 py-2 whitespace-nowrap uppercase text-white hover:underline"

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
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-7 bg-bglight mb-3 border-b-2 border-gold">
        <span className="text-xl font-agrandirwide leading-relaxed inline-block mr-4 px-5 py-2 whitespace-nowrap uppercase text-white">MICROTONAL SYNTHESIZER PROJECT</span>
          <span className="mr-10">
            <NavLink to="/" end className={({isActive}) => isActive ? activeLink : inactiveLink}>LEARN</NavLink>
            <NavLink to="/play" className={({isActive}) => isActive ? activeLink : inactiveLink}>PLAY</NavLink>
            <NavLink to="/download" className={({isActive}) => isActive ? activeLink : inactiveLink}>DOWNLOAD</NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive ? activeLink : inactiveLink}>CONTACT</NavLink>
          </span>
      </nav>

      <Outlet />
    </>
  )
}

function Learn() {
  return (
    <h2 className="text-white">Learn</h2>
  )
}

function Download() {
  return <h2 className="text-white">Download</h2>
}

function Contact() {
  return <h2 className="text-white">Contact</h2>
}