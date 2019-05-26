import React, { Component } from 'react';
import BooksActions from '../actions/BooksActions';
import BooksStore from '../stores/BooksStore';
// import SecurityStore from '../stores/SecurityStore';
import {API} from '../config/endpoints';
import Comment from './Comment';
import Navbar from './Navbar';

export default class BookDetail extends Component {

  constructor(props) {
    super(props);
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
    console.log('index', index);
  	this.book = BooksStore.state.books[index]
    console.log('mounting book', this.book)

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
    console.log('user in book detail', this.props);
  	let comments = [];
    console.log('books', this.book)

    this.state.comments.map((comment, index) => {
      let commentElement = (
      	<Comment key={index} comment={comment} voteUp={this.voteUp} voteDown={this.voteDown}/>
      )

      comments.push(commentElement)
    })
  	
    return (
    	<div>
          <Navbar />
          <p>{this.book.title}</p>
          <p>{this.book.author}</p>
          <p>{this.book.description}</p>
    		{comments}
    	</div>
    );
  }

}

const styles = {
  book: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
    justifyContent: 'center'

  }
}
