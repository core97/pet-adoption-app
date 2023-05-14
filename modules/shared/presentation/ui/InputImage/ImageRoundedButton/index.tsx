import { Box, Button } from '@chakra-ui/react';
import { Icon } from '@ui/Icon';
import { SIZE_IMG } from '../InputImage.constants';
import styles from './ImageRoundedButton.module.css';

export const ImageRoundedButton = ({
  alt,
  onClickDeleteImage,
  onClickImage,
  src,
}: {
  alt: string;
  onClickDeleteImage: () => void;
  onClickImage: () => void;
  src: string;
}) => (
  <Box
    as="figure"
    position="relative"
    width={`${SIZE_IMG}px`}
    height={`${SIZE_IMG}px`}
  >
    <Button
      onClick={onClickDeleteImage}
      position="absolute"
      top={-3}
      right={-2}
      width="50px"
      height="50px"
      colorScheme="red"
      borderRadius="50%"
    >
      <Icon iconName="close" size={18} />
    </Button>
    <Box
      as="button"
      width="100%"
      height="100%"
      type="button"
      onClick={onClickImage}
    >
      <img className={styles.image} src={src} alt={alt} />
    </Box>
  </Box>
);
