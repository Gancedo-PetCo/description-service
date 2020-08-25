import React from 'react';
import {
  directionStyleD,
  spanKey,
  spanValDesc,
  liGrey,
  ulDesc,
  title,
  bullets,
} from '../style.js';

var Description = (props) => (
  <div id="descriptionTab" style={directionStyleD}>
    <span id="left" style={{ float: 'left' }}>
      <p style={title}>{props.description.title}</p>
      <ul style={bullets}>
        {props.description.description.split('. ').map((line) => {
          return <li>{line}</li>;
        })}
      </ul>
    </span>
    <span>
      <ul className="table" style={ulDesc}>
        <li className="tableLine" style={liGrey}>
          <span className="key" style={spanKey}>
            SKU
          </span>
          <span className="val" style={spanValDesc}>
            {props.description.SKU}
          </span>
        </li>
        <li className="tableLine gray">
          <span className="key" style={spanKey}>
            Primary Brand
          </span>
          <span className="val" style={spanValDesc}>
            {props.description.primaryBrand}
          </span>
        </li>
        <li className="tableLine" style={liGrey}>
          <span className="key" style={spanKey}>
            Days to Ship
          </span>
          <span className="val" style={spanValDesc}>
            {props.description.daysToShip}
          </span>
        </li>
      </ul>
    </span>
  </div>
);

export default Description;
