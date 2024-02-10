import { SignOutButton } from '@clerk/remix';
import { getAuth } from '@clerk/remix/ssr.server';
import { redirect, type LoaderFunction, type MetaFunction, json } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { fetchVideos } from '~/models/video.server';
import { Video } from '~/types/video';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) return redirect('/sign-in');

  const videos = await fetchVideos();
  return json(videos);
};

export default function Index() {
  const videos = useLoaderData<Video[] | null>();
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate('/sign-in');
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to Remix</h1>
      {videos &&
        videos.length > 0 &&
        videos.map((video) => <div key={video.id}>{video.videoUrl}</div>)}
      <SignOutButton signOutCallback={handleSignOut} />
    </div>
  );
}
