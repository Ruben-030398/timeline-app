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

      const chunk = secondsRange.slice(skip, skip + limit)

      if (!chunk.length) return;

      const snapshots = [] as Array<SnapShot>;

      for (const i of chunk) {

        await new Promise((res) => {
          setTimeout(() => {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        
            video.currentTime = i;
            video.pause();
        
            const context = canvas.getContext('2d');
            context?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        
            const snapshotDataUrl = canvas.toDataURL('image/png');
            const id = nanoid();
        
            snapshots.push({ snapshot: snapshotDataUrl, id });
        
            res({ snapshot: snapshotDataUrl, id });
          }, 100)
        })
      }    
      
      
      store.dispatch(setVideoSnapshots({ total: duration, snapshots: snapshots as Array<SnapShot>}))
    }
  }

};

export default generateSnapshotsMiddleware;