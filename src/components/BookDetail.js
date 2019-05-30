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
        <div style={styles.firstSection} id="book-detail">
          <img src={require("../images/" + this.book.bookCoverUrl)} style={styles.image}/>
          <div style={styles.bookContainer}>
            <div>
              <h1 style={styles.bookText}>{this.book.title}</h1>
            </div>
            <div style={{marginTop: -35}}>
            <h2 style={styles.bookText}>{this.book.author}</h2>
            </div>
            <div>
            <p style={styles.bookText}>{this.book.description}</p>
            </div>
          </div>
        </div>
    		{comments}
        <div style={{width: `100%`, display: "flex", alignItems: 'center', justifyContent: "center"}}>
          <div style={styles.inputContainer}>
            <h2> Leave a review </h2>
            <div style={{marginBottom: 25, display: "flex", flexDirection: "column"}}>
              <h3>Title:</h3>
              <textarea style={styles.inputTitle} type="text" required value={this.state.title} onChange={this.handleTitleChange}>
                Title...
              </textarea>
            </div>
            <div style={{marginBottom: 25, display: "flex", flexDirection: "column"}}>
              <h3>Add a comment:</h3>
              <textarea style={styles.input}  type="text"  required value={this.state.comment} onChange={this.handleCommentChange}>
                Enter your comment here...
              </textarea>  
            </div>
            <div style={{marginBottom: 25}}>
              <button className='link' style={styles.updateButton} onClick={this.addComment}> Send </button>
            </div>
          </div> 
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

  updateButton: {
  height: 30,
  width: 190,
  borderRadius: `20px`,
  "background": `#2a2c39`,
  "color": "white",
  letterSpacing: 2.5
  // boxShadow: `2px 2px #888888`
},

  input: {
    width: 550,
    color: '#000',
    height: 150,
  },

  inputTitle: {
    width: 550,
    color: '#000',
    height: 60
  },

  firstSectionContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 30
  },

  firstSection: {
    width: `100%`,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    padding: 23
  },

  image: {
    width: 290,
    objectFit: 'fit',
    marginTop: "3vh",
    marginBottom: 10
  },

  bookContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: `35%`,
    marginTop: "3vh"
  },

  bookText: {
    textAlign: 'justify',
    lineHeight: 1.9
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: `90%`,
    alignItems: "center",
    justifyContent: "center"
  }
}
