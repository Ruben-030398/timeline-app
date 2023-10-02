import React from 'react'
import styles from './timelines.module.sass';

export type ColumnProps = {
  index: number
}

const Column: React.FC<ColumnProps> = ({ index }) => {
  return (
    <div
      className={styles.timelines__column}
      style={{
        gridColumn: `${index + 1} / ${index + 2}`,
        gridRow: '1 / -1',

      }}
    >
      <span>{index + 1} sec</span>
      <span>{index + 1} sec</span>
    </div>
  )
}

export default Column