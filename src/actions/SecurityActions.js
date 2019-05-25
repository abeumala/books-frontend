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
        dispatch(response);
      })
      .catch((e)=>{
        console.log('Response Error', e);
      });
    }
  }

  signup(url, obj) {

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

  logout() {
    return (dispatch) => {
      dispatch();
    }
  }

}

export default alt.createActions(SecurityActions);
