import { Carousel } from '@mantine/carousel'
import { useMediaQuery } from '@mantine/hooks'
import { createStyles, useMantineTheme, rem } from '@mantine/core'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, forwardRef } from 'react'
import { fetchBestSellers } from '../../store/slice'
import { BestSellersCard } from './BestSellersCard'

const useStyles = createStyles((theme) => ({
  card: {
    height: rem(440),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: rem(32),
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}))

export const BestSellers = (ref) => {
  const { sellers } = useSelector((state) => state.characters)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchBestSellers())
  }, [])
  const theme = useMantineTheme()
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)
  const slides = sellers?.map((el, i) => (
    <Carousel.Slide key={el.id}>
      <BestSellersCard el={el} />
    </Carousel.Slide>
  ))

  return (
    <Carousel
      slideSize='20%'
      breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: rem(2) }]}
      slideGap='xl'
      align='start'
      slidesToScroll={mobile ? 1 : 2}
    >
      {slides}
    </Carousel>
  )
}
