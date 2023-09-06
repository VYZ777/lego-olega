import {
  createStyles,
  Button,
  Container,
  Title,
  Group,
  Text,
  List,
  rem,
} from '@mantine/core'
import { useEffect } from 'react'
import { addToCartAsync, fetchSingleBattle } from '../../store/slice.js'
import NavBar from './NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
  },

  content: {
    maxWidth: rem(300),
    marginRight: `calc(${theme.spacing.xl} * 3)`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(44),
    lineHeight: 1.2,
    fontWeight: 900,
  },
}))

export function SingleBattle() {
  const { classes } = useStyles()
  const { userId } = useAuth()
  const battleSingle = useSelector((state) => state?.characters?.battleSingle)
  const params = useParams()
  const singleBattleLoading = useSelector((state) => state.characters.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  useEffect(() => {
    dispatch(fetchSingleBattle(params?.battleId))
  }, [dispatch, params.battleId])
  if (singleBattleLoading) {
    return (
      <div className='center'>
        <div className='loader'></div>
      </div>
    )
  }
  console.log(battleSingle, 'single battle')

  return (
    <div>
      <NavBar />
      <Button
        onClick={goBack}
        variant='outline'
        color='dark'
        style={{ margin: '1rem' }}
      >
        Go Back
      </Button>
      <Container>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>{battleSingle?.[0]?.name}</Title>
            <Text color='dimmed' mt='md'>
              {battleSingle?.[0]?.kit}
            </Text>

            <List mt={30} spacing='xl' size='md'>
              <List.Item>
                <b>Тип карточки: {battleSingle?.[0]?.kind}</b>
              </List.Item>
              <Text color='white' mt='md'></Text>
              <List.Item>
                <b>Огонь:</b> {battleSingle?.[0]?.fire}
              </List.Item>
              <List.Item>
                <b>Молния:</b> {battleSingle?.[0]?.thunder}
              </List.Item>
              <List.Item>
                <b>Земля:</b> {battleSingle?.[0]?.dirt}
              </List.Item>
              <List.Item>
                <b>Лёд:</b> {battleSingle?.[0]?.ice}
              </List.Item>
              <List.Item>
                <b>Год выпуска:</b>{' '}
                {battleSingle?.[0]?.year ? <p>2012</p> : <p>2011</p>}
              </List.Item>
            </List>

            <Group mt={30}></Group>
          </div>
          <img style={{ width: '25rem' }} src={battleSingle?.[0]?.image_url} />
        </div>
      </Container>
      <div
        style={{
          width: '80%',
          marginTop: '-2rem',
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <p style={{ margin: '1.5rem', fontSize: '1.5rem' }}>
          {battleSingle?.[0]?.price}₴
        </p>
        <Button
          onClick={() =>
            dispatch(addToCartAsync({ userId, item: characterSingle }))
          }
          variant='outline'
          color='dark'
          style={{ margin: '1rem' }}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
