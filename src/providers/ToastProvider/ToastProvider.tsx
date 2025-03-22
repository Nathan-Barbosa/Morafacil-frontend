import { useState, useCallback, useEffect, FC } from 'react';
import { IToast, ToastProviderProps } from './ToasProvider.types';
import { ToastContext } from './ToastContext';

const ToastProvider: FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  duration = 3000,
}) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const toast = useCallback(
    (newToast: IToast) => {
      newToast.position = newToast.position || position;
      newToast.duration = newToast.duration || duration;
      setToasts((prev) => [...prev, newToast]);
    },
    [position, duration],
  );

  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.slice(1));
    }, toasts[0].duration);
    return () => clearTimeout(timer);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className={`toast-container ${position}`}
        style={{
          position: 'fixed',
          zIndex: 9999,
          top: position.includes('top') ? '20px' : 'unset',
          bottom: position.includes('bottom') ? '20px' : 'unset',
          right: position.includes('right') ? '20px' : 'unset',
          left: position.includes('left') ? '20px' : 'unset',
          width: '300px',
        }}
      >
        {toasts.map((t, index) => (
          <div
            key={index}
            className={`toast toast-${t.variant}`}
            style={{
              marginBottom: '8px',
              padding: '16px',
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
          >
            <strong>{t.title}</strong>
            <p>{t.description}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export { ToastProvider };
