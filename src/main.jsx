import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from '../store/index'
import { Provider } from 'react-redux'
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from '@clerk/clerk-react'
import './i18n'
import './fonts/AA Bebas Neue Regular.ttf'
import './fonts/Calibri Light.ttf'
import { supabase } from './libs/supabaseClient'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
console.log(supabase)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback='loading'>
    <ClerkProvider publishableKey={clerkPubKey}>
      <SignedIn>
        <Provider store={store}>
          <App />
        </Provider>
      </SignedIn>
      <SignedOut>
        <Provider store={store}>
          <App />
        </Provider>
      </SignedOut>
    </ClerkProvider>
  </Suspense>
)
