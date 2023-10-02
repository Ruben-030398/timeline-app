import { combineReducers } from '@reduxjs/toolkit'
import { videoSnapshotsReducer } from './slices/vidoe-snapshots';
import { timelinesReducer } from './slices/timelines';

export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  videoSnapshots: videoSnapshotsReducer,
  timelines: timelinesReducer,
})

export default rootReducer;