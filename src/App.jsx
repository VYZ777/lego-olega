import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './components/Main'
import AllCharacters from './components/Character'
import Battle from './components/Battle.jsx'
import { SingleCharacter } from './components/SingleCharacter'
import { SingleBattle } from './components/SingleBattle'
import Cart from './components/Cart'
import Scales from './components/Scales'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Info } from './components/Info'
import { SignIn, SignUp } from '@clerk/clerk-react'
import MainEn from './components/en/MainEn'

const router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
  },
  {
    path: '/character',
    Component: AllCharacters,
  },
  {
    path: '/battle',
    Component: Battle,
  },
  {
    path: 'character/:characterId',
    Component: SingleCharacter,
  },
  {
    path: 'battle/:battleId',
    Component: SingleBattle,
  },
  {
    path: '/cart',
    Component: Cart,
  },
  {
    path: '/scales',
    Component: Scales,
  },
  {
    path: '/info',
    Component: Info,
  },
  {
    path: '/en/',
    Component: MainEn,
  },
  {
    path: '/sign-in/*',
    Component: SignIn,
  },
  {
    path: '/sign-up/*',
    Component: SignUp,
  },
  {
    path: '/protected',
  },
])

function App() {
  return (
    <div>
      <ToastContainer position='bottom-right' autoClose={1500} theme='light' />
      <RouterProvider
        router={router}
        fallbackElement={<div>Unknown page</div>}
      />
    </div>
  )
}

export default App
