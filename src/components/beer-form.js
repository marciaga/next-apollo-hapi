import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { beersListQuery } from '../pages';

class BeerForm extends Component {
    constructor (props) {
        super(props);

        const { id, name, style, brewery, abv, tapped } = props;

        this.state = {
            name,
            style,
            brewery,
            abv,
            tapped,
            id
        };
    }


    onInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    onUpdate = async () => {
        const { mutate } = this.props;
        const input = {
            ...this.state
        };

        try {
            const result = await mutate({
                variables: { input },
                update: (store, { data: { updateBeer } }) => {
                    // read data from the cache for this query
                    const data = store.readQuery({ query: beersListQuery });
                    // add our channel from the mutation to the end
                    data.beers = [...data.beers, updateBeer];
                    // write the data back to the cache
                    store.writeQuery({ query: beersListQuery, data });
                }
            });
        } catch (e) {
            // handle
            console.log('Err', e);
        }
    }

    render () {
        const { name, brewery, abv, style, tapped } = this.props;

        return (
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    defaultValue={name}
                    onChange={this.onInputChange}
                />

                <input
                    type="text"
                    placeholder="Style"
                    name="style"
                    onChange={this.onInputChange}
                    defaultValue={style}
                />

                <input
                    type="text"
                    placeholder="Brewery"
                    name="brewery"
                    onChange={this.onInputChange}
                />

                <input
                    type="text"
                    placeholder="ABV"
                    name="abv"
                    onChange={this.onInputChange}
                    defaultValue={abv}
                />

                <input
                    type="text"
                    placeholder="Tapped"
                    name="tapped"
                    onChange={this.onInputChange}
                    defaultValue={tapped}
                />

                <button
                    type="button"
                    onClick={this.onUpdate}
                >
                    Update
                </button>
            </div>
        );
    }
};

const updateBeerMutation = gql`
  mutation updateBeer($input: BeerInput) {
    updateBeer(input: $input) {
        id
        name
        style
        brewery
        abv
        tapped
    }
  }
`;

export const UpdateBeerWithMutation = graphql(
  updateBeerMutation
)(BeerForm);
