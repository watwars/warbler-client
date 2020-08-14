import React from "react";

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      profileImageUrl: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? "signUp" : "signIn";
    this.props.onAuth(authType, this.state)
    .then(() => {
      this.props.history.push('/')
    })
    .catch(err => {
      return;
    })
  }

  render() {
    const { email, username, password, profileImageUrl } = this.state;
    const { buttonText, heading, signUp, errors, history, removeError} = this.props;

    history.listen(() => {
      removeError();
    })

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {errors.message && <div className="alert alert-danger">{errors.message}</div>}
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                name="email"
                onChange={this.handleChange}
                value={email}
              />
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                name="password"
                onChange={this.handleChange}
              />
              {signUp && (
                <div>
                <label htmlFor="username">Username:</label>
                  <input
                    type="test"
                    id="username"
                    className="form-control"
                    name="username"
                    onChange={this.handleChange}
                    value={username}
                  />
                  <label htmlFor="image-url">Image URL:</label>
                  <input
                    type="text"
                    id="image-url"
                    className="form-control"
                    name="profileImageUrl"
                    onChange={this.handleChange}
                    value={profileImageUrl}
                  />
                </div>
              )}
              <button className="btn btn-primary btn-block btn-lg" type="submit">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthForm;
