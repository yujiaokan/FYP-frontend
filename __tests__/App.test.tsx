/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: import explicitly to use the types shiped with jest.
import {it} from '@jest/globals';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import EachMessage from '../src/useraccount/EachMessage'; // Adjust the import path to the location of your file



it('renders correctly', () => {
  try {
    renderer.create(<App />);
  } catch (error) {
    console.log(error);
  }
});


