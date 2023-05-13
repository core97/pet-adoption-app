import { IconBaseProps } from 'react-icons';

export type IconsName = 'menu' | 'plus';

export interface IconProps extends IconBaseProps {
  iconName: IconsName;
}
