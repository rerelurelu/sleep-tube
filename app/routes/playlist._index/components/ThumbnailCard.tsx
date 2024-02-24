import { useSetAtom } from 'jotai'
import { FC } from 'react'
import { selectedVideoUrl } from '~/atom/selectedVideoUrl'
import { Video } from '~/types/video'

type Props = {
	video: Video
}

export const ThumbnailCard: FC<Props> = ({ video }) => {
	const setVideoUrl = useSetAtom(selectedVideoUrl)
	const onThumbnailClick = (url: string) => {
		setVideoUrl(url)
		window.scroll({ top: 0, behavior: 'smooth' })
	}

	return (
		<button
			type='button'
			className='hover:cursor-pointer rounded-md hover:scale-105 duration-500 ease-in-out image-full overflow-hidden w-[320px] h-[180px]'
			onClick={() => onThumbnailClick(video.videoUrl)}
		>
			<img src={video.thumbnailUrl} alt='video thumbnail' />
		</button>
	)
}
