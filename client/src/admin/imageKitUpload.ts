import { API_BASE } from '../lib/apiBase';
import { storedLanguage } from '../i18n/LanguageContext';
import { supabase } from '../supabaseClient';

interface AuthenticationResponse {
  token: string;
  expire: number;
  signature: string;
  folder: string;
  publicKey: string;
}

export interface ImageKitUploadResult {
  url: string;
  fileId: string;
  fileType?: string;
}

export async function uploadToImageKit(file: File, folder: string): Promise<ImageKitUploadResult> {
  const limit = file.type.startsWith('video/') ? 100 : 25;
  if (file.size > limit * 1024 * 1024) {
    throw new Error(`${file.type.startsWith('video/') ? 'Videos' : 'Images'} on the ImageKit free plan must be ${limit} MB or smaller.`);
  }

  const session = await supabase?.auth.getSession();
  const token = session?.data.session?.access_token;
  if (!token) throw new Error('Your admin session has expired. Please sign in again.');

  const authenticationResponse = await fetch(`${API_BASE}/api/admin/media/signature`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Content-Language': storedLanguage(),
    },
    body: JSON.stringify({ folder }),
  });
  const auth = await authenticationResponse.json().catch(() => ({})) as AuthenticationResponse & { error?: string };
  if (!authenticationResponse.ok) throw new Error(auth.error ?? 'Could not authorize the ImageKit upload.');

  const body = new FormData();
  body.append('file', file);
  body.append('fileName', file.name);
  body.append('publicKey', auth.publicKey);
  body.append('token', auth.token);
  body.append('expire', String(auth.expire));
  body.append('signature', auth.signature);
  body.append('folder', auth.folder);
  body.append('useUniqueFileName', 'true');

  const uploadResponse = await fetch('https://upload.imagekit.io/api/v1/files/upload', { method: 'POST', body });
  const uploaded = await uploadResponse.json().catch(() => ({})) as {
    url?: string;
    fileId?: string;
    fileType?: string;
    message?: string;
  };
  if (!uploadResponse.ok || !uploaded.url || !uploaded.fileId) {
    throw new Error(uploaded.message ?? 'ImageKit upload failed.');
  }

  return { url: uploaded.url, fileId: uploaded.fileId, fileType: uploaded.fileType };
}
