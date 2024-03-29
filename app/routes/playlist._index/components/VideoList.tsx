import { useAtom } from 'jotai'
import { FC } from 'react'
import { selectedVideoUrl } from '~/atom/selectedVideoUrl'
import { ThumbnailCard } from '~/routes/playlist._index/components/ThumbnailCard'
import { Video } from '~/types/video'
import { VideoListContainer } from './VideoListContainer'

type Props = {
  videos: Video[]
}

export const VideoList: FC<Props> = ({ videos }) => {
  const [videoUrl, setVideoUrl] = useAtom(selectedVideoUrl)

  if (!videoUrl) {
    const randomIndex = Math.floor(Math.random() * videos.length)
    setVideoUrl(videos[randomIndex].videoUrl)
  }

  return (
    <VideoListContainer>
      {videos.map((video) => (
        <ThumbnailCard key={video.id} video={video} />
      ))}
    </VideoListContainer>
  )
}
