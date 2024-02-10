import { client } from '~/libs/supabase';

export const fetchVideos = async () => {
  const { data: videos } = await client.from('video').select('*');
  return videos;
};

export const addVideo = async (videoUrl: string, thumbnailUrl: string) => {
  const convertedVideoUrl = videoUrl.replace('watch?v=', 'embed/');
  await client.from('video').insert({ video_url: convertedVideoUrl, thumbnail_url: thumbnailUrl });
};
