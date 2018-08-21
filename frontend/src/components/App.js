import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { InitialView } from './InitialView'
import { ContentView } from './ContentView'
import { SyllabusView } from './SyllabusView'
import { EmailView } from './EmailView'
import { LoginView } from './LoginView'
import { ErrorView } from './ErrorView'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

const routes = [
  { path: '', component: InitialView, name: '' },
  { path: '/syllabus', component: SyllabusView, name: 'Syllabus' },
  { path: '/technology&environment', component: ContentView, name: 'Technology & Environment' },
  { path: '/organizationofsocieties', component: ContentView, name: 'Organization of Societies' },
  { path: '/regionalinteractions', component: ContentView, name: 'Regional Interactions' },
  { path: '/globalinteractions', component: ContentView, name: 'Global Interactions' },
  { path: '/industrialization&integration', component: ContentView, name: 'Industrialization & Integration' },
  { path: '/acceleratingglobalchange', component: ContentView, name: 'Accelerating Global Change' },
  { path: '/contact', component: EmailView, name: '' },
  { path: '/login', component: LoginView, name: '' }
]

export const App = (props) => {
  return (
     <React.Fragment>
       <Navbar
        showSidebar={ props.showSidebar }
        toggleSidebar={ props.toggleSidebar }
        viewName={ props.viewName }
        setViewName={ props.setViewName }/>
       <Sidebar
        showSidebar={ props.showSidebar }
        toggleSidebar={ props.toggleSidebar }/>
       <Switch>
        { routes.map((route, key) => {
           return(
             <Route exact
              path={ props.match.path + route.path }
              render={ () => <route.component { ...props } name={ route.name }/> }
              key={ key }/> );
         })}
         <Route component={ ErrorView }/>
       </Switch>
     </React.Fragment>
  );
}
