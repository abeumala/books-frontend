import React from 'react';
import { render } from 'react-dom'
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Signup from './components/Signup';
import Main from './components/Main';
import BookDetail from './components/BookDetail';
import Profile from './components/Profile';

render((
  	<Router history={browserHistory}>
		<Route path="/" component={Main} />
		<Route path="/profile" component={Profile}/>
		<Route path="/signup" component={Signup}/>
		<Route path="/book" component={BookDetail}/>
	</Router>
),document.getElementById('root'))