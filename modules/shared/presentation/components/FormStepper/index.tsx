'use client';

import { Children, isValidElement, useRef } from 'react';
import { Box, VStack, HStack, ScaleFade } from '@chakra-ui/react';
import { FormStepIndicator } from './FormStepIndicator';
import { FormStep } from './FormStep';
import { FormStepperProps } from './FormStepper.inteface';

export const FormStepper = ({
  activeStep,
  onChangeActiveStep,
  children,
}: FormStepperProps) => {
  const dummyRef = useRef<HTMLDivElement>(null);

  const childrenArray = Children.toArray(children);

  return (
    <VStack width="100%">
      <Box ref={dummyRef} />
      <HStack width="100%" justify="space-around" wrap="wrap" rowGap={8}>
        {Array.from({ length: childrenArray.length }).map((v, index) => {
          const child = childrenArray[index];

          return (
            <FormStepIndicator
              key={index}
              index={index + 1}
              disabled={index > activeStep}
              isCompleted={index < activeStep}
              isActive={index === activeStep}
              onClick={currentStep => onChangeActiveStep(currentStep - 1)}
              label={
                isValidElement(child) &&
                child.type === FormStep &&
                child.props.label
              }
            />
          );
        })}
      </HStack>
      {Children.map(childrenArray, (child, index) => {
        const isActiveStep = index === activeStep;

        if (!isValidElement(child) || child.type !== FormStep) {
          throw Error('[FormStepper]: the child sould be <FormStep>.');
        }

        return (
          <ScaleFade
            initialScale={0.9}
            in={isActiveStep}
            hidden={!isActiveStep}
            onAnimationStart={() =>
              dummyRef.current?.scrollIntoView({
                behavior: 'auto',
                block: 'nearest',
                inline: 'nearest',
              })
            }
            style={{ width: '100%', marginTop: '40px' }}
          >
            {child}
          </ScaleFade>
        );
      })}
    </VStack>
  );
};

export { FormStep } from './FormStep';
