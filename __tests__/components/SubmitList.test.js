import React from 'react';
import { shallow, mount, render } from 'enzyme';
import SubmitList from '../../client/components/SubmitList';
// todo: close server after tests complete

describe('SubmitList', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SubmitList />);
    expect(wrapper).toMatchSnapshot();
  });
});

// afterAll(done => {
//   // close server
//   done();
// });
