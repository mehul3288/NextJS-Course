"use client";

import { useState } from "react";

interface PasswordInputProps {
  id: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  hint?: string;
}

export function PasswordInput({
  id,
  name,
  placeholder = "••••••••",
  required,
  hint,
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-sm">
      <div className="relative group">
        <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors select-none">
          lock
        </span>
        <input
          id={id}
          name={name}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg py-md pl-11 pr-11 font-body-md text-body-md text-on-surface placeholder:text-outline-variant outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          <span className="material-symbols-outlined text-[20px]">
            {visible ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
      {hint && (
        <p className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">info</span>
          {hint}
        </p>
      )}
    </div>
  );
}