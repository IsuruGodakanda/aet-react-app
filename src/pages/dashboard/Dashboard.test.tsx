import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from '.';

describe('Dashboard', () => {
  test('should render', () => {
    const wrapper = shallow(<Dashboard />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
