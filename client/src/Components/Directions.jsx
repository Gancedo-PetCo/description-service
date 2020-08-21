import React from 'react';
import { directionStyleP, directionStyleD } from '../style.js';

var Directions = (props) => (
  <div id='directionsTab' style={directionStyleD} >
    <p style={directionStyleP}>{props.directions}</p>
  </div>
)

export default Directions;