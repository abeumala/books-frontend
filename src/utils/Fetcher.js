import React, { Component } from 'react';

export const Fetcher = {
  fetch: async (url, object) => {
    if (object == null) {
      object = {  
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }

    return fetch(url, object)
      .then( (response) => {
      	if (response.status==401 || response.status==403) {
          return response;
      	}
        return response.json(); })
        .then( (json) => {
          console.log(json)
        	return json;
        });
  }
};