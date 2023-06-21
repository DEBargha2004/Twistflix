import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {
  ClerkProvider,
  SignUp,
  SignedIn,
  SignedOut
} from '@clerk/clerk-react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={import.meta.env.VITE_clerk_publishable_key }>
    <SignedIn>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SignedIn>
    <SignedOut>
      <div className='h-[100vh] flex justify-center items-center'>
        <SignUp />
      </div>
    </SignedOut>
  </ClerkProvider>
)
