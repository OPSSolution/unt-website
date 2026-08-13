import React, { useId, useRef, useState } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import { uploadToImageKit, uploadToCloudinary } from '../imageKitUpload';
import { api } from '../api';
import { useAdminAuth } from '../hooks/useAdminAuth';

type Provider = 'imagekit' | 'cloudinary';

interface Props {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  folder?: string;
  previewType?: 'image' | 'video';
  bucket?: string;
}

export function ImageField({ label, value, onChange, accept = 'image/*', folder = 'images', previewType = 'image' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [provider, setProvider] = useState<Provider>('imagekit');
  const [ikConfigured, setIkConfigured] = useState<boolean | null>(null);
  const [cdConfigured, setCdConfigured] = useState<boolean | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldId = useId();
  const { token } = useAdminAuth();

  React.useEffect(() => {
    if (!token) return;
    api.getImageKitSettings(token).then((s) => setIkConfigured(s.configured)).catch(() => setIkConfigured(false));
    api.getCloudinarySettings(token).then((s) => setCdConfigured(s.configured)).catch(() => setCdConfigured(false));
  }, [token]);

  const handleFile = async (file: File) => {
    setUploading(true);
    setUploadError('');
    try {
      const uploaded = provider === 'cloudinary'
        ? await uploadToCloudinary(file, folder)
        : await uploadToImageKit(file, folder);
      onChange(uploaded.url);
    } catch (error: unknown) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={fieldId} className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</label>
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
          <button
            type="button"
            onClick={() => setProvider('imagekit')}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
              provider === 'imagekit'
                ? 'bg-white dark:bg-slate-700 text-blue-700 dark:text-blue-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            ImageKit{ikConfigured === false && ' ⚠'}
          </button>
          <button
            type="button"
            onClick={() => setProvider('cloudinary')}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
              provider === 'cloudinary'
                ? 'bg-white dark:bg-slate-700 text-purple-700 dark:text-purple-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            Cloudinary{cdConfigured === false && ' ⚠'}
          </button>

        </div>
      </div>

      <div className="flex gap-2">
        <input
          id={fieldId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL or upload →"
          className="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 text-slate-700 dark:text-white text-xs font-medium transition-colors shrink-0"
        >
          {uploading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
          <span>{uploading ? 'Uploading...' : `Upload`}</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); e.currentTarget.value = ''; }}
        />
      </div>

      {uploadError && <p className="text-red-500 dark:text-red-400 text-xs">{uploadError}</p>}

      {value && (
        <div className="relative w-full h-36 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 group">
          {previewType === 'video'
            ? <video key={value} src={value} controls preload="metadata" className="w-full h-full object-contain bg-black" />
            : <img key={value} src={value} alt="preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.classList.add('hidden'); }} onLoad={(e) => { e.currentTarget.classList.remove('hidden'); }} />}
          <button
            type="button"
            aria-label={`Remove ${label}`}
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
