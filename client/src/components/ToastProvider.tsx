import { Toaster } from 'react-hot-toast';

const ToastProvider = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      style: {
        background: '#1e293b', 
        color: '#fff',
        border: '1px solid #06b6d4', 
        borderRadius: '0.75rem',
        fontSize: '0.95rem',
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)',
      },
      success: {
        iconTheme: {
          primary: '#06b6d4',
          secondary: '#fff',
        },
        style: {
          background: '#0e7490',
          color: '#fff',
        },
      },
      error: {
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff',
        },
        style: {
          background: '#991b1b',
          color: '#fff',
        },
      },
    }}
  />
);

export default ToastProvider; 