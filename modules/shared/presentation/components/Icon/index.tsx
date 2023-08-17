import { IconType } from 'react-icons';
import { IoMdMenu, IoMdClose, IoMdMale } from 'react-icons/io';
import { BsPlus, BsFillSendFill, BsHeartFill, BsHeart } from 'react-icons/bs';
import { MdLocationPin, MdLanguage } from 'react-icons/md';
import {
  BiUpload,
  BiFilter,
  BiFemaleSign,
  BiChevronRight,
  BiChevronLeft,
} from 'react-icons/bi';
import { IconProps, IconsName } from './Icon.interface';

const icons: Record<IconsName, IconType> = {
  chevronLeft: BiChevronLeft,
  chevronRight: BiChevronRight,
  close: IoMdClose,
  female: BiFemaleSign,
  filter: BiFilter,
  heartFill: BsHeartFill,
  heartOutline: BsHeart,
  language: MdLanguage,
  locationPin: MdLocationPin,
  male: IoMdMale,
  menu: IoMdMenu,
  plus: BsPlus,
  send: BsFillSendFill,
  upload: BiUpload,
};

export type { IconsName } from './Icon.interface';

export const Icon = (props: IconProps) => {
  const { iconName, ...rest } = props;
  const ComponentWithIcon = icons[iconName];

  return <ComponentWithIcon {...rest} />;
};
