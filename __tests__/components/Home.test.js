import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../client/components/Home';

test('test the Home Component', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper).toMatchSnapshot();
});
