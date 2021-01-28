import React from 'react';
import { shallow } from 'enzyme';

import Employee from '.';

describe('Employee', () => {
  test('should render', () => {
    const wrapper = shallow(<Employee />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
