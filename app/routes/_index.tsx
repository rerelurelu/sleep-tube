import { useAuth } from '@clerk/remix'
import { getAuth } from '@clerk/remix/ssr.server'
import { ActionFunction, LoaderFunction, MetaFunction, json, redirect } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useRef } from 'react'
import { Player } from '~/components/Player'
import { VideoList } from '~/components/VideoList'
import { addVideo, fetchVideos } from '~/models/video.server'
import { Video } from '~/types/video'

export const meta: MetaFunction = () => {
	return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export const loader: LoaderFunction = async (args) => {
	const { userId } = await getAuth(args)
	if (!userId) return redirect('/sign-in')

	const videos = await fetchVideos(userId)
	return videos
}

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData()
	const videoUrl = formData.get('videoUrl') as string
	const userId = formData.get('userId') as string

	if (!videoUrl || !userId) {
		return json({ error: { message: 'エラーです' } })
	}

	try {
		await addVideo(userId, videoUrl)
	} catch (e) {
		return json({ error: { message: 'URLが不正またはデータベースに接続できませんでした' } })
	}
	return null
}

type FetcherData = {
	error?: { message: string }
}

export default function Index() {
	const videos = useLoaderData<typeof loader>() as Video[]
	const fetcher = useFetcher<FetcherData>()
	const isAdding = fetcher.state !== 'idle'
	const formRef = useRef<HTMLFormElement>(null)
	const { userId } = useAuth()

	useEffect(() => {
		if (!isAdding) {
			formRef.current?.reset()
		}
	}, [isAdding])

	return (
		<div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
			<Player />
			<div className='py-16 px-10 flex justify-between w-full'>
				<fetcher.Form
					ref={formRef}
					method='post'
					className='grid gap-x-5 w-full max-w-xl max-h-32 grid-cols-5 grid-rows-2 place-items-center'
				>
					{userId && <input hidden readOnly name='userId' value={userId} />}
					<input
						name='videoUrl'
						autoComplete='off'
						type='text'
						placeholder='Video URL'
						className='input input-bordered w-full max-w-xs col-span-3'
					/>
					<button
						type='submit'
						className='btn bg-indigo-700 text-indigo-100 hover:bg-indigo-900'
						disabled={isAdding}
					>
						Add
					</button>
					{fetcher.data?.error && (
						<div className='col-span-3'>
							<span className='text-red-700'>{fetcher.data.error.message}</span>
						</div>
					)}
				</fetcher.Form>
				<VideoList videos={videos} />
			</div>
		</div>
	)
}
