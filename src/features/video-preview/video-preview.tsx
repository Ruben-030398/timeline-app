import { useEffect, useRef } from 'react'
import clsx from 'clsx';

import { useVideoFile } from '../../atoms/video-file';
import { useAppDispatch } from '../../store';
import { generateSnapshots } from '../../store/actions/generate-snapshots';
import { useVideoFileRef } from '../../atoms/video-file-ref';

import styles from './video-preview.module.sass';


const VideoPreview = () => {
  const { videoFile } = useVideoFile();
  const { setVideoRef } = useVideoFileRef();

  const dispatch = useAppDispatch();

  const hiddenVideoRef = useRef<null | HTMLVideoElement>(null);
  const visibleVideoRef = useRef<null | HTMLVideoElement>(null);

  useEffect(() => {
    setVideoRef({ ref: hiddenVideoRef.current })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoFile.file])

  return (
    <div
      className={clsx(
        styles.video_preview,
        { [styles.video_preview_full]: !videoFile.file })
      }
    >
      {
        videoFile.file ? (
          <>
            <video
              src={URL.createObjectURL(videoFile.file)}
              autoPlay
              controls
              ref={visibleVideoRef}
              muted
            />
            <video
              ref={hiddenVideoRef}
              src={URL.createObjectURL(videoFile.file)}
              autoPlay
              controls
              muted
              style={{
                visibility: 'hidden',
                position: 'absolute',
                pointerEvents: 'none',
              }}
              onPlay={() => hiddenVideoRef.current && dispatch(generateSnapshots({
                video: hiddenVideoRef.current,
              }))}
            />
          </>
        ) : (
          <h2 className={styles.title_2}>No video uploaded</h2>
        )
      }
    </div>
  )
}

export default VideoPreview