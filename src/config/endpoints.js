'use strict';

import {ENV} from './config';
import {API_LOCAL} from './constants';
import {API_REMOTE} from './constants';

function getBaseURL() {
	if (ENV == 'local') {
		return API_LOCAL;
	}else{
		return API_REMOTE;
	}
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
		
	}
}