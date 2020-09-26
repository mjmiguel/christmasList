import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Home from './Home';
// todo: close server after tests complete

describe('Home', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
  });
});
