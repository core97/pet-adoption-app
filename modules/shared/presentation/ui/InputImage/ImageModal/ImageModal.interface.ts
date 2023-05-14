import { ThemingProps } from '@chakra-ui/react';

export interface ImageModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
  imageAlt?: string;
  size?: ThemingProps<"Modal">['size'];
}
