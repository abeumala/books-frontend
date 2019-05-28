import React, { Component } from 'react';
import BooksActions from '../actions/BooksActions';
import BooksStore from '../stores/BooksStore';
import {API} from '../config/endpoints';

export default class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
     
    }
  }

  componentWillMount() {

  }
  
  componentDidMount() {

  }

  componentWillUnmout() {

  }

  render() {
  	return(
  		<div style={styles.commentContainer}>
  			<div style={styles.singleCommentContainer}>
        	<p>{this.props.comment.title}</p>  
        	<p>{this.props.comment.content}</p>  
        </div>
  			<div>
        	<button onClick={() => this.props.voteUp(this.props.comment)}>
					  VOTE UP
					</button> 
        	<button onClick={() => this.props.voteDown(this.props.comment)}>
					  VOTE DOWN
					</button>  
        </div>
        <span>{this.props.comment.voteUp - this.props.comment.voteDown}</span>   
      </div>
  	)
  }

}

const styles = {
  commentContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  singleCommentContainer: {
    border: "1px solid black"
  }
}
