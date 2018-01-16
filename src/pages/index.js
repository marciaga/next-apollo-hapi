import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withData from '../with-data';
import { MainForm } from '../components/main-form';
import Layout from '../components/layout';

const App = (props) => {
    // props contains error and loading keys
    return (
        <Layout>
            <MainForm {...props} />
        </Layout>
    );
};

export const beersListQuery = gql`
    query BeersListQuery {
        beers {
            id
            name
            style
            brewery
            abv
            tapped
        }
}`

export default withData(graphql(beersListQuery)(App));
