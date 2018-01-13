import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import withData from '../with-data';
import Layout from '../components/layout';
// import withRedux from 'next-redux-wrapper'
// import { initStore } from '../redux/configure-store';

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
            <Channels {...props}/>
        </Layout>
    );
};

const ChannelsList = gql`
    query ChannelsListQuery {
        channels {
            id
            name
        }
}`

export default withData(graphql(ChannelsList)(App));
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
