export interface FormStepperProps {
  activeStep: number;
  children: React.ReactNode | React.ReactNode[];
  onChangeActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
