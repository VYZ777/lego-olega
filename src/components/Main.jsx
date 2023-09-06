import { BestSellers } from './Bestsellers'
import CarouselAuto from './Carousel'
import { CartEmpty } from './CartEmpty'
import NavBar from './NavBar'
import { Footer } from './Footer'
import { useTranslation } from 'react-i18next'
import '../i18n.js'
import { motion } from 'framer-motion'
import { useAuth } from '@clerk/clerk-react'
import '../index.css'
import '../../styles/styles.css'

const Main = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth()
  const { t, i18n } = useTranslation('main')

  const Animation = {
    hidden: {
      y: -100,
      opacity: 0,
    },
    visible: (custom) => ({
      y: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 },
    }),
  }
  const AnimationRight = {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: (custom) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 0.2 },
    }),
  }

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
        className='main-div'
        style={{
          width: '100%',
          height: '40rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ marginRight: '10rem', zIndex: '-1' }}>
          <CarouselAuto />
        </div>
      </div>
      <motion.div
        variants={AnimationRight}
        initial='hidden'
        whileInView='visible'
        viewport={{ amount: 0.8, once: true }}
        style={{
          width: '90%',
          height: '30rem',
          marginRight: '5rem',
          marginLeft: '5rem',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            marginRight: '10rem',
          }}
          className='font-calibri-script'
        >
          {t('test')}
        </h1>
        <BestSellers />
      </motion.div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'end',
        }}
      >
        <h1
          style={{
            height: '3rem',
            marginTop: '5rem',
            fontSize: '3rem',
            marginRight: '10rem',
          }}
          className='font-calibri-script'
        >
          {t('rules')}
        </h1>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <motion.img
          variants={Animation}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          src='../../public/lego-nindzyago.png'
          alt='Ребятишки'
        />
        <div
          style={{
            marginLeft: '-10rem',
            marginTop: '2rem',
            marginBottom: '2rem',
          }}
        >
          <motion.p
            custom={2}
            variants={Animation}
            initial='hidden'
            whileInView='visible'
            viewport={{ amount: 0.8, once: true }}
            style={{ maxWidth: '30rem', fontSize: '1.1rem' }}
            className='font-calibri-script'
          >
            {t('context1')}
          </motion.p>
          <br />
          <br />
          <motion.p
            custom={2}
            variants={Animation}
            initial='hidden'
            whileInView='visible'
            style={{ maxWidth: '30rem', fontSize: '1.1rem' }}
            viewport={{ amount: 0.8, once: true }}
            className='font-calibri-script'
          >
            {t('context2')}
          </motion.p>
          <br />
          <motion.p
            custom={2}
            variants={Animation}
            initial='hidden'
            whileInView='visible'
            style={{ maxWidth: '30rem', fontSize: '1.1rem' }}
            viewport={{ amount: 0.8, once: true }}
            className='font-calibri-script'
          >
            {t('context3')}
          </motion.p>
          <br />
          <br />
          <motion.p
            custom={2}
            variants={Animation}
            initial='hidden'
            whileInView='visible'
            style={{ maxWidth: '30rem', fontSize: '1.1rem' }}
            viewport={{ amount: 0.8, once: true }}
            className='font-calibri-script'
          >
            {t('context4')}
          </motion.p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Main
