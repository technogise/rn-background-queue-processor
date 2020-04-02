import {StyleSheet} from 'react-native';
import Colors from './Colors';

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.BUTTON_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 45,
    borderRadius: 7,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
