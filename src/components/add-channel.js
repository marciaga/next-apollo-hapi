import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { channelsListQuery } from '../pages';

const AddChannel = ({ mutate }) => {
    const handleKeyUp = async (evt) => {
        if (evt.keyCode === 13) {
            evt.persist();

            try {
                const result = await mutate({
                    variables: { name: evt.target.value },
                    refetchQueries: [ { query: channelsListQuery }],
                });

                evt.target.value = '';
            } catch (e) {
                // handle
            }
        }
    };

    return (
        <input
            type="text"
            placeholder="New channel"
            onKeyUp={handleKeyUp}
            />
    );
};

const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;

const AddChannelWithMutation = graphql(
  addChannelMutation
)(AddChannel);

export default AddChannelWithMutation;
