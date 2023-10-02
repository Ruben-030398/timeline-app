import { atom, useRecoilState } from 'recoil';

export type VideoFileType = { file: null | File }

export const videoFileAtom = atom<VideoFileType>({
  key: 'videoFile',
  default: { file: null }, 
});

export function useVideoFile() {
  const [videoFile, setVideoFile] = useRecoilState(videoFileAtom);

  const setNewFile = (newFile: VideoFileType) => {
    setVideoFile(newFile);
  };

  return { videoFile, setNewFile };
}