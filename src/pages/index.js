import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
// import withRedux from 'next-redux-wrapper'
import withData from '../with-data';
// import { initStore } from '../redux/configure-store';
import Layout from '../components/layout';

const App = () => {
    return (
        <Layout>
            <div>
                <h1>Here you are</h1>
            </div>
        </Layout>
    );
};

const allReviews = gql`
  query allReviews {
    allReviews(orderBy: createdAt_DESC) {
      id
      slug
      rating
      createdAt
      title
    }
  }`

export default withData(graphql(allReviews)(App));
/*
const Index = props => (
    <Layout>
        <div>
            <h1>Here you are</h1>
        </div>
    </Layout>
);
*/

/*
const mapDispatchToProps = dispatch => ({
    dispatch
});

Index.getInitialProps = ({ store, isServer }) => {
    const { dispatch } = store;

    return {
        dispatch,
        isServer
    };
};

export default withRedux(
    initStore,
    state => ({}),
    mapDispatchToProps
)(Index);
*/
