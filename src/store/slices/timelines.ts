import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { findIndex, update } from "lodash";

export type TimelineEvent = {
  event: string,
  color: string,
}


export type Timeline = {
  startIndex: number // index of snapshot
  endIndex: number // index of snapshot
  snapshots: Array<string> // ids of timelines
  timelineId: string // nanoid of timeline
  events: Array<TimelineEvent>
}

export type Timelines = Array<Timeline>

export type AddTimelinePayload = {
  startIndex: number,
  endIndex: number,
  events: Array<TimelineEvent>
}

export type GenerateTimelinePayload = Omit<AddTimelinePayload, 'events'> & { events: Array<string> }

const initialState: Timelines = [];

const timelines = createSlice({
  name: 'timelines',
  initialState,
  reducers: {
    addTimeline: (state, action: PayloadAction<Timeline>) => {
      state.push(action.payload);
    },
    updateTimeline: (state, action: PayloadAction<Partial<Timeline> & { timelineId: string }>) => {
      const updatedTimelineIndex = findIndex(state, { timelineId: action.payload.timelineId });

      if (updatedTimelineIndex >= 0) {
        update(state, `[${updatedTimelineIndex}]`, timeline => ({ ...timeline, ...action.payload }));
      }
    }
  },
})

export const { actions: { addTimeline, updateTimeline }, reducer: timelinesReducer } = timelines;