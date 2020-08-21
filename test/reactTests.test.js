/**
 * @jest-environment jsdom
 */

import React from 'react';
import Enzyme from 'enzyme';
const { shallow, mount, render } = Enzyme;
import Adapter from 'enzyme-adapter-react-16';
//import sinon from 'sinon';
//import nock from 'nock';
//import "babel-polyfill"
import DescriptionService from '../client/src/index.jsx';
import Description from '../client/src/Components/Description.jsx';
import Directions from '../client/src/Components/Directions.jsx';
import Attributes from '../client/src/Components/Attributes.jsx';
import Additional from '../client/src/Components/Additional.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('DescriptionService', () => {

  var wrapper;

  var fakeData1 = {
    title: 'Pet Toy',
    description: ['item description', 'item description'],
    SKU: '8902345',
    primaryBrand: 'brand',
    daysToShip: 'ships in two days'
  }

  var fakeData2 = {
    directions: 'a string containing directions and warnings about the item'
  }

  var fakeData3 = {
    primaryColor: 'pink',
    material: 'plush',
    length: '4 IN',
    width: '5 IN'
  }

  var fakeData4 = {
    additionalDetails: 'item’s advertising copy'
  }


  it('should find the #indexComponent div when DescriptionService is mounted', () => {
    wrapper = shallow(<DescriptionService />,  { disableLifecycleMethods: true });
    expect((wrapper).find('#indexComponent').length).toBe(1);
  });

  it('should find the #buttons div when DescriptionService is mounted', () => {
    wrapper = shallow(<DescriptionService />,  { disableLifecycleMethods: true });
    expect((wrapper).find('#buttons').length).toBe(1);
  });

  it('should not find the #directionsTab div when DescriptionService is mounted', () => {
    wrapper = shallow(<DescriptionService />,  { disableLifecycleMethods: true });
    expect((wrapper).find('#directionsTab').length).toBe(0);
  });

  it('should find the #descriptionTab div when Description is mounted', () => {
    wrapper = shallow(<Description description={fakeData1} />,  { disableLifecycleMethods: true });
    expect((wrapper).find('#descriptionTab').length).toBe(1);
    expect((wrapper).find('span').length).toBe(8);
  });

  it('should find the #directionsTab div when Directions is mounted', () => {
    wrapper = shallow(<Directions directions={fakeData2} />,  { disableLifecycleMethods: true });
    expect((wrapper).find('#directionsTab').length).toBe(1);
  });

  it('should find the #attributesTab div when Attributes is mounted', () => {
    wrapper = shallow(<Attributes attributes={fakeData3} />,  { disableLifecycleMethods: true });
    expect((wrapper).find('#attributesTab').length).toBe(1);
    expect((wrapper).find('span').length).toBe(12);
  });

  it('should find the #additionalTab div when Additional is mounted', () => {
    wrapper = shallow(<Additional additional={fakeData4} />,  { disableLifecycleMethods: true });
    expect((wrapper).find('#additionalTab').length).toBe(1);
  });
});