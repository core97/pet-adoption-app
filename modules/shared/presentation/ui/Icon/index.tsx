import { IconType } from 'react-icons';
import { IoMdMenu } from 'react-icons/io';
import { BsPlus } from 'react-icons/bs';
import { IconProps, IconsName } from './Icon.interface';

const icons: Record<IconsName, IconType> = {
  menu: IoMdMenu,
  plus: BsPlus,
};

export const Icon = (props: IconProps) => {
  const { iconName, ...rest } = props;
  const ComponentWithIcon = icons[iconName];

  return <ComponentWithIcon {...rest} />;
};
