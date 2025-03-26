import { ExternalToast } from 'sonner'

export type IExternalToast = Omit<ExternalToast, 'onDismiss'> & {
  onDismiss?: () => void;
}