import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      hashHistory.push('/dashboard');
    }
  }

  onSubmit({ email, password }) {
    this.props.mutate({
      variables: {
        email,
        password,
      },
      refetchQueries: [{ query }],
    })
      .then(() => {
        browserHistory.push('/dashbaoard');
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div className='row'>
        <h3 className='col s4 offset-s4'>Sign Up</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

SignupForm.propTypes = {
  mutate: PropTypes.func,
  data: PropTypes.shape({
    currentUser: PropTypes.object,
  }),
};
export default graphql(query)(
  graphql(mutation)(SignupForm),
);
