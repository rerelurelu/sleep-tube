import { getAuth } from '@clerk/remix/ssr.server';
import { redirect, LoaderFunction, MetaFunction, ActionFunction, json } from '@remix-run/node';
import { useLoaderData, useActionData, useFetcher } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { Player } from '~/components/Player';
import { VideoList } from '~/components/VideoList';
import { fetchVideos, addVideo } from '~/models/video.server';
import { Video } from '~/types/video';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) return redirect('/sign-in');

  const videos = await fetchVideos();
  return videos;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const videoUrl = formData.get('videoUrl') as string;

  if (!videoUrl) {
    return json({ errors: { message: 'ERROR!' } }, { status: 400 });
  }

  await addVideo(videoUrl);
  return null;
};

export default function Index() {
  const videos = useLoaderData<typeof loader>() as Video[];
  const actionData = useActionData<{ errors: { message: string } }>();
  const fetcher = useFetcher();
  const isAdding = fetcher.state !== 'idle';
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset();
    }
  }, [isAdding]);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <Player />
      <div className="py-16 px-10 flex justify-between w-full">
        <fetcher.Form
          ref={formRef}
          method="post"
          className="grid gap-5 w-full max-w-xl max-h-32 grid-cols-5 grid-rows-2"
        >
          <input
            name="videoUrl"
            autoComplete="off"
            type="text"
            placeholder="Video URL"
            className="input input-bordered w-full max-w-xs col-span-3"
          />
          <button
            type="submit"
            className="btn bg-indigo-700 text-indigo-100 hover:bg-indigo-900"
            disabled={isAdding}
          >
            Add
          </button>
          {actionData?.errors && (
            <div className="col-span-3">
              <span className="text-indigo-700">{actionData?.errors.message}</span>
            </div>
          )}
        </fetcher.Form>
        <VideoList videos={videos} />
      </div>
    </div>
  );
}
