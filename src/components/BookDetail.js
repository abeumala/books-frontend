import React, { Component } from 'react';
import BooksActions from '../actions/BooksActions';
import BooksStore from '../stores/BooksStore';
import {API} from '../config/endpoints';
import Comment from './Comment';

export default class BookDetail extends Component {

  constructor() {
    super();
    this.state = {
    	comments: []
    }

    this.book = null

    this.onChange = this.onChange.bind(this)
    this.voteUp = this.voteUp.bind(this)
    this.voteDown = this.voteDown.bind(this)
  }

  componentWillMount() {
  	let index = BooksStore.state.books.map(function(item){return item._id}).indexOf(this.props.location.query.id);
  	this.book = BooksStore.state.books[index]

  	BooksStore.listen(this.onChange);
  }
  
  componentDidMount() {
  	BooksActions.getCommentsForBook(API.getCommentsURL(null, {bookId: this.props.location.query.id}))
  }

  componentWillUnmout() {
  	BooksStore.unlisten(this.onChange);
  }

  onChange(state) {
  	this.setState({comments: state.comments})
  }

  voteUp = (comment) => {
  	let object = {
  		voteUp: true
  	}
  	BooksActions.updateComment(API.getCommentsURL(comment._id), object)
  }

  voteDown = (comment) => {
  	let object = {
  		voteUp: false
  	}
  	BooksActions.updateComment(API.getCommentsURL(comment._id), object)
  }

  render() {
  	let comments = [];

    this.state.comments.map((comment, index) => {
      let commentElement = (
      	<Comment key={index} comment={comment} voteUp={this.voteUp} voteDown={this.voteDown}/>
      )

      comments.push(commentElement)
    })
  	
    return (
    	<div>
    		<p>{this.book.title}</p>
    		<p>{this.book.author}</p>
    		<p>{this.book.description}</p>
    		{comments}
    	</div>
    );
  }

}
