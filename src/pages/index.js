import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withData from '../with-data';
import AddChannel from '../components/add-channel';
import Layout from '../components/layout';

const Channels = ({ data: {loading, error, channels }}) => {
    if (loading) {
        return <p>Loading ...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <ul>
            {channels.map( ch => <li key={ch.id}>{ch.name}</li> )}
        </ul>
    );
};

const App = (props) => {
    return (
        <Layout>
            <AddChannel />
            <Channels {...props}/>
        </Layout>
    );
};

export const channelsListQuery = gql`
    query ChannelsListQuery {
        channels {
            id
            name
        }
}`

export default withData(graphql(channelsListQuery)(App));
