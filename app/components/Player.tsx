import { useAtomValue } from 'jotai';
import { FC } from 'react';
import { selectedVideoUrl } from '~/atom/selectedVideoUrl';
import { useWindowSize } from '~/hooks/useWindowSize';

export const Player: FC = () => {
  const [width, height] = useWindowSize();
  const videoUrl = useAtomValue(selectedVideoUrl);

  return (
    <>
      <iframe id="ytplayer" width={width} height={height} src={videoUrl} title="video" />
    </>
  );
};
