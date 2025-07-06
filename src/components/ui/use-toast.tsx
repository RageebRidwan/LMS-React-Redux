import * as React from "react";
import { createPortal } from "react-dom";

type Toast = {
  id: number;
  title: string;
  description?: string;
  duration?: number;
};

type ToastContextType = {
  toasts: Toast[];
  toast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

let toastId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback((toast: Omit<Toast, "id">) => {
    toastId++;
    const newToast = { id: toastId, duration: 3000, ...toast };
    setToasts((prev) => [...prev, newToast]);


    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, newToast.duration);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-5 right-5 flex flex-col gap-2 z-50">
          {toasts.map(({ id, title, description }) => (
            <div
              key={id}
              className="bg-gray-800 text-white px-4 py-2 rounded shadow-md w-72 max-w-full"
            >
              <strong>{title}</strong>
              {description && <p className="text-sm">{description}</p>}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}
