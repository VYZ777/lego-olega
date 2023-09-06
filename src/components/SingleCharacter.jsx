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
import { addToCartAsync, fetchSingleCharacter } from '../../store/slice.js'
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

export function SingleCharacter() {
  const { classes } = useStyles()
  const { userId } = useAuth()
  const characterSingle = useSelector(
    (state) => state?.characters?.characterSingle
  )
  const params = useParams()
  const singleCharactersLoading = useSelector(
    (state) => state.characters.loading
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }
  useEffect(() => {
    dispatch(fetchSingleCharacter(params?.characterId?.[0]))
  }, [dispatch, params.characterId?.[0]])
  if (singleCharactersLoading) {
    return (
      <div className='center'>
        <div className='loader'></div>
      </div>
    )
  }
  console.log(characterSingle, 'single characters')

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
            <Title className={classes.title}>
              {characterSingle?.[0]?.name}
            </Title>
            <Text color='dimmed' mt='md'>
              {characterSingle?.kit}
            </Text>

            <List mt={30} spacing='xl' size='md'>
              <List.Item>
                <b>Тип карточки: {characterSingle?.[0]?.kind}</b>
              </List.Item>
              <Text color='white' mt='md'></Text>
              <List.Item>
                <b>Огонь:</b> {characterSingle?.[0]?.fire}
              </List.Item>
              <List.Item>
                <b>Молния:</b> {characterSingle?.[0]?.thunder}
              </List.Item>
              <List.Item>
                <b>Земля:</b> {characterSingle?.[0]?.dirt}
              </List.Item>
              <List.Item>
                <b>Лёд:</b> {characterSingle?.[0]?.ice}
              </List.Item>
              <List.Item>
                <b>Год выпуска:</b>{' '}
                {characterSingle?.[0]?.year ? <p>2012</p> : <p>2011</p>}
              </List.Item>
            </List>

            <Group mt={30}></Group>
          </div>
          <img
            style={{ width: '25rem' }}
            src={characterSingle?.[0]?.image_url}
          />
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
          {characterSingle?.[0]?.price}₴
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
