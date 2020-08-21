import React from 'react';
import { additionalStyleP, additionalStyleD } from '../style.js';

var Additional = (props) => (
  <div id='additionalTab' style={additionalStyleD}>
    <p style={additionalStyleP}>{props.additional}</p>
  </div>
)

export default Additional;