import { useCallback, useMemo, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store'
import styles from './snapshots.module.sass';
import { DEFAULT_SNAPSHOT_NODE_WIDTH } from '../../constants';
import { registerDialog } from '../../atoms/global-dialogs';
import { AddEventDialog } from '../../dialogs/add-event-dialog/add-event-dialog';
import { SnapshotSelector } from '../snapshot-selector/snapshot-selector';
import useHorizontalScrollEnd from '../../hooks/useHorizontalScroll';
import { generateSnapshots } from '../../store/actions/generate-snapshots';
import { useVideoFileRef } from '../../atoms/video-file-ref';
import { SNAPSHOTS_CHUNK_SIZE } from './constants';

const Snapshots = () => {
  const [startX, setStartX] = useState(0);

  const scrollable = useRef<null | HTMLDivElement>(null);

  const { videoFileRef } = useVideoFileRef();

  const snapshots = useAppSelector(state => state.videoSnapshots);

  const dispatch = useAppDispatch();

  const maxWidth = useMemo(() => snapshots.snapshotsCount * DEFAULT_SNAPSHOT_NODE_WIDTH, [snapshots.snapshotsCount]);

  const onSave = (width: number) => {
    const startIndex = startX ? startX / DEFAULT_SNAPSHOT_NODE_WIDTH : 0;

    const endIndex = startIndex + (width / DEFAULT_SNAPSHOT_NODE_WIDTH) - 1;

    registerDialog({
      Component: AddEventDialog,
      props: { startIndex, endIndex }
    })
  }

  const onScrollEnd = useCallback(() => {    
    videoFileRef.ref && dispatch(generateSnapshots({
      video: videoFileRef.ref,
      skip: snapshots.snapshotsCount,
      limit: SNAPSHOTS_CHUNK_SIZE,
    }))
  }, [dispatch, snapshots.snapshotsCount, videoFileRef.ref])

  const onReset = () => {
    setStartX(0)
  }

  useHorizontalScrollEnd(scrollable.current, onScrollEnd, snapshots.generating || snapshots.snapshotsCount >= snapshots.total);

  return (
    <div 
      ref={scrollable}
      className={styles.snapshots}>
      <div 
        className={styles.snapshots__content}>
        {
          <>
            {
              Object.values(snapshots.snapshots).map((item, i) => (
                <div
                  key={item.id}
                  onClick={() => setStartX(i * 200)}
                  className={styles.snapshots__item}
                  style={{ width: DEFAULT_SNAPSHOT_NODE_WIDTH }}
                >
                  <img
                    src={item.snapshot}
                  />
                  <div
                    className={styles.snapshots__item__sec}
                  >
                    {i + 1} sec
                  </div>
                </div>
              ))
            }
            {

              snapshots.generating && (
                <div
                  className={styles.snapshots__item}
                  style={{ width: DEFAULT_SNAPSHOT_NODE_WIDTH }}
                >
                  Generating...
                </div>
              )
            }
          </>
        }
      </div>
      {!!snapshots.snapshotsCount && (
        <SnapshotSelector
          onSave={onSave}
          onReset={onReset}
          startX={startX}
          maxWidth={maxWidth}
        />
      )}
    </div>

  )
}

export default Snapshots