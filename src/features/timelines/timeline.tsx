import React from 'react'
import type { Timeline as TimelineType } from '../../store/slices/timelines'

import styles from './timelines.module.sass'
import { useAppSelector } from '../../store'
import { registerDialog } from '../../atoms/global-dialogs'
import ViewEventsDialog from '../../dialogs/view-events-dialog/view-events-dialog'

export type TimelineProps = {
  timeline: TimelineType & { rowIndex: number },
}

const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
  const snapshots = useAppSelector(state => state.videoSnapshots);

  const onViewHandler = (timelineId: string) => {
    registerDialog({
      Component: ViewEventsDialog,
      props: { timelineId }
    })
  }

  return (
    <div
      id={timeline.timelineId}
      className={styles.timelines__item}
      style={{
        gridColumn: `${timeline.startIndex + 1} / ${timeline.endIndex + 2}`,
        gridRow: `${timeline.rowIndex} / ${timeline.rowIndex + 1}`,
        gridTemplateRows: `auto ${'1fr '.repeat(Math.min(3, timeline.events.length))}`,
      }}
    >
      <div
        onClick={() => onViewHandler(timeline.timelineId)}
        className={styles.timelines__shadow}
      >
        <span className={styles.title_3}>View</span>
      </div>
      <div
        className={styles.timelines__events}
        style={{
          gridTemplateColumns: 'minmax(15rem, 1fr) '.repeat(timeline.snapshots.length),
        }}
      >
        {
          timeline.snapshots.map(snapshotId => (
            <div className={styles.timelines__item__content} key={snapshotId}>
              <img src={snapshots.snapshots[snapshotId].snapshot} alt="Snapshot" />
            </div>
          ))
        }
      </div>
      {
        timeline.events.slice(0, 2).map(event => (
          <div
            className={styles.timelines__event}
            style={{ backgroundColor: event.color }}
            key={event.event}
          >
            {event.event}
          </div>
        ))
      }
      {
        (timeline.events.length >= 3) && (
          <div
            className={styles.timelines__event}
          >
            {`And ${timeline.events.length - 2} more...`}
          </div>
        )
      }
    </div>
  )
}

export default Timeline