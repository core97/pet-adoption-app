import { IconBaseProps } from 'react-icons';

export type IconsName =
  | 'chevronLeft'
  | 'chevronRight'
  | 'close'
  | 'female'
  | 'filter'
  | 'heartFill'
  | 'heartOutline'
  | 'language'
  | 'locationPin'
  | 'male'
  | 'menu'
  | 'plus'
  | 'send'
  | 'upload';

export interface IconProps extends IconBaseProps {
  iconName: IconsName;
}
