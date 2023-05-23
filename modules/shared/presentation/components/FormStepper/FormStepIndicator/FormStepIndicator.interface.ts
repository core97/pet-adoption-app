export interface FormStepIndicatorProps {
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
  disabled?: boolean;
  isCompleted?: boolean;
  label?: string;
}