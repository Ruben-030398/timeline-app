import React, { useCallback, useRef } from 'react'
import Button from '../../components/button/button'

import styles from './video-uploader.module.sass'
import { useVideoFile } from '../../atoms/video-file'


const VideoUploader: React.FC = () => {
  const inputRef = useRef<null | HTMLInputElement>(null);

  const { videoFile, setNewFile } = useVideoFile();

  const inputClickHandler = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }, [])

  const onUploadHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      setNewFile({ file: e.target.files[0] });
    }
  }, [setNewFile]);

  if (videoFile.file) return null;

  return (
    <div className={styles.video_uploader}>
      <Button onClick={inputClickHandler}>
        Upload Video
      </Button>
      <input
        ref={inputRef}
        className={styles.video_uploader__input}
        accept='video/*'
        type="file"
        name="video-uploader"
        id="video-uploader"
        onChange={onUploadHandler}
      />
    </div>
  )
}

export default VideoUploader