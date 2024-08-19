import { Fragment, useState, useEffect, Component } from "react";

import Users from "./Users";
import classes from "./UserFinder.module.css";
import UsersContext from "../store/users-context";



//class based

class UserFinder extends Component {
  /*
    We can connect a class based component to one context.And you do that by adding a static property, by adding the 
    static keyword like below and then adding the property named context type written like below. And then you assign a value 
    of users context here. With that you're telling React hey this component should have access to the user's context context,
    but "you can only set the static context type property once". so, if there are two contexts which should be connected to one 
    at the same component, this would simply not be an option, you would have to find some other work around like wrapping it in 
    around the component or anything like that.
  */

  static contextType = UsersContext;
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: "",
    };
  }
   
  componentDidMount() {
    //This Method will gets executed only once when the component initially was rendered.
    console.log('componentDidMount method call');
    this.setState({filteredUsers:this.context.users});
  }

  componentDidUpdate(previousProps, previousState) {
    console.log('Outside If ComponentDid Update');
   
    if (previousState.searchTerm !== this.state.searchTerm) {
      console.log('Inside If ComponentDid Update');
      const usersFiltered = this.context.users.filter((user) =>
        user.name.includes(this.state.searchTerm)
      )
      if(usersFiltered.length === 0){
        throw new Error("No Users Provided!");
      }
      this.setState({
        filteredUsers: usersFiltered,
      });
    }
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}
/*
//Function based
const UserFinder = () => {
  const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setFilteredUsers(
      DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
    );
  }, [searchTerm]);

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Fragment>
      <div className={classes.finder}>
        <input type='search' onChange={searchChangeHandler} />
      </div>
      <Users users={filteredUsers} />
    </Fragment>
  );
};
*/
export default UserFinder;
