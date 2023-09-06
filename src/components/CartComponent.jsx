import { Link } from 'react-router-dom'
import { Text, Group, Button } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { addToScales, addToCartAsync, removeCart } from '../../store/slice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { PiScales } from 'react-icons/pi'
import { useAuth } from '@clerk/clerk-react'

export function CartComponent({ el }) {
  const handleClick = () => {
    dispatch(addToScales(el))
    notification()
  }
  const { userId } = useAuth()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.characters.cartItem)

  const notificationCart = async () => {
    dispatch(
      addToCartAsync({
        userId,
        item: el?.cards,
      })
    )
  }
  const notification = () => {
    toast.success('Карточка добавлена к сравнению')
  }
  const count = el?.amount
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: '#f2f2f2',
        width: '90%',
        marginTop: '1rem',
        marginBottom: '1rem',
        borderRadius: '0.6rem',
        height: '5rem',
        alignItems: 'center',
      }}
    >
      <img
        style={{
          width: '3rem',
          marginLeft: '2rem',
          borderRadius: '0.5rem',
          height: '4rem',
        }}
        src={el?.cards?.image_url}
        alt=''
      />
      <div>
        <Link
          style={{ textDecoration: 'none' }}
          to={
            el?.cards?.kind === 'Персонаж'
              ? `/character/${el?.cards?.id}`
              : `/battle/${el?.cards?.id}`
          }
        >
          <Text
            size='lg'
            style={{ color: 'black', width: '20rem', marginLeft: '1rem' }}
            weight={500}
          >
            {el?.cards?.name}
          </Text>
        </Link>
        <Group position='apart' spacing='xs'>
          <Group spacing='lg'></Group>
        </Group>
        <PiScales className='scales' onClick={handleClick} />
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
        }}
      >
        <Text
          size='sm'
          style={{ fontSize: '1.5rem', color: 'black', marginRight: '1rem' }}
        >
          {el?.cards?.price}₴
        </Text>
        <Text
          size='sm'
          style={{ fontSize: '1rem', color: 'black', marginRight: '1rem' }}
        >
          /{el?.cards?.price * count}₴
        </Text>
        <Button
          color='dark'
          style={{ margin: '1rem' }}
          onClick={() => dispatch(removeCart({ userId, item: el }))}
        >
          -
        </Button>
        <Text size='sm' style={{ fontSize: '1rem', color: 'black' }}>
          X{count}
        </Text>
        <Button
          color='dark'
          style={{ margin: '1rem' }}
          onClick={notificationCart}
        >
          +
        </Button>
      </div>
    </div>
  )
}
