import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// newer enzyme versions require an adapter to a particular version of react
configure({ adapter: new Adapter() });
