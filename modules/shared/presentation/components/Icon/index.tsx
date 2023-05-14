import { IconType } from 'react-icons';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { BsPlus } from 'react-icons/bs';
import { BiUpload } from 'react-icons/bi';
import { IconProps, IconsName } from './Icon.interface';

const icons: Record<IconsName, IconType> = {
  close: IoMdClose,
  menu: IoMdMenu,
  plus: BsPlus,
  upload: BiUpload,
};

export const Icon = (props: IconProps) => {
  const { iconName, ...rest } = props;
  const ComponentWithIcon = icons[iconName];

  return <ComponentWithIcon {...rest} />;
};
