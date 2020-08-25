import React from 'react';
import { ulAtt, liGrey, liGreyItal, spanKey, spanVal } from '../style.js';

var Attributes = (props) => (
  <div id="attributesTab">
    <ul className="table2" style={ulAtt}>
      <li className="tableLine" style={liGreyItal}>
        <span className="key" style={spanKey}>
          Additional Features
        </span>
        <span className="val" style={spanVal}></span>
      </li>
      <li className="tableLine gray">
        <span className="key" style={spanKey}>
          Primary Color
        </span>
        <span className="val" style={spanVal}>
          {props.attributes.primaryColor}
        </span>
      </li>
      <li className="tableLine" style={liGrey}>
        <span className="key" style={spanKey}>
          Material
        </span>
        <span className="val" style={spanVal}>
          {props.attributes.material}
        </span>
      </li>
    </ul>
    <ul className="table2" style={ulAtt}>
      <li className="tableLine" style={liGreyItal}>
        <span className="key" style={spanKey}>
          Item Dimensions
        </span>
        <span className="val" style={spanVal}></span>
      </li>
      <li className="tableLine gray">
        <span className="key" style={spanKey}>
          Length
        </span>
        <span className="val" style={spanVal}>
          {props.attributes.length}
        </span>
      </li>
      <li className="tableLine" style={liGrey}>
        <span className="key" style={spanKey}>
          Width
        </span>
        <span className="val" style={spanVal}>
          {props.attributes.width}
        </span>
      </li>
    </ul>
  </div>
);

export default Attributes;
