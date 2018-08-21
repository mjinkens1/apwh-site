import React from 'react'
import { Link } from 'react-router-dom'


export const SidebarItem = (props) => {
  return (
    props.to ?
    <Link to={ props.to } className='sidebar-item'>
      <i className={ props.iconClass }></i><span>{ props.name }</span>
    </Link>
    :
    <a href= {props.href } className='sidebar-item' target='_blank'>
      <i className={ props.iconClass }></i><span>{ props.name }</span>
    </a>
  );
}
