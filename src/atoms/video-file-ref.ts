import { atom, useRecoilState } from 'recoil';

export type VideoFileRefType = { ref: null | HTMLVideoElement }

export const videoFileRefAtom = atom<VideoFileRefType>({
  key: 'videoFileRef',
  default: { ref: null }, 
});

export function useVideoFileRef() {
  const [videoFileRef, setVideoFileRef] = useRecoilState(videoFileRefAtom);

  const setVideoRef = (newFile: VideoFileRefType) => {
    setVideoFileRef(newFile);
  };

  return { videoFileRef, setVideoRef };
}