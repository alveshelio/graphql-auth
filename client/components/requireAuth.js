import React, { Component, PropTypes } from 'react';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

import currentUserQuery from '../queries/CurrentUser';

export default (WrappedComponent) => {
  class RequireAuth extends Component {
    componentWillUpdate(nextProps) {
      if (!nextProps.data.currentUser && !nextProps.data.loading) {
        hashHistory.push('/login');
      }
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  // RequireAuth.propTypes = {
  //   data: PropTypes.shape({
  //     currentUser: PropTypes.object,
  //     loading: PropTypes.bool.isRequired,
  //   }).isRequired,
  // };

  return graphql(currentUserQuery)(RequireAuth);
};

