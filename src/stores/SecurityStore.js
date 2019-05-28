import alt from '../alt';
import SecurityActions from '../actions/SecurityActions';
import { browserHistory } from 'react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class SecurityStore {

  constructor() {

    this.me = null;

    this.bindListeners({
      handleLogin: SecurityActions.LOGIN,
      handleSignup: SecurityActions.SIGNUP,
      handleUpdateMe: SecurityActions.UPDATE_ME,
      handleLogout: SecurityActions.LOGOUT,
      handleUpdateProfile: SecurityActions.UPDATE_PROFILE,
      handleDeleteUser: SecurityActions.DELETE_USER
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
    console.log('handleUpdateMe response', response.user)
    if (response.success) {
      this.me = response.user;
    }
  }

  handleUpdateProfile(response) {
    console.log('handleUpdateProfile response', response.user)
    if (response.success) {
      this.me = response.user;
      cookies.set('user', {username: this.me.username, password: this.me.password}, { path: '/' });
    }
  }

  handleLogout() {
    this.me = null;
    cookies.remove('user');
  }

  handleDeleteUser() {
    console.log('insideDelete Store')
    this.me = null;
    cookies.remove('user');
  }  
}

export default alt.createStore(SecurityStore, 'SecurityStore');
