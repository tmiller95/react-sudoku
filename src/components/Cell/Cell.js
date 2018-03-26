import React from 'react';

import './Cell.css';

const cell = (props) => (
    <td className="cell">
        <input
            className="cell-input"
            value={props.value}
            maxLength="1"
            readOnly={props.readOnly}
            onChange={(e) => props.updateHandler(props.index, e.target.value)} />
    </td>
);

export default cell;