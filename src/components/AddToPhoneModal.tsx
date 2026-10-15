import React, { useState } from 'react';
import { X, Smartphone, Copy, Check, Download, QrCode, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AddToPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddToPhoneModal: React.FC<AddToPhoneModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'apk' | 'instant'>('apk');

  if (!isOpen) return null;

  // The app's shared live URL
  const appUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://ais-pre-gt2ui7crvxp5joqc3hske6-766352146426.asia-southeast1.run.app';

  // Direct APK download URL
  const apkDownloadUrl = `${appUrl}/pik-music-scui.apk`;

  // QR Code generator for direct APK download on phone
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    apkDownloadUrl
  )}&bgcolor=081430&color=00e5ff&margin=6`;

  const handleCopy = () => {
    navigator.clipboard.writeText(apkDownloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg rounded-2xl p-6 text-slate-200 overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(8, 20, 48, 0.96) 0%, rgba(2, 6, 23, 0.98) 100%)',
          border: '1.5px solid rgba(0, 229, 255, 0.4)',
          boxShadow: '0 0 35px rgba(0, 229, 255, 0.25)',
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[#00e5ff]" />
            <h3 className="font-display font-bold text-lg text-white">
              Download PiK Music Android APK
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-2 mt-4 p-1 rounded-xl bg-slate-900/80 border border-slate-700/60">
          <button
            onClick={() => setActiveTab('apk')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'apk'
                ? 'bg-[#00e5ff] text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Direct .APK Download</span>
          </button>
          <button
            onClick={() => setActiveTab('instant')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
              activeTab === 'instant'
                ? 'bg-[#00e5ff] text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Instant Web App (PWA)</span>
          </button>
        </div>

        {/* Tab 1: Direct Raw APK Download */}
        {activeTab === 'apk' ? (
          <div className="mt-4 space-y-4">
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-slate-950 font-bold shadow-md">
                    APK
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">PiK-Music-SCuII.apk</p>
                    <p className="text-xs text-cyan-300">Package: com.pik.music.scui &bull; 1.8 MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>v1/v2/v3 Signed</span>
                </div>
              </div>

              {/* Download Button */}
              <a
                href="/pik-music-scui.apk"
                download="PiK-Music-SCuII.apk"
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-slate-950 bg-[#00e5ff] hover:bg-[#38bdf8] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-98"
              >
                <Download className="w-4 h-4" />
                <span>Download .APK to This Device (1.8 MB)</span>
              </a>
            </div>

            {/* Scan to download on phone */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="w-20 h-20 bg-[#081430] p-1 rounded-lg border border-cyan-400/30 shrink-0 flex items-center justify-center">
                <img
                  src={qrCodeUrl}
                  alt="Scan to download APK on phone"
                  className="w-full h-full rounded"
                />
              </div>
              <div className="text-xs space-y-1">
                <p className="font-semibold text-white">Or Scan with Phone Camera:</p>
                <p className="text-slate-400 leading-snug">
                  Scan this QR code with your Android phone to directly download the APK file onto your phone.
                </p>
                <button
                  onClick={handleCopy}
                  className="pt-1 text-cyan-300 hover:text-white flex items-center gap-1 font-medium transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Link Copied!' : 'Copy Direct APK Link'}</span>
                </button>
              </div>
            </div>

            {/* Installation Instructions */}
            <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-200">Android Install Guide:</p>
              <p>1. Tap the downloaded file in your browser notifications.</p>
              <p>2. If prompted, tap <strong>Settings &gt; Allow from this source</strong> (standard for non-Play Store APKs).</p>
              <p>3. Tap <strong>Install</strong>. Done!</p>
            </div>
          </div>
        ) : (
          /* Tab 2: Instant PWA */
          <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-300">
            <p className="text-slate-400">
              You can also use PiK Music SCuII as a fullscreen Progressive Web App directly through your browser without installing the APK file.
            </p>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <p className="font-semibold text-white">Android Chrome:</p>
              <p className="text-slate-400">Open in Chrome &gt; Menu (3 dots) &gt; Install app / Add to Home screen.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
              <p className="font-semibold text-white">iPhone Safari:</p>
              <p className="text-slate-400">Open in Safari &gt; Share button &gt; Add to Home Screen.</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-cyan-400/80">
            <ShieldCheck className="w-4 h-4 text-[#00e5ff]" />
            <span>Clean & Verified APK</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-lg font-semibold text-xs text-slate-950 bg-[#00e5ff] hover:bg-[#38bdf8] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
