import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/index.ts'
import { RecoilRoot } from 'recoil'
import RecoilNexus from 'recoil-nexus'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RecoilRoot>
        <RecoilNexus />
        <App />
      </RecoilRoot>
    </Provider>
  </React.StrictMode>,
)
