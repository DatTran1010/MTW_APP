import {TextProps, TextStyle} from 'react-native';
import Colors from './Colors';
import {WIDTH_SCREEN} from './Dimentions';

interface FontProps {
  fontWeight: string | number;
  fontSize: number;
  color: string;
}

interface ShadowProps {
  backgroundColor: string;
  shadowColor: string;
  shadowOffset: {width: number; height: number};
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

interface ThemeProps extends TextProps {
  fontFamily: string;
  font: TextStyle;
  fontBold: TextStyle;
  fontTitle: TextStyle; // Bỏ qua thuộc tính 'color' trong fontTitle
  shadow: ShadowProps;
  fontSize: number;
}

const Theme: ThemeProps = {
  fontFamily: 'Segoe UI',
  font: {
    fontWeight: '400',
    fontSize: WIDTH_SCREEN / 28,
    color: Colors.black,
  },
  fontBold: {
    fontWeight: 'bold',
    fontSize: WIDTH_SCREEN / 28,
    color: Colors.black,
  },
  fontTitle: {
    fontWeight: 'bold',
    fontSize: WIDTH_SCREEN / 25,
  },
  shadow: {
    backgroundColor: Colors.backgroundColor,
    shadowColor: Colors.black,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.85,
    elevation: 5,
  },
  fontSize: WIDTH_SCREEN / 28,
};
export default Theme;
