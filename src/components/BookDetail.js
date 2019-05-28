import React, { Component } from 'react';
import BooksActions from '../actions/BooksActions';
import BooksStore from '../stores/BooksStore';
import SecurityStore from '../stores/SecurityStore';
import SecurityActions from '../actions/SecurityActions';
import {API} from '../config/endpoints';
import Comment from './Comment';
import Navbar from './Navbar';

export default class BookDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	comments: [],
      title: "",
      comment: ""
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
    console.log('book ID', this.book._id)
    console.log('user ID', SecurityStore.state.me._id)
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

  handleTitleChange = (event) => {
    this.setState({title: event.target.value})
    this.mainInput.value = "";
  }

  handleCommentChange = (event) => {
    this.setState({comment: event.target.value})
    // console.log('handleCommentChange', this.state.comment)
  }

  addComment = (e) => {

    e.preventDefault()

    let obj = {
      user: SecurityStore.state.me._id,
      book: this.book._id,
      title: this.state.title,
      comment: this.state.comment
    }

    this.setState({
      title: "",
      comment: ""
    })
    
    BooksActions.addComment(API.getNewCommentURL(), obj)
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
        <div style={styles.bookContainer}>
          <p>{this.book.title}</p>
          <p>{this.book.author}</p>
          <p>{this.book.description}</p>
        </div>
    		{comments}
        <div style={styles.inputContainer}>
          <label> Add a comment </label>
          <input style={styles.input} type="text" placeholder="Title" required value={this.state.title} onChange={this.handleTitleChange}/>
          <input style={styles.input}  type="text" placeholder="Leave yout comment" required value={this.state.comment} onChange={this.handleCommentChange}/>
          <button className='link' style={styles.loginButton} onClick={this.addComment}>
              Send
          </button>
        </div> 
      </div>

    );
  }

}


const styles = {
  bookContainer: {
    border: "1px solid black",
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: "column"
  },
  book: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid black',
  },
  input: {
    width: 150,
    color: '#000',
    border: '1px solid red'
  }
}
