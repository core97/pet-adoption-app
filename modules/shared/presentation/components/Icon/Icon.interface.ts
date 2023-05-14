import { IconBaseProps } from 'react-icons';

export type IconsName = 'close' | 'menu' | 'plus' | 'upload';

export interface IconProps extends IconBaseProps {
  iconName: IconsName;
}
