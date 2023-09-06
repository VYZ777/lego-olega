import { useDispatch, useSelector } from 'react-redux'
import { CartComponent } from './CartComponent.jsx'
import NavBar from './NavBar.jsx'
import '../../styles/styles-loader.css'
import { Button, Divider } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { Footer } from './Footer.jsx'
import { LastCounter } from './LastCounetr.jsx'
import { useEffect } from 'react'
import { fetchCart } from '../../store/slice.js'
import { useAuth } from '@clerk/clerk-react'

const Cart = () => {
  const cart = useSelector((state) => state.characters.cartItem)
  const navigate = useNavigate()
  const { userId } = useAuth()
  const dispatch = useDispatch()
  const goBack = () => {
    navigate(-1)
  }
  useEffect(() => {
    dispatch(fetchCart(userId))
  }, [])
  return (
    <div>
      <div
        style={{
          position: '-webkit-sticky',
          position: 'sticky',
          top: '0',
          zIndex: '99999',
        }}
      >
        <NavBar />
      </div>
      <div
        style={{
          marginLeft: '3rem',
          width: '15%',
          marginTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          width: '94%',
        }}
      >
        <Button
          onClick={goBack}
          variant='outline'
          color='dark'
          style={{ margin: '1rem' }}
        >
          Go Back
        </Button>
        <h1 style={{ fontSize: '3rem', fontFamily: 'sans-serif' }}>Корзина</h1>
      </div>

      <div
        style={{
          height: '100%',
          margin: '3rem',
          justifyContent: 'start',
          flexWrap: 'wrap',
        }}
      >
        {cart[0]?.cart?.map((el, i) => {
          return (
            <div key={el.id}>
              <CartComponent el={el} />
              <Divider style={{ width: '90%' }} />
            </div>
          )
        })}
        <div style={{ width: '90%', display: 'flex', justifyContent: 'end' }}>
          <LastCounter />
        </div>
      </div>
    </div>
  )
}

export default Cart
