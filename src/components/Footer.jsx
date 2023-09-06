import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div
      style={{
        width: '100%',
        height: '4rem',
        background:
          'linear-gradient(311deg, rgba(0,14,22,1) 0%, rgba(121,9,9,1) 100%)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Link style={{ textDecoration: 'none', color: 'white' }} to={'/info'}>
        <p>Информация</p>
      </Link>
      <p style={{ color: 'white' }}>Copyright by OlegMoegalkin</p>
    </div>
  )
}
