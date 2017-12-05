import React, { Component } from "react";

class ConnectionForm extends Component {
  constructor() {
    super();
    this.state = {
      client: "mssql"
    };
  }

  onSubmit = e => {
    e.preventDefault();
    fetch("/server/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        form: this.state
      })
    });
  };

  onConnectionNameChange = e => {
    const connectionName = e.target.value;
    this.setState(() => ({
      connectionName
    }));
    console.log(this.state);
  };

  onClientChange = e => {
    const client = e.target.value;
    this.setState(() => ({
      client
    }));
    console.log(this.state);
  };

  onUserNameChange = e => {
    const username = e.target.value;
    this.setState(() => ({
      username
    }));
    console.log(this.state);
  };

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({
      password
    }));
    console.log(this.state);
  };

  render() {
    return (
      <div className="ConnectionForm w-50">
        <form onSubmit={this.onSubmit} className="col-xs m-5">
          <div className="form-group ">
            <label htmlFor="connectionName" className="bmd-label-floating">
              Connection Name
            </label>
            <input
              id="connection"
              type="text"
              className="connectionName form-control"
              name="connection"
              onChange={this.onConnectionNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="client" className="bmd-label-floating">
              Client
            </label>
            <select
              name="client"
              id="client"
              onChange={this.onClientChange}
              className="form-control"
            >
              <option value="mssql">SQL Server</option>
              <option value="pg">PostgreSQL</option>
              <option value="mysql">MySQL</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="user" className="bmd-label-floating">
              User
            </label>
            <input
              type="text"
              className="user"
              name="user"
              onChange={this.onUserNameChange}
              className="connectionName form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="bmd-label-floating">
              password
            </label>
            <input
              onChange={this.onPasswordChange}
              type="password"
              className="password"
              name="password"
              className="connectionName form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-raised">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default ConnectionForm;
