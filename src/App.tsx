import Snapshots from './features/snapshots/snapshots';
import Timelines from './features/timelines/timelines';
import VideoPreview from './features/video-preview/video-preview';
import VideoUploader from './features/video-uploader/video-uploader'
import { GlobalDialogs } from './dialogs/global/global';
import './sass/main.sass'
import VideoMetadata from './features/video-metadata/video-metadata';

function App() {
  return (
    <>
      <div className='app_layout'>
        <VideoPreview />
        <VideoMetadata />
        <VideoUploader />
        <Snapshots />
        <Timelines />
      </div>

      <GlobalDialogs />
    </>
  )
}

export default App
