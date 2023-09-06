import { Menu, Button } from '@mantine/core'
import { AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai'
import { PiScales } from 'react-icons/pi'
import '../../styles/styles.css'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { CartEmpty } from './CartEmpty'
import { useState, useEffect } from 'react'
import { UserButton, useAuth } from '@clerk/clerk-react'
import SearchBar from './SearchBar'
import '../i18n.js'
import { supabase } from '../libs/supabaseClient'
import { fetchCart } from '../../store/slice'
import { useTranslation } from 'react-i18next'

function MenuButton() {
  let [show, setShow] = useState()
  const { userId } = useAuth()
  const [isEn, setIsEn] = useState(false)
  const navigate = useNavigate()
  const cart = useSelector((state) => state.characters.cartItem)
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  const makeEn = () => {
    setIsEn(!isEn)
    i18n.changeLanguage(isEn ? 'en' : 'ru')
  }

  useEffect(() => {
    dispatch(fetchCart(userId))
  }, [userId, dispatch])

  return (
    <Menu offset={15} width={200} shadow='md'>
      <div style={{ marginRight: '2rem' }}>
        <SearchBar />
      </div>
      <div className='cart-length' style={{ color: 'white' }}>
        {cart?.[0]?.cart?.length}
      </div>
      <div
        style={{
          width: '4rem',
          marginRight: '1rem',
        }}
      >
        <AiOutlineShoppingCart
          onClick={() =>
            Object.keys(cart?.[0]?.cart).length > 0
              ? navigate('/cart')
              : setShow(true)
          }
          className='cart'
        />
      </div>

      <Button
        style={{ backgroundColor: '#3D1010', marginRight: '2rem' }}
        onClick={makeEn}
      >
        {isEn ? 'En' : 'Ru'}
      </Button>
      <Menu.Target>
        <Button style={{ backgroundColor: '#3D1010' }}>Товар</Button>
      </Menu.Target>

      <Menu.Dropdown style={{ backgroundColor: 'rgba(255, 0, 0, 0.3)' }}>
        <Link style={{ textDecoration: 'none' }} to={'/character'}>
          <Menu.Item>Карточки</Menu.Item>
        </Link>
        <Link style={{ textDecoration: 'none' }} to={'/kit'}>
          <Menu.Item style={{ borderWidth: '1px', borderTopStyle: 'solid' }}>
            Наборы
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
      <Link to={'/scales'}>
        <Button style={{ backgroundColor: '#3D1010', marginLeft: '2rem' }}>
          <PiScales className='login' />
          Сравнение
        </Button>
      </Link>
      <CartEmpty show={show} setShow={setShow} />

      {userId ? (
        <div style={{ marginLeft: '2rem', marginRight: '2rem' }}>
          <UserButton />
        </div>
      ) : (
        <>
          <Link to={'/sign-in'}>
            <Button
              style={{
                backgroundColor: '#3D1010',
                marginLeft: '2rem',
                marginRight: '2rem',
              }}
            >
              <AiOutlineUser className='login' />
              Войти
            </Button>
          </Link>
        </>
      )}
    </Menu>
  )
}

export default MenuButton
