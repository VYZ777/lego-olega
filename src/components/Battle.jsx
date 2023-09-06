import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBattle } from '../../store/slice'
import { MImageCard } from './Cards.jsx'
import NavBar from './NavBar.jsx'
import Controller from './Controller.jsx'
import '../../styles/styles-loader.css'
import { useSearchParams } from 'react-router-dom'
import { PaginationBattle } from './Pagnation'
import { Footer } from './Footer'

const Battle = () => {
  const battle = useSelector((state) => state.characters.battle)
  const allBattleLoading = useSelector((state) => state.characters.loading)
  const dispatch = useDispatch()
  const [params] = useSearchParams()
  console.log('Params', params.get('page'))

  useEffect(() => {
    const currentPage = params.get('page') || 0
    dispatch(fetchBattle(currentPage))
  }, [params])
  if (allBattleLoading) {
    return (
      <div className='center'>
        <div className='loader'></div>
      </div>
    )
  }
  console.log(battle, 'all battle')
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
          Боевые карточки
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
        {battle &&
          battle.length > 0 &&
          battle?.map((el, i) => {
            return <MImageCard el={el} key={i} />
          })}
      </div>
      <PaginationBattle />
      <Footer />
    </div>
  )
}

export default Battle
