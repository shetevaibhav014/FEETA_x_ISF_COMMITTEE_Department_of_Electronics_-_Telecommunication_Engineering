import { useCallback, useMemo, useState } from "react";
import { ToastContext } from "./toastContextStore";

export default function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const notify = useCallback((message, tone = "success") => {
    const id = crypto.randomUUID();
    setMessages((current) => [...current, { id, message, tone }]);
    window.setTimeout(() => {
      setMessages((current) => current.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);
  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="false">
        {messages.map(({ id, message, tone }) => (
          <div className={`toast-message toast-${tone}`} key={id} role="status">
            {message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
