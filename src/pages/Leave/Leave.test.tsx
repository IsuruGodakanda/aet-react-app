import { shallow } from 'enzyme';
import React from 'react';

import Leave from './index';

describe('Leave', () => {
  test('should render', () => {
    const wrapper = shallow(<Leave />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
