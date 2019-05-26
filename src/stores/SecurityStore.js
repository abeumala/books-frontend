import alt from '../alt';
import SecurityActions from '../actions/SecurityActions';
import { browserHistory } from 'react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class SecurityStore {

  constructor() {

    // this.token = null;
    this.me = null;

    this.bindListeners({
      handleLogin: SecurityActions.LOGIN,
      handleSignup: SecurityActions.SIGNUP,
      handleUpdateMe: SecurityActions.UPDATE_ME,
      handleLogout: SecurityActions.LOGOUT,
    });
  }

  handleLogin(response) {
    if (response.success) {
      this.me = response.user;
      cookies.set('user', {username: this.me.username, password: this.me.password}, { path: '/' });
    }
  }

  handleSignup(response) {
    if (response.success) {
      browserHistory.push('/')
      this.me = response.user;
      cookies.set('user', {username: this.me.username, password: this.me.password}, { path: '/' });
    }
  }

  handleUpdateMe(response) {
    if (response.success) {
      this.me = response.user;
    }
  }

  handleLogout() {
    this.me = null;
    cookies.remove('user');
  }  
}

export default alt.createStore(SecurityStore, 'SecurityStore');
