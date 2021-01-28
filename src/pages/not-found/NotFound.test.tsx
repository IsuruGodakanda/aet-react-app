import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '.';

describe('NotFound', () => {
  test('should render', () => {
    const wrapper = shallow(<NotFound />);

    expect(wrapper.exists()).toBeTruthy();
  });
});
