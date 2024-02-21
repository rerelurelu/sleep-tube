import { client } from '~/libs/supabase'
import { createThumbnailUrl } from '~/utils/createThumbnailUrl'

export const fetchVideos = async () => {
	const { data: videos } = await client.from('video').select('*')
	return videos
}

export const addVideo = async (videoUrl: string) => {
	const thumbnailUrl = createThumbnailUrl(videoUrl)
	const convertedVideoUrl = videoUrl.replace('watch?v=', 'embed/')
	await client.from('video').insert({ videoUrl: convertedVideoUrl, thumbnailUrl: thumbnailUrl })
}
