'use strict';

import {ENV} from './config';
import {API_LOCAL} from './constants';
import {API_REMOTE} from './constants';




function getBaseURL() {
	if (process.env.NODE_ENV === 'production') return 'https://books-review11.herokuapp.com/api';
	else if (process.env.NODE_ENV === 'development') return 'http://localhost:5000/api';
}



function parseURL(url, params) {
	var url = getBaseURL() + url;
	let i = 0;
	if (params) {
		for (let key in params) {
			if (i == 0) {
				url += '?' + key + '=' + params[key];
			}else{
				url += '&' + key + '=' + params[key];
			}
			i++;
		}
	}
	return url;
} 

export const API = {

	getMeURL: (id) => {
		return parseURL('/me/'+id);
	},

	getProfileURL: (id) => {
		return parseURL('/profile/'+id)
	},

	getLoginURL: () => {
		return parseURL('/authenticate');
	},

	getRegisterURL: () => {
		return parseURL('/register');
	},

	getBooksURL: () => {
		return parseURL('/books');
	},

	getCommentsURL: (id, params) => {
		if (id) {
			return parseURL('/comments/'+id);
		}else{
			return parseURL('/comments', params);	
		}	
	},

	getDeleteUSer: (id) => {
		return parseURL('/delete')
	},

	// getUSerCommentsURL: (id) => {
	// 	return parseURL('/profile'+id)
	// },

	getNewCommentURL : () => {
		return parseURL('/comments')
	}
}