import { shallow } from 'enzyme';
import React from 'react';

import Employee from './index';

describe('Employee', () => {
  test('should render', () => {
    const wrapper = shallow(<Employee />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
