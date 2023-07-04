import { IconBaseProps } from 'react-icons';

export type IconsName =
  | 'close'
  | 'heartFill'
  | 'heartOutline'
  | 'menu'
  | 'plus'
  | 'send'
  | 'upload';

export interface IconProps extends IconBaseProps {
  iconName: IconsName;
}
