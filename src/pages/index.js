import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withData from '../with-data';
import { MainForm } from '../components/main-form';
import Layout from '../components/layout';

const Channels = ({ data: {loading, error, beers }}) => {
    if (loading) {
        return <p>Loading ...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <ul>
            {beers.map( beer => <li key={beer.id}>{beer.name}</li> )}
        </ul>
    );
};

const App = (props) => {
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
