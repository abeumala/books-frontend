'use strict';

import alt from '../alt';
import { Fetcher } from '../utils/Fetcher';
import Utils from '../utils/Utils';

export class BooksActions {

  getBooks(url) {
    return (dispatch) => {
      Fetcher.fetch(url)
      .then((response)=>{
        dispatch(response);
      })
      .catch((e)=>{
        console.log('Response Error', e);
      });
    }
  }

  getOne(id) {
  	return (dispatch) => {
  		dispatch(id)
  	}
  }

  getCommentsForBook(url) {
  	return (dispatch) => {
      Fetcher.fetch(url)
      .then((response)=>{
        dispatch(response);
      })
      .catch((e)=>{
        console.log('Response Error', e);
      });
    }
  }

  updateComment(url, obj) {
  	let object = {  
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        voteUp: obj.voteUp
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

}

export default alt.createActions(BooksActions);
