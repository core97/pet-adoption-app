import { IconBaseProps } from 'react-icons';

export type IconsName =
  | 'close'
  | 'filter'
  | 'heartFill'
  | 'heartOutline'
  | 'menu'
  | 'plus'
  | 'send'
  | 'upload';

export interface IconProps extends IconBaseProps {
  iconName: IconsName;
}
