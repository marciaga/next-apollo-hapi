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
                    update: (store, { data: { addChannel } }) => {
                        // read data from the cache for this query
                        const data = store.readQuery({ query: channelsListQuery });
                        // add our channel from the mutation to the end
                        data.channels.push(addChannel);
                        // write the data back to the cache
                        store.writeQuery({ query: channelsListQuery, data });
                    }
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

export const AddChannelWithMutation = graphql(
  addChannelMutation
)(AddChannel);
