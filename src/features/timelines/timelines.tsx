import { useMemo } from 'react';
import { flatten, map, range } from 'lodash';
import { useAppSelector } from '../../store'
import { sortTimelines } from './utils';
import Column from './column';
import Timeline from './timeline';

import styles from './timelines.module.sass'

const Timelines = () => {
  const timelines = useAppSelector(state => state.timelines);

  const snapshots = useAppSelector(state => state.videoSnapshots);

  const groupedTimelines = useMemo(() => sortTimelines([...timelines]), [timelines]);

  const flattenTimelines = flatten(Object.values(groupedTimelines));

  return (
    <div
      className={styles.timelines}>
      <div
        className={styles.timelines__content}
        style={{
          gridTemplateColumns: '14rem '.repeat(snapshots.snapshotsCount),
          gridTemplateRows: `4rem ${'max-content '.repeat(flattenTimelines[flattenTimelines.length - 1]?.rowIndex - 1) || 0} 4rem`,
        }}
      >
        {
          map(range(snapshots.snapshotsCount), (index) => (
            <Column index={index} key={index} />
          ))
        }
        {
          flattenTimelines.map((timeline) => (
            <Timeline key={timeline.timelineId} timeline={timeline} />
          ))
        }
      </div>
    </div>

  )
}

export default Timelines