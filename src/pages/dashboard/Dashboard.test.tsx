import { shallow } from 'enzyme';
import React from 'react';

import Dashboard from './index';

describe('Dashboard', () => {
  test('should render', () => {
    const wrapper = shallow(<Dashboard />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
