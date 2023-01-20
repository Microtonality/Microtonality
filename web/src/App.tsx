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

const activeLink = "2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide leading-relaxed inline-block mr-4 px-5 whitespace-nowrap uppercase text-gold underline"
const inactiveLink = "2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide leading-relaxed inline-block mr-4 px-5 whitespace-nowrap uppercase text-white hover:underline"

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
      <nav className="relative flex flex-wrap items-center justify-between px-2 2xl:py-7 xl:py-6 lg:py-5 md:py-4 sm:py-3 xs:py-2 bg-bglight border-b-2 border-gold">
        <span className="2xl:text-xl xl:text-lg lg:text-md md:text-sm sm:text-xs xs:text-xs font-agrandir-wide leading-relaxed inline-block mr-4 px-5 whitespace-nowrap uppercase text-white">MICROTONAL SYNTHESIZER PROJECT</span>
          <span className="2xl:mr-10 xl:mr-9 lg:mr-8 md:mr-7 sm:mr-6 xs:mr-5">
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