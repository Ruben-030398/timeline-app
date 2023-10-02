import { Dispatch, Middleware } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { findIndex, update } from 'lodash';

import { RootState } from '../rootReducer';
import { generateTimeline } from '../actions/generate-timeline-action';
import { Timeline, addTimeline, updateTimeline } from '../slices/timelines';
import { getRandomBackgroundColor } from '../../utils';

const generateTimelineMiddleware: Middleware<Dispatch, RootState> = (store) => (next) => async (action) => {
  next(action);

  if (generateTimeline.match(action)) {
    const snapshots = Object.values(store.getState().videoSnapshots.snapshots);
    const timelines = store.getState().timelines;

    const existingTimelineIndex = findIndex(
      timelines,
      { endIndex: action.payload.endIndex, startIndex: action.payload.startIndex }
    );

    if (existingTimelineIndex >= 0) { // check if there is already existing timeline and update its events

      //check if there is already existing event in timeline
      const isExistingEvent = timelines[existingTimelineIndex].events.some(event => action.payload.events.includes(event.event));

      if (isExistingEvent) return;

      const updatedTimeline = update(
        { ...timelines[existingTimelineIndex] },
        'events',
        events => ([
          ...events,
          ...action.payload.events.map(event => ({ event, color: getRandomBackgroundColor() }))
        ])
      );

      store.dispatch(updateTimeline(updatedTimeline));

      setTimeout(() => {
        document.getElementById(timelines[existingTimelineIndex].timelineId)!.scrollIntoView();
      }, 100);

    } else { // otherwise create new timeline
      const timelineSnapshots = action.payload.startIndex === action.payload.endIndex ?
        [snapshots[action.payload.startIndex].id]
        : snapshots.map(timeline => timeline.id).slice(action.payload.startIndex, action.payload.endIndex + 1)

      const timelineId = nanoid();

      const timeline: Timeline = {
        endIndex: action.payload.endIndex,
        startIndex: action.payload.startIndex,
        snapshots: timelineSnapshots,
        timelineId,
        events: action.payload.events.map(event => ({ event, color: getRandomBackgroundColor() }))
      }

      store.dispatch(addTimeline(timeline));

      setTimeout(() => {
        document.getElementById(timelineId)!.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }
}


export default generateTimelineMiddleware;