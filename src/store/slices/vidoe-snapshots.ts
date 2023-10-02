import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { generateSnapshots } from "../actions/generate-snapshots";

export type SnapShot = {
  snapshot: string
  id: string
}

export type Snapshots = {
  [key: string]: SnapShot;
}

export type VideoSnapshotsType = {
  snapshots: Snapshots, // key is snapshot id and value is snapshot
  snapshotsCount: number,
  generating: boolean,
  error: string,
  total: number,
}

export type SetVideoSnapshotsPayload = {
  snapshots: Array<SnapShot>,
  total: number
}

const initialState: VideoSnapshotsType = {
  total: 0,
  snapshots: {},
  snapshotsCount: 0,
  error: '',
  generating: false,
};

const videoFile = createSlice({
  name: 'videoSnapshots',
  initialState,
  reducers: {
    setVideoSnapshots: (state, action: PayloadAction<SetVideoSnapshotsPayload>) => {
      state.error = '';
      state.generating = false;
      state.snapshotsCount = state.snapshotsCount + action.payload.snapshots.length;
      state.total = action.payload.total;

      action.payload.snapshots.forEach(snapshot => {
        state.snapshots[snapshot.id] = snapshot;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateSnapshots.type, (state) => {
      state.generating = true
    })
  },
})

export const { actions: { setVideoSnapshots }, reducer: videoSnapshotsReducer } = videoFile;