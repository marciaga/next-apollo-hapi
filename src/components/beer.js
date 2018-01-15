import React, { Component } from 'react';
import { UpdateBeerWithMutation } from './beer-form';

class Beer extends Component {
    state = {
        isToggled: false
    }

    findById = (id, ary) => ary.find(f => f.id === id);

    handleClick = () => {
        this.setState({
            isToggled: !this.state.isToggled
        });
    }

    render () {
        const { isToggled } = this.state;
        const { id, beers } = this.props;
        const beer = this.findById(id, beers) || {};
        const { name, style, brewery, abv, tapped } = beer;

        return (
            <div>
            {!isToggled &&
                <div
                    onClick={this.handleClick}
                    style={{ border: '1px solid black' }}
                >
                    <p>Name: {name}</p>
                    <p>Style: {style}</p>
                    <p>Brewery: {brewery}</p>
                    <p>ABV: {abv}</p>
                    <p>Tapped: {tapped}</p>
                </div>
            }
            {isToggled &&
                <div>
                    <UpdateBeerWithMutation
                        name={name}
                        style={style}
                        brewery={brewery}
                        abv={abv}
                        tapped={tapped}
                        id={id}
                    />
                <button
                    onClick={this.handleClick}
                    type="button"
                >
                X
                </button>
                </div>
            }
            </div>
        );
    }
};

export { Beer };
