import React from 'react'
import styles from './dialog-wrapper.module.sass'

export type DialogWrapperProps = {
  children: React.ReactElement,
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({ children }) => {
  return (
    <>
      <div className={styles.shadow} />
      <div className={styles.dialog_wrapper}>
        {
          children
        }
      </div>
    </>

  )
}

export default DialogWrapper