import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux'

import rootReducer, { RootState } from './rootReducer'

import generateSnapshotsMiddleware from './middlewares/generate-snapshots-middleware'
import generateTimelineMiddleware from './middlewares/generate-timeline-middleware'


const store = configureStore({
  reducer: rootReducer,
  middleware: [generateSnapshotsMiddleware, generateTimelineMiddleware],
  devTools: true,
})

export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store