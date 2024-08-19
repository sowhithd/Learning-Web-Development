import classes from './User.module.css';
import { Component } from 'react';

class User extends Component {

  //constructor(){}
  /*
    Render just is a specific method expected by React, which React will call when it finds a  component being used in JS X code.
  */

 componentWillUnmount() {
  console.log("In User Component, User will unmount");
 }
  render(){
    return <li className={classes.user}>{this.props.name}</li>;
  }
}

/*
const User = (props) => {
  return <li className={classes.user}>{props.name}</li>;
};
*/

export default User;
