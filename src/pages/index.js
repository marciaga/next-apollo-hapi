import withRedux from 'next-redux-wrapper'
import withData from '../apollo-client';
import Layout from '../components/layout';
import { initStore } from '../redux/configure-store';

export default withData(props => (
    <Layout>
        <div>
            <h1>Here you are</h1>
        </div>
    </Layout>
));
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
