import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    // this.props / the old, current set of props
    // nextProps / the next set of props that will be in place when the component refreshes

    if (!this.props.data.currentUser && nextProps.data.currentUser) {
      hashHistory.push('dashboard');
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
        hashHistory.push('/dashboard');
      })
      .catch((res) => {
        if (res.graphQLErrors) {
          const errors = res.graphQLErrors.map(error => error.message);
          this.setState({ errors });
        }
      });
  }

  render() {
    return (
      <div className='row'>
        <h3 className='col s4 offset-s4'>Login</h3>
        <AuthForm errors={this.state.errors} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

LoginForm.propTypes = {
  mutate: PropTypes.func,
  data: PropTypes.shape({
    currentUser: PropTypes.object,
  }),
};
export default graphql(query)(
  graphql(mutation)(LoginForm),
);

