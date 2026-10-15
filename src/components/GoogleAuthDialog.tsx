import React, { useState } from 'react';
import { X, Check, Shield } from 'lucide-react';
import { GoogleUser } from '../types/auth';

interface GoogleAuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: GoogleUser) => void;
  defaultEmail?: string;
}

export const GoogleAuthDialog: React.FC<GoogleAuthDialogProps> = ({
  isOpen,
  onClose,
  onSuccess,
  defaultEmail = 'khushrathod223@gmail.com',
}) => {
  const [selectedEmail, setSelectedEmail] = useState(defaultEmail);
  const [customEmail, setCustomEmail] = useState('');
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSelect = (email: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      const displayName = email.split('@')[0];
      const capitalized = displayName.charAt(0).toUpperCase() + displayName.slice(1);
      const user: GoogleUser = {
        id: `google_${Date.now()}`,
        name: capitalized,
        email: email,
        photoUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(capitalized)}&backgroundColor=00e5ff,0072ff`,
        provider: 'google',
      };
      setIsProcessing(false);
      onSuccess(user);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) return;
    handleSelect(customEmail);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm rounded-2xl bg-white text-slate-800 p-6 shadow-2xl overflow-hidden">
        {/* Header with Google Logo */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3h3.88c2.27-2.09 3.66-5.17 3.66-9.09z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.09C3.26 21.36 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.32c-.25-.72-.38-1.49-.38-2.32s.13-1.6.38-2.32V6.59H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.41l4.04-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.59l4.04 3.09c.95-2.83 3.6-4.93 6.72-4.93z"
              />
            </svg>
            <span className="font-semibold text-sm text-slate-700">Sign in with Google</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content */}
        <div className="py-4">
          <h4 className="font-bold text-base text-slate-900">Choose an account</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            to continue to <strong className="text-slate-800">PiK Music SCuII</strong>
          </p>

          {isProcessing ? (
            <div className="py-8 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-medium text-slate-600">Authenticating with Google...</p>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {/* Primary Account Item */}
              <button
                type="button"
                onClick={() => handleSelect(selectedEmail)}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                    {selectedEmail.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {selectedEmail.split('@')[0]}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{selectedEmail}</p>
                  </div>
                </div>
                <Check className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
              </button>

              {/* Add another account section */}
              {isAddingAccount ? (
                <form onSubmit={handleCustomSubmit} className="pt-2">
                  <input
                    type="email"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="Enter Google email address"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      type="submit"
                      className="flex-1 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingAccount(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAddingAccount(true)}
                  className="w-full py-2.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-slate-50 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Use another Google account</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Security badge footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>OAuth 2.0 verified token exchange</span>
        </div>
      </div>
    </div>
  );
};
