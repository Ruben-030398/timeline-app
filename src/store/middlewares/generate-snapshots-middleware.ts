import { Dispatch, Middleware } from '@reduxjs/toolkit';
import { range } from 'lodash';

import { RootState } from '../rootReducer';
import { SnapShot, setVideoSnapshots } from '../slices/vidoe-snapshots';
import { generateSnapshots } from '../actions/generate-snapshots';

import { nanoid } from 'nanoid';
import { SNAPSHOTS_CHUNK_SIZE } from '../../features/snapshots/constants';

const generateSnapshotsMiddleware: Middleware<Dispatch, RootState> = (store) => (next) => async (action) => {
  next(action);

  if (generateSnapshots.match(action)) {

    if (action.payload) {
      const { video, skip = 0, limit = SNAPSHOTS_CHUNK_SIZE } = action.payload;
      const duration = Math.floor(video.duration);

      const secondsRange = range(duration);

      const chunk = secondsRange.slice(skip + 1, skip + limit + 1)

      if (!chunk.length) return;

      const snapshots = [] as Array<SnapShot>;

      await chunk.reduce(async (prevPromise, second) => {
        await prevPromise;

        return new Promise((res) => {
          setTimeout(() => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            video.pause();

            video.ontimeupdate = () => {
              const context = canvas.getContext('2d');
              context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  
              const snapshotDataUrl = canvas.toDataURL('image/png');
              const id = nanoid();
  
              snapshots.push({ snapshot: snapshotDataUrl, id });

              video.ontimeupdate = null;

              res();
            }

            video.currentTime = second;
          }, 100)
        })

      }, Promise.resolve())

      store.dispatch(setVideoSnapshots({ total: duration, snapshots }))
    }
  }

};

export default generateSnapshotsMiddleware;