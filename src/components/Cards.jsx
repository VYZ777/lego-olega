import { Link } from 'react-router-dom'
import {
  Card,
  Text,
  Group,
  createStyles,
  getStylesRef,
  rem,
  Button,
} from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartAsync, addToScalesAsync, fetchCart } from '../../store/slice'
import '../../styles/styles.css'
import { PiScales } from 'react-icons/pi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { forwardRef } from 'react'
import { useAuth } from '@clerk/clerk-react'

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    height: rem(280),
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    [`&:hover .${getStylesRef('image')}`]: {
      transform: 'scale(1.03)',
    },
  },

  imageUrl: {
    ...theme.fn.cover(),
    ref: getStylesRef('image'),
    backgroundSize: 'cover',
    transition: 'transform 500ms ease',
  },

  overlay: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
  },

  content: {
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
    zIndex: 1,
  },

  title: {
    color: theme.white,
    marginBottom: rem(5),
  },

  bodyText: {
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
}))

const Animation = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: (custom) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 },
  }),
}
const ImageCard = ({ link, id, el }) => {
  const { classes, theme } = useStyles()
  const { userId } = useAuth()
  const dispatch = useDispatch()

  const notification = () => {
    toast.success('Карточка добавлена к сравнению')
  }
  const handleClick = () => {
    dispatch(
      addToScalesAsync({
        userId,
        item: el,
      })
    )
    notification()
  }
  const notificationCart = () => {
    dispatch(
      addToCartAsync({
        userId,
        item: el,
      }),
      fetchCart()
    )

    toast.success('Карточка добавлена в корзину')
  }
  return (
    <motion.div
      variants={Animation}
      initial='hidden'
      whileInView='visible'
      viewport={{ amount: 0.1 }}
    >
      <Card
        p='lg'
        shadow='lg'
        className={classes.card}
        radius='md'
        component='a'
        href={link}
        target='_blank'
        style={{ width: '15rem', height: '20rem', margin: '2rem' }}
      >
        <div
          className={classes.imageUrl}
          style={{ backgroundImage: `url(${el?.imageUrl})` }}
        />

        <div className={classes.overlay} />

        <div className={classes.content}>
          <div>
            <Link
              style={{ textDecoration: 'none' }}
              to={
                el?.kind === 'Персонаж'
                  ? `/character/${el?.id}`
                  : `/battle/${el?.id}`
              }
            >
              <Text size='lg' className={classes.title} weight={500}>
                {el?.name}
              </Text>
            </Link>
            <Group position='apart' spacing='xs'>
              <Group spacing='lg'>
                <Text
                  size='sm'
                  className={classes.bodyText}
                  style={{ fontSize: '1rem' }}
                >
                  {el?.price}₴
                </Text>
              </Group>
            </Group>
          </div>
          <div>
            <Button
              leftIcon={<AiOutlineShoppingCart className='cart-button' />}
              color='dark'
              style={{ margin: '0.1rem' }}
              onClick={notificationCart}
            >
              В корзину
            </Button>
            <PiScales className='cart' onClick={handleClick} />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export const MImageCard = motion(ImageCard)
