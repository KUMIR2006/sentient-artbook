import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export interface ArtData {
  title: string;
  twitter: string;
  discord: string;
  tags: string[];
  file: File;
}

export async function uploadArt(data: ArtData): Promise<{ success: boolean; error?: string }> {
  const fileExt = data.file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = fileName;

  const { error: uploadError } = await supabase.storage
    .from('artworks')
    .upload(filePath, data.file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) {
    return { success: false, error: 'Ошибка при загрузке файла: ' + uploadError.message };
  }

  const { data: urlData } = supabase.storage.from('artworks').getPublicUrl(filePath);
  const publicUrl = urlData.publicUrl;

  const { error: insertError } = await supabase.from('artworks').insert([
    {
      title: data.title,
      image_url: publicUrl,
      twitter: data.twitter,
      discord: data.discord,
      tags: data.tags,
    },
  ]);

  if (insertError) {
    return { success: false, error: 'Ошибка при добавлении в таблицу: ' + insertError.message };
  }

  return { success: true };
}
