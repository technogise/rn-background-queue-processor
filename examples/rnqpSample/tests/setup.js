import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

global.fetch = jest.fn();
fetch.mockResponseSuccess = body => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({json: () => Promise.resolve(JSON.parse(body)), ok: true}),
  );
};

fetch.mockResponseFailure = body => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({json: () => Promise.resolve(JSON.parse(body)), ok: false}),
  );
};
