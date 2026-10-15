import React, { useState } from 'react';
import { X, Download, Copy, Check, FileCheck, ExternalLink, QrCode } from 'lucide-react';

interface AddToPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddToPhoneModal: React.FC<AddToPhoneModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const originUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://ais-pre-gt2ui7crvxp5joqc3hske6-766352146426.asia-southeast1.run.app';

  const apkUrl = `${originUrl}/pik-music-scui.apk`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    apkUrl
  )}&bgcolor=081430&color=00e5ff&margin=6`;

  const handleCopy = () => {
    navigator.clipboard.writeText(apkUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-lg rounded-2xl p-6 text-slate-200 overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(145deg, rgba(8, 20, 48, 0.98) 0%, rgba(2, 6, 23, 0.99) 100%)',
          border: '1.5px solid rgba(0, 229, 255, 0.5)',
          boxShadow: '0 0 40px rgba(0, 229, 255, 0.35)',
        }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-cyan-500/25">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-[#00e5ff]" />
            <h3 className="font-display font-bold text-lg text-white">
              Download Android .APK Installer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Direct Download Box */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-blue-950/30 to-slate-900 border border-cyan-400/40 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-sm font-bold text-white">pik-music-scui.apk</p>
                <p className="text-[11px] text-cyan-200/80">Signed Android Package &bull; v1.0.0 (Release)</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              READY
            </span>
          </div>

          {/* Big Download Button */}
          <a
            href="/pik-music-scui.apk"
            download="pik-music-scui.apk"
            className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-slate-950 bg-[#00e5ff] hover:bg-[#38bdf8] flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,229,255,0.5)] transition-all cursor-pointer transform active:scale-98"
          >
            <Download className="w-5 h-5" />
            <span>Download .APK to Device</span>
          </a>
        </div>

        {/* Scan to Download on Phone */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="w-24 h-24 bg-[#081430] p-1 rounded-xl border border-cyan-400/30 shrink-0 flex items-center justify-center">
            <img
              src={qrCodeUrl}
              alt="Scan QR code on your phone"
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="space-y-1.5 text-center sm:text-left flex-1">
            <p className="text-xs font-semibold text-white">Scan to Download directly onto your Phone:</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Point your phone camera at this QR code to download <strong>pik-music-scui.apk</strong> directly into your phone’s Downloads folder.
            </p>
            <button
              onClick={handleCopy}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Link Copied!' : 'Copy Direct APK Link'}</span>
            </button>
          </div>
        </div>

        {/* How to install from File Manager */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1.5 text-xs text-slate-300">
          <p className="font-semibold text-cyan-200">How to install directly from your File Manager:</p>
          <ol className="list-decimal pl-4 space-y-1 text-slate-400 text-[11px] leading-relaxed">
            <li>Download the <strong>pik-music-scui.apk</strong> file.</li>
            <li>Open your phone’s built-in <strong>Files</strong> or <strong>File Manager</strong> app.</li>
            <li>Go to the <strong>Downloads</strong> folder and tap <strong>pik-music-scui.apk</strong>.</li>
            <li>If prompted with "Install unknown apps", toggle <strong>Allow from this source</strong>.</li>
            <li>Tap <strong>Install</strong>. Once done, tap <strong>Open</strong> to launch PiK Music SCuII!</li>
          </ol>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-cyan-500/20 flex justify-end">
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
