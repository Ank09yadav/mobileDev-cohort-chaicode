import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import GithubProfile from './GithubProfile.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <GithubProfile></GithubProfile>
  </StrictMode>,
)
