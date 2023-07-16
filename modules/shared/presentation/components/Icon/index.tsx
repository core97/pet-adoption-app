import { IconType } from 'react-icons';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { BsPlus, BsFillSendFill, BsHeartFill, BsHeart } from 'react-icons/bs';
import { BiUpload, BiFilter } from 'react-icons/bi';
import { IconProps, IconsName } from './Icon.interface';

const icons: Record<IconsName, IconType> = {
  close: IoMdClose,
  filter: BiFilter,
  heartFill: BsHeartFill,
  heartOutline: BsHeart,
  menu: IoMdMenu,
  plus: BsPlus,
  send: BsFillSendFill,
  upload: BiUpload,
};

export const Icon = (props: IconProps) => {
  const { iconName, ...rest } = props;
  const ComponentWithIcon = icons[iconName];

  return <ComponentWithIcon {...rest} />;
};
