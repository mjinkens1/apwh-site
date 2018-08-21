import React from 'react'
import { SidebarItem } from './SidebarItem'


export const Sidebar = (props) => {

  var showSidebar = props.showSidebar ? ' show-sidebar' : ''
  var showOverlay = props.showSidebar ? ' show-overlay' : ''

  var sidebarItems = [
    { to: '/whap/syllabus', iconClass: 'fa fa-fw fa-pencil-alt', name: 'Syllabus'},
    { to: '/whap/technology&environment', iconClass: 'fa fa-fw fa-tree', name: 'Technology & Environment'},
    { to: '/whap/organizationofsocieties', iconClass: 'fa fa-fw fa-users', name: 'Organization of Societies'},
    { to: '/whap/regionalinteractions', iconClass: 'fa fa-fw fa-map-marker', name: 'Regional Interactions'},
    { to: '/whap/globalinteractions', iconClass: 'fa fa-fw fa-globe', name: 'Global Interactions'},
    { to: '/whap/industrialization&integration', iconClass: 'fa fa-fw fa-cogs', name: 'Industrialization & Integration'},
    { to: '/whap/acceleratingglobalchange', iconClass: 'fa fa-fw fa-tachometer-alt', name: 'Accelerating Global Change'},
    { href: 'https://www.dallasisd.org/advancedacademicservices',
      iconClass: 'fa fa-fw fa-newspaper', name: 'AP Prep' },
    { href: 'https://drive.google.com/open?id=1IliNBgmX1ufIheV6-w1ywcIMEpbIGbya',
      iconClass: 'fa fa-fw fa-trophy', name: 'Social Studies UIL' },
    { to: '/whap/contact', iconClass: 'fa fa-fw fa-envelope', name: 'Email'},
  ]

  return (
    <div className={'overlay' + showOverlay } onClick={ () => {
      props.showSidebar ? props.toggleSidebar() : null } }>

      <div className={ 'sidebar' + showSidebar }>
        { sidebarItems.map((item, index) => {
          return <SidebarItem { ...item } { ...props } key={ index }/>;
        })}
      </div>
    </div>
  );
}
