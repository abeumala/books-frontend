import React from 'react';
import { render } from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Signup from './components/Signup';
import Main from './components/Main';
import BookDetail from './components/BookDetail';
import Profile from './components/Profile';
import './css/Main.css';
import './css/Signup.css';

render((
  	<Router history={browserHistory}>
		<Route path="/" component={Main} />
		<Route path="/signup" component={Signup}/>
		<Route path="/book" component={BookDetail}/>
		<Route path="/profile" component={Profile}/>
	</Router>
),document.getElementById('root'))


