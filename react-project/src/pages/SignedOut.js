import React, { Component } from 'react'
import { getUserRole, isLoggedIn, loginRequest, setUserObject } from '../services/AdminService';
import { Redirect } from "react-router-dom";



class SignedOut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      isLoading: false,
      isError: false,
      errorText: "",
      roleId: 0,
      roleName: "",
      username: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.currentTarget;
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleClick(e) {
    e.preventDefault();

    this.setState({
      isLoading: true,
    });

    const { username, password } = this.state;

    await loginRequest(username, password)
      .then((data) => {
        setUserObject(data);
        this.setState({
          isLogin: true,
          errorText: "",
          roleId: getUserRole().id,
          roleName: getUserRole().roleName,
          isLoading: false,
        });
      })
      // TODO : handle internal server error
      .catch((error) => {
        this.setState({
          isLogin: false,
          errorText:
            error !== "" ? "Wrong password or username" : error,
          roleId: 0,
          roleName: "error",
          isError: true,
          isLoading: false,
        });
      });
  }


  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <h2>loading...</h2>
        </div>
      );
    }

    if (this.state.isLogin) {
      if (isLoggedIn(this.state.roleId)) {
        console.log(this.state.roleName.toLowerCase());
        let roleString = "/".concat(this.state.roleName.toLowerCase());
        return <Redirect to={roleString} />;
      }
    }
    return (

      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
            <h3>Please log in</h3>

            <div className="form-group">
              <label>Username
                <input type="text" className="form-control" name="username" value={this.state.username} placeholder="Enter username" required autoFocus
                  onChange={this.handleChange} />
              </label>
            </div>
            <div className="form-group">
              <label> Password
                <input type="password" className="form-control" name="password" value={this.state.password} placeholder="Enter password" required
                  onChange={this.handleChange}
                />
              </label>
            </div>


            <br></br>
            <button className="btn btn-primary btn-block" type="submit" onClick={(e) => this.handleClick(e)}>Log in</button>

          </form>
        </div>
      </div>

    )
  }
}
export default SignedOut;
