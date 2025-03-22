import { ReactNode } from 'react';

type Variant = 'primary' | 'info' | 'warning' | 'success' | 'danger';
type Position =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

type IToast = {
  title: string;
  description: string;
  variant: Variant;
  transition?: number;
  position?: Position;
  duration?: number;
  component?: React.ReactElement;
  hasComponent?: boolean;
};

type ToastProviderProps = {
  children: ReactNode;
  position?: Position;
  duration?: number;
};

export type { IToast, Position, Variant, ToastProviderProps };
