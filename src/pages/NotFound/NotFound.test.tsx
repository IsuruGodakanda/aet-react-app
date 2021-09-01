import { shallow } from 'enzyme';
import React from 'react';

import NotFound from './index';

describe('NotFound', () => {
  test('should render', () => {
    const wrapper = shallow(<NotFound />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
