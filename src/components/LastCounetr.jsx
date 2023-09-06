import { useAuth } from '@clerk/clerk-react'
import { useDisclosure } from '@mantine/hooks'
import { Modal, useMantineTheme, Button } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCart } from '../../store/slice'

export const LastCounter = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const theme = useMantineTheme()
  const cart = useSelector((state) => state.characters.cartItem)
  const dispatch = useDispatch()
  const { userId } = useAuth()
  const total = cart[0]?.cart?.reduce((acc, curr) => {
    return acc + curr.cards.price * curr.amount
  }, 0)
  const handleClick = () => {
    dispatch(deleteCart(userId))
    window.location.href = 'https://www.donationalerts.com/r/kot2909'
  }

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title='Покупка'
        centered={true}
        overlayProps={{
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Button
          onClick={handleClick}
          size='md'
          color='dark'
          style={{ margin: '1rem' }}
        >
          Купить {total}₴
        </Button>
      </Modal>
      <Button onClick={open} size='md' color='dark' style={{ margin: '1rem' }}>
        Купить {total}₴
      </Button>
    </div>
  )
}
