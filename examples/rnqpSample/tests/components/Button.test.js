import {shallow} from 'enzyme';
import React from 'react';
import Button from '../../app/components/Button';

describe('Test Button', () => {
  test('Render button', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.find('TouchableHighlight').exists()).toBeTruthy();
  });

  test('Render button with action', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Button onClick={onClick} />);
    wrapper.find('TouchableHighlight').simulate('press');
    expect(onClick).toHaveBeenCalled();
  });
});
