'use client';

import { useState, useEffect } from 'react';
import { useController, PathValue, Path } from 'react-hook-form';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@components/Icon';
import { InputFileModal } from './InputFileModal';
import { ImageModal } from './ImageModal';
import { ImageRoundedButton } from './ImageRoundedButton';
import { InputImageProps } from './InputImage.interface';
import { SIZE_IMG } from './InputImage.constants';

export const InputImage = <TFormValues extends Record<string, unknown>>({
  control,
  maxImageSize,
  label,
  defaultValue,
  onChangeDefaultValue,
  name,
  limit = 1,
  rules,
  modal,
}: InputImageProps<TFormValues>) => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string>();
  const [defaultImages, setDefaultImages] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : []
  );
  const handleInputFileModal = useDisclosure();
  const handleImageModal = useDisclosure();
  const { field, formState } = useController<TFormValues>({
    name,
    control,
    rules,
    ...(defaultValue && {
      defaultValue: defaultValue as PathValue<TFormValues, Path<TFormValues>>,
    }),
  });
  const isExceededLimit = images.length >= limit;

  const handleSubmitInputFile = (file: File) => {
    setImages(prev => [file, ...prev]);
    field.onChange([file, ...images]);
  };

  const handleClickDeleteImage = (imageToDelete: File) => {
    setImages(prev => prev.filter(item => item.name !== imageToDelete.name));
    field.onChange(images.filter(item => item.name !== imageToDelete.name));
  };

  const handleClickImage = (imageUrl: File) => {
    setImagePreview(URL.createObjectURL(imageUrl));
    handleImageModal.onOpen();
  };

  const handleClickDeleteDefaultImage = (imageToDeleteSrc: string) => {
    setDefaultImages(prev =>
      prev.filter(srcImg => srcImg !== imageToDeleteSrc)
    );
  };

  const handleClickDefaultImage = (imageSrc: string) => {
    setImagePreview(imageSrc);
    handleImageModal.onOpen();
  };

  useEffect(() => {
    onChangeDefaultValue?.(defaultImages);
  }, [defaultImages, onChangeDefaultValue]);

  return (
    <>
      <FormControl
        isInvalid={!!formState.errors[field.name]}
        isRequired={!!rules?.required}
      >
        {label && <FormLabel mb={6}>{label}</FormLabel>}
        <HStack
          justifyContent="center"
          flexWrap="wrap"
          rowGap="1.5rem"
          columnGap="1rem"
        >
          {images.map(item => (
            <ImageRoundedButton
              key={item.name}
              alt={item.name}
              onClickDeleteImage={() => handleClickDeleteImage(item)}
              onClickImage={() => handleClickImage(item)}
              src={URL.createObjectURL(item)}
            />
          ))}
          {defaultImages.map(itemSrc => (
            <ImageRoundedButton
              key={itemSrc}
              alt={itemSrc}
              onClickDeleteImage={() => handleClickDeleteDefaultImage(itemSrc)}
              onClickImage={() => handleClickDefaultImage(itemSrc)}
              src={itemSrc}
            />
          ))}
          {!isExceededLimit && (
            <Button
              ref={field.ref}
              name={field.name}
              colorScheme="gray"
              onClick={handleInputFileModal.onOpen}
              disabled={images.length >= limit}
              size="lg"
              width={`${SIZE_IMG}px`}
              height={`${SIZE_IMG}px`}
              borderRadius="50%"
              {...(formState.errors[name] && {
                borderColor: 'red',
                color: 'red',
              })}
            >
              <Icon iconName="plus" size={48} />
            </Button>
          )}
        </HStack>
      </FormControl>

      <InputFileModal
        name="image"
        accept="image/*"
        maxFileSize={maxImageSize}
        header={modal?.header}
        label={modal?.label}
        isOpen={handleInputFileModal.isOpen}
        onClose={handleInputFileModal.onClose}
        onSubmit={handleSubmitInputFile}
      />
      {imagePreview && (
        <ImageModal
          size="xl"
          isOpen={handleImageModal.isOpen}
          onClose={handleImageModal.onClose}
          imageSrc={imagePreview}
        />
      )}
    </>
  );
};
