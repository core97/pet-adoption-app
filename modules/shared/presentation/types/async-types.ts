export interface NextAsyncAction {
  action?: () => void;
  redirect?: string;
  toast?: {
    title: string;
  };
}
