import { useAtomValue } from 'jotai'
import { FC } from 'react'
import { selectedVideoUrl } from '~/atom/selectedVideoUrl'

export const Player: FC = () => {
  const videoUrl = useAtomValue(selectedVideoUrl)

  return (
    <>
      <iframe id='ytplayer' src={videoUrl} title='video' className='w-screen h-screen' />
    </>
  )
}
