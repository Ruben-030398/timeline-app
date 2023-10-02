import React, { useEffect, useRef, useState } from 'react'
import styles from './snapshot-selector.module.sass'
import { Check, X } from 'lucide-react';
import { DEFAULT_SNAPSHOT_NODE_WIDTH } from '../../constants';

export type SnapshotSelectorProps = {
  startX: number,
  maxWidth: number,
  onSave: (width: number) => void
  onReset: () => void,
}

export const SnapshotSelector: React.FC<SnapshotSelectorProps> = ({ startX = 0, onReset, onSave, maxWidth }) => {
  const [width, setWidth] = useState(DEFAULT_SNAPSHOT_NODE_WIDTH);
  const [isDragging, setIsDragging] = useState(false);

  const pointerDown = useRef(false);
  const pointerDownX = useRef(0);

  const onSaveHandler = () => {
    onResetHandler();

    onSave(width);
  }

  const onResetHandler = () => {
    onReset();
    setWidth(DEFAULT_SNAPSHOT_NODE_WIDTH);
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    pointerDown.current = true;
    pointerDownX.current = e.clientX;
  }

  const onPointerUp = () => {
    pointerDown.current = false;
    pointerDownX.current = 0;

    autoComplete();
  }

  const onPointerOut = () => {
    setIsDragging(false);

    autoComplete();

    pointerDown.current = false;
  }  

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (pointerDown.current) {

      const diff = e.clientX - pointerDownX.current;

      if (
        (width + diff >= DEFAULT_SNAPSHOT_NODE_WIDTH) 
        && (width + diff < maxWidth)
        && (width + startX <= maxWidth)) {
        setWidth(prev => prev + diff)
      }

      pointerDownX.current = e.clientX
    }
  }

  const autoComplete = () => {
    const notCompletedArea = (width % DEFAULT_SNAPSHOT_NODE_WIDTH);

    if (notCompletedArea > 0) {
      const autoCompleteArea = DEFAULT_SNAPSHOT_NODE_WIDTH - notCompletedArea;

      if (autoCompleteArea > (DEFAULT_SNAPSHOT_NODE_WIDTH / 100) * 50) // more then 50% of common snapshot node 
        setWidth(width - notCompletedArea)
      else
        setWidth(width + autoCompleteArea)
    }
  }

  useEffect(() => {
    setWidth(DEFAULT_SNAPSHOT_NODE_WIDTH);
  }, [startX])

  return (
    <div
      style={{
        transform: `translate(${startX}px, -100%)`,
        width: isDragging ? '100%' : 'max-content',
      }}
      className={styles.snapshot_cont}
      onPointerMove={onPointerMove}
    >
      <div
        className={styles.snapshot_selector}
        style={{
          width,
          height: 100,
        }}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
        onPointerOut={onPointerOut}
        onPointerOutCapture={onPointerOut}
      >
        <div title='Save' className={styles.snapshot_selector__buttons_container}>
          <span>
            <Check onClick={onSaveHandler} className={styles.snapshot_selector__icon_green} />
          </span>
          <span title='Cancel'>
            <X onClick={onResetHandler} className={styles.snapshot_selector__icon_red} />
          </span>
        </div>
      </div>
    </div>

  )
}
