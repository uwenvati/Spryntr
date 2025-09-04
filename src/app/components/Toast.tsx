// components/Toast.tsx
import { X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  type?: "success" | "error" | "info";
  autoHideMs?: number;
};

export default function Toast({
  show,
  onClose,
  title = "Done",
  message = "",
  type = "success",
  autoHideMs = 5000,
}: Props) {
  useEffect(() => {
    if (!show) return;
    const id = setTimeout(onClose, autoHideMs);
    return () => clearTimeout(id);
  }, [show, autoHideMs, onClose]);

  const base =
    "fixed z-[100] top-4 right-4 w-[92vw] max-w-sm rounded-2xl shadow-lg border p-4 transition-all";
  const colors =
    type === "success"
      ? "bg-white border-green-200"
      : type === "error"
      ? "bg-white border-red-200"
      : "bg-white border-gray-200";

  const dot =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-gray-500";

  // Accessible roles
  const role = type === "error" ? "alert" : "status";
  const ariaLive = type === "error" ? "assertive" : "polite";

  return (
    <div
      className={`${base} ${colors} ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
      role={role}
      aria-live={ariaLive}
    >
      <div className="flex items-start gap-3">
        <span className={`mt-1 h-2 w-2 rounded-full ${dot}`} />
        <div className="flex-1">
          <p className="font-semibold text-gray-900">{title}</p>
          {message ? <p className="mt-1 text-sm text-gray-700">{message}</p> : null}
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-gray-100"
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
