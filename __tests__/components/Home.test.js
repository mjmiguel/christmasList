import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Home from '../../client/components/Home';
// todo: close server after tests complete

test('test the Home Component', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper).toMatchSnapshot();
});

afterAll(done => {
  // close server
  done();
});
