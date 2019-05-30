'use strict';

import alt from '../alt';
import { Fetcher } from '../utils/Fetcher';
import Utils from '../utils/Utils';

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
    console.log('obj', obj);
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

  updateProfile(url, obj) {
    console.log('updateProfile obj:', obj)
    let object = {  
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: obj.username,
        email: obj.email,
        password: obj.password
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

  // getCommentsForUser(url) {
  // 	return (dispatch) => {
  //     Fetcher.fetch(url)
  //     .then((response)=>{
  //       dispatch(response);
  //     })
  //     .catch((e)=>{
  //       console.log('Response Error', e);
  //     });
  //   }
  // }

  deleteUser(url) {
    let object = {  
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    } 
    return (dispatch) => {
      Fetcher.fetch(url, object)
      .then((response)=>{
        console.log("IN DELETE FETCH", response)
        dispatch(response);
      })
      .catch((e)=>{
        console.log('Response Error', e);
      });
    } 
  }

}

export default alt.createActions(SecurityActions);
