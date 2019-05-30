import React, { Component } from 'react';
import BooksActions from '../actions/BooksActions';
import BooksStore from '../stores/BooksStore';
import SecurityStore from '../stores/SecurityStore';
import {API} from '../config/endpoints';

export default class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      me: SecurityStore.state.me,
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
  		<div style={styles.container}>
  			<div style={styles.coment}>
          <div style={{marginBottom: -15}}><h3>{this.state.me.username}:</h3></div>
          <div style={{marginBottom: 16}}>
            <h4> Title: </h4>
            <p style={styles.titleContent}>{this.props.comment.title}</p>
          </div>	
          <div style={{marginBottom: 16}}>    
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <h4> Review: </h4>
            <div>
              <button style={{marginRight: 10}} onClick={() => this.props.voteUp(this.props.comment)}> VOTE UP </button> 
              <button onClick={() => this.props.voteDown(this.props.comment)}> VOTE DOWN </button>
            </div>  
          </div>
            <p style={styles.commentContent}>{this.props.comment.content}</p>  
          </div>	
        </div>
        <div style={styles.votesContainer}>
          <span>{this.props.comment.voteUp - this.props.comment.voteDown}</span>  
        </div>  
      </div>
  	)
  }

}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: `25px`
  },
  coment: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  votesContainer: {
    display: 'flex',
    flexDirection: "row"
  },
  commentContent: {
    margin: "0 auto",
    maxWidth: 500, 
    border: `0.5px solid black`,
    padding: 12
  },
    titleContent: {
    margin: "0 auto",
    maxWidth: 500, 
    border: `0.5px solid black`,
    padding: 12
  }
}
