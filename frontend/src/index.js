import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './containers/App'
import { ErrorView } from './components/ErrorView'
import rootReducer from './reducers'
import './index.css';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path='/whap' component={ App }/>
        <Route exact path='/'>
          <Redirect to='/whap'/>
        </Route>
        <Route component={ ErrorView }/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'))
