import React, { Component, PropTypes } from 'react';

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.onSubmit({ email, password });
  }

  render() {
    return (
      <div>
        <form className='col s4 offset-s4' onSubmit={this.onSubmit}>
          <div className='input-field'>
            <input
              id='email'
              type='text'
              className='validate'
              value={this.state.email}
              placeholder='email'
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className='input-field'>
            <input
              id='email'
              type='password'
              className='validate'
              placeholder='password'
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className='errors'>
            {this.props.errors.map(error => <div key={error}>{error}</div>)}
          </div>
          <button className='btn'>Submit</button>
        </form>
      </div>
    );
  }
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.string),
};
export default AuthForm;
