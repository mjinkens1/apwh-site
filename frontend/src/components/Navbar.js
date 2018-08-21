import React from 'react'
import { NavItem } from './NavItem'
import { NavTitle } from './NavTitle'


export const Navbar = (props) => {

  var sidebarTooltip = props.showSidebar ? 'Hide Sidebar' : 'Show Sidebar';

  return (
    <div className='navbar'>
      <div className='nav-left'>
          <NavItem iconClass={ 'fa fa-fw fa-bars' } tooltipText={ sidebarTooltip } handleClick={ props.toggleSidebar }/>
          <NavItem to={ '/whap' } iconClass={ 'fa fa-fw fa-home' } tooltipText={'Home'}
           handleClick={ props.setViewName } clickArgs={ [''] }/>
          <NavItem iconClass={ 'fa fa-fw fa-calendar' } tooltipText={ 'Calendar' }/>
          <NavItem iconClass={ 'fa fa-fw fa-flag' } tooltipText={ 'Announcements' }/>
          <NavItem iconClass={ 'fa fa-fw fa-user' } tooltipText={ 'Parents' }/>
      </div>
      <NavTitle viewName={ props.viewName }/>
      <div className='nav-right'>
        <NavItem iconClass={ 'fas fa-sign-in-alt nav-item' } tooltipText={ 'Login' }/>
      </div>
    </div>
  );
}
