import alt from '../alt';
import BooksActions from '../actions/BooksActions';
import { browserHistory } from 'react-router';

export class BooksStore {

  constructor() {

  	this.books = [];
  	this.book = null;
  	this.comments = [];

    this.bindListeners({
    	handleGetBooks: BooksActions.GET_BOOKS,
    	handleGetOne: BooksActions.GET_ONE,
    	handleGetCommentsForBook: BooksActions.GET_COMMENTS_FOR_BOOK, // "_" indicates there is camelCase in the BooksActions methods
    	handleUpdateComment: BooksActions.UPDATE_COMMENT
    });
  }

  handleGetBooks(response) {
  	if (response.success) {
  		this.books = response.books;
  	}
  }

  handleGetOne(id) {
  	let index = this.books.map( (item) => {return item._id}).indexOf(id);
  	this.book = this.books[index]
  }

  handleGetCommentsForBook(response) {
  	if (response.success) {
  		this.comments = response.comments;
  	}
  }

  handleUpdateComment(response) {
  	if (response.success) {
  		let index = this.comments.map( (item) => {return item._id}).indexOf(response.comment._id);
  		this.comments[index] = response.comment
  	}
  }
}

export default alt.createStore(BooksStore, 'BooksStore');
