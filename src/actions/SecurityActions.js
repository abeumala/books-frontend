'use strict';

import alt from '../alt';
import { Fetcher } from '../utils/Fetcher';

export class SecurityActions {

  login(url, obj) {

    let object = {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: obj.username,
        password: obj.password,
      })
    }

    return (dispatch) => {
      Fetcher.fetch(url, object)
      .then((response)=>{
        console.log('response', response);
        dispatch(response);
      })
      .catch((e)=>{
        console.log('Response Error', e);
      });
    }
  }

  signup(url, obj) {
    console.log('inside security actions URL', url)
    console.log('inside security actions OBJ', obj)
    let object = {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: obj.username,
        email: obj.email,
        password: obj.password,
      })
    }

    return (dispatch) => {
      Fetcher.fetch(url, object)
      .then((response)=>{
        dispatch(response);
      })
      .catch((e)=>{
        console.log('Response Error', e);
      });
    }
  }

  updateMe(url, favouriteBook) {
    let object = {  
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favouriteBook: favouriteBook
      })
    }

    return (dispatch) => {
      Fetcher.fetch(url, object)
      .then((response)=>{
        dispatch(response);
      })
      .catch((e)=>{
        console.log('Response Error', e);
      });
    }
  }

  logout() {
    return (dispatch) => {
      console.log("dispatch inside logout", dispatch);
      dispatch();
    }
  }

}

export default alt.createActions(SecurityActions);
