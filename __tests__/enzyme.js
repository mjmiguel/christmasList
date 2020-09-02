import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UsersTable from '../client/components/UsersTable';

// newer enzyme versions require an adapter to a particular version of react
configure({ adapter: new Adapter });

describe('React Unit Tests', () => {
  describe('UsersTable', () => {
    let wrapper;
    const props = {
      usersFetched: true,
      users: [
        { name: 'Michael', giftee: 'Bob' },
        { name: 'Bob', giftee: 'Pat' },
        { name: 'Pat', giftee: 'Michael' },
      ],
    };

    beforeAll(() => {
      wrapper = shallow(<UsersTable {...props} />);
    });

    it('Renders name and giftee for each user', () => {
      expect(wrapper.find('td').text()).toMatch('Michael');
    });
  });
});
