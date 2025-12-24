import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let toastListeners: ((toast: Toast) => void)[] = [];

export function showToast(message: string, type: ToastType = 'info') {
  const toast: Toast = {
    id: Math.random().toString(36).substr(2, 9),
    message,
    type,
  };
  toastListeners.forEach((listener) => listener(toast));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const listener = (toast: Toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 5000);
    };
    toastListeners.push(listener);
    return () => {
      toastListeners = toastListeners.filter((l) => l !== listener);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  let bgColor = 'bg-[var(--surface)]';
  let borderColor = 'border-[var(--border)]';
  let iconColor = 'text-[var(--primary)]';
  let Icon = Info;

  switch (toast.type) {
    case 'success':
      borderColor = 'border-[var(--success)]';
      iconColor = 'text-[var(--success)]';
      Icon = CheckCircle;
      break;
    case 'error':
      borderColor = 'border-[var(--danger)]';
      iconColor = 'text-[var(--danger)]';
      Icon = XCircle;
      break;
    case 'warning':
      borderColor = 'border-[var(--warning)]';
      iconColor = 'text-[var(--warning)]';
      Icon = AlertCircle;
      break;
  }

  return (
    <div className={`${bgColor} ${borderColor} border rounded-lg shadow-lg p-4 flex items-start gap-3 min-w-[300px] max-w-[400px] animate-[slideIn_0.3s_ease-out]`}>
      <Icon className={iconColor} size={20} />
      <p className="flex-1 text-[var(--text)]">{toast.message}</p>
      <button
        onClick={onClose}
        className="text-[var(--text-muted)] hover:text-[var(--text)]"
        aria-label="Close toast"
      >
        <X size={16} />
      </button>
    </div>
  );
}