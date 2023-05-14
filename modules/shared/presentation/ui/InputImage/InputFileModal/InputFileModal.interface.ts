export interface InputFileModalProps {
  accept: 'audio/*' | 'video/*' | 'image/*' | '.pdf';
  isOpen: boolean;
  maxFileSize: number; // Mb
  name: string;
  onClose: () => void;
  onSubmit: (file: File) => void;
  header?: string;
  label?: string;
}
