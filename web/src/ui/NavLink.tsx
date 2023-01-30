import {NavLink as RRDNavLink, NavLinkProps} from "react-router-dom";
import * as React from "react";

export default function NavLink(props: NavLinkProps) {
    return <RRDNavLink {...props} className={({isActive}) => `2xl:text-xl xl:text-lg lg:text-md md:text-sm 
    sm:text-xs xs:text-xs font-agrandir-wide leading-relaxed inline-block mr-4 px-5 whitespace-nowrap uppercase 
    ${isActive ? 'text-gold underline' : 'text-white hover:underlin' }`}
    >{props.children}</RRDNavLink>
}
