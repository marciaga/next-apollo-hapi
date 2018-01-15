import React from 'react';
import { Beer } from './beer';

const MainForm = ({ data }) => {
    return (
        <div>
            <div>
                <h2>Upstairs</h2>
                <Beer {...data} id="1" />
                <Beer {...data} id="2" />
                <Beer {...data} id="3" />
            </div>
            <div>
                <h2>Downstairs</h2>
                <Beer {...data} id="4" />
                <Beer {...data} id="5" />
                <Beer {...data} id="6" />
            </div>
        </div>
    );
};

export { MainForm };
