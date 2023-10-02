import { createPortal } from 'react-dom'
import { closeDialog, useGlobalDialogs } from '../../atoms/global-dialogs'

export const GlobalDialogs = () => {
  const { globalDialogsMap } = useGlobalDialogs();

  return (
    !!globalDialogsMap.length && createPortal(
      globalDialogsMap.map(({ Component, props }) => (
        <Component key={Component.name} {...props} onClose={() => closeDialog(Component)} />
      )),
      document.getElementById('dialog-root')!
    )
  )
}
