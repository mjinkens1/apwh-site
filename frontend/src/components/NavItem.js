import React from 'react'
import { Link } from 'react-router-dom'

export const NavItem = (props) => {
  var navItem = props.to ?
        <Link to={ props.to } className={ props.iconClass + ' nav-link'} onClick={ props.handleClick ? () => props.handleClick(...props.clickArgs) : null }>
          <span className="sr-only">(current)</span>
        </Link>
        :
        <i className={ props.iconClass } onClick={ props.handleClick ? () => props.handleClick() : null }>
          <span className="sr-only">(current)</span>
        </i>
  return (
    <div className='nav-item'>
      { navItem }
      { props.tooltipText ? <div className="tooltip-text">{ props.tooltipText }</div> : null }
    </div>
  );
}
