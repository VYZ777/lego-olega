import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCharactersByPage } from '../../store/slice.js'
import { MImageCard } from './Cards.jsx'
import NavBar from './NavBar.jsx'
import Controller from './Controller.jsx'
import '../../styles/styles-loader.css'
import { useSearchParams } from 'react-router-dom'
import { Pagination } from './Pagnation.jsx'
import { Footer } from './Footer.jsx'

const AllCharacters = () => {
  const characters = useSelector((state) => state.characters.characters)
  const allCharactersLoading = useSelector((state) => state.characters.loading)
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  console.log('Params', params.get('page'))

  useEffect(() => {
    const currentPage = params.get('page') || 0
    dispatch(fetchCharactersByPage(currentPage))
  }, [params])
  if (allCharactersLoading) {
    return (
      <div className='center'>
        <div className='loader'></div>
      </div>
    )
  }
  console.log(characters, 'all characters')
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
        <Controller />
        <h1 style={{ fontSize: '3rem', fontFamily: 'sans-serif' }}>
          Карточки персонажей
        </h1>
      </div>

      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {characters &&
          characters.length > 0 &&
          characters?.map((el, i) => {
            return <MImageCard el={el} key={i} />
          })}
      </div>
      <Pagination />
      <Footer />
    </div>
  )
}

export default AllCharacters
