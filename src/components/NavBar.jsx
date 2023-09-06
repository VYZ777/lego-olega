import MenuButton from './MenuButton'
import background from '../../public/ihn.jpg'
import { Link } from 'react-router-dom'
import '../../styles/styles.css'

const NavBar = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        height: '4rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to={'/'}>
          <img
            src='../../public/ninka.png'
            alt='LegoOlega'
            style={{ width: '15rem', height: '4rem' }}
          />
        </Link>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <MenuButton />
        </div>
      </div>
    </div>
  )
}

export default NavBar
