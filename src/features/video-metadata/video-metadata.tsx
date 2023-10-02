import React from 'react'
import { useVideoFile } from '../../atoms/video-file';
import { useVideoFileRef } from '../../atoms/video-file-ref';
import { useAppSelector } from '../../store';

import styles from './video-metadata.module.sass';

const VideoMetadata = () => {
  const { videoFile } = useVideoFile();
  const { videoFileRef } = useVideoFileRef();
  const snapshotsCount = useAppSelector(state => state.videoSnapshots.snapshotsCount);

  if (!videoFile.file || !videoFileRef.ref) return null;

  return (
    <div className={styles.video_metadata}>
      <p>Name: {videoFile.file.name}</p>
      <p>Type: {videoFile.file.type}</p>
      <p>Size: {(videoFile.file.size / (1024 * 1024)).toFixed(2)} MB</p>
      <p>Duration: {Math.floor(videoFileRef.ref.duration) || 0} sec</p>
      <p>Snapshots generated: {snapshotsCount} / {Math.floor(videoFileRef.ref.duration) || 0}</p>
    </div>
  )
}

export default VideoMetadata