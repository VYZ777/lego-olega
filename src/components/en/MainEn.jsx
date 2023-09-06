import { BestSellers } from '../Bestsellers'
import CarouselAuto from '../Carousel'
import NavBar from '../NavBar'
import { Footer } from '../Footer'

const MainEn = () => {
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
          width: '100%',
          height: '40rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ marginRight: '10rem' }}>
          <CarouselAuto />
        </div>
      </div>
      <div
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
            fontFamily: 'fantasy',
          }}
        >
          Бестселлеры
        </h1>
        <BestSellers />
      </div>
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
            fontFamily: 'fantasy',
          }}
        >
          Pravila Igri
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
        <img src='../../public/lego-nindzyago.png' alt='Ребятишки' />
        <p style={{ maxWidth: '30rem' }}>
          Существует дофига карточек 2011 и 2012 годов. Запомни, I have two
          sides: карточки Персонажей и Боевые карточки. Карточка Персонажа -
          предоставляет вам интимные услуги. Боевая карточка - действует.
          <br />
          <br />
          Кароч, в чем прикол. В мире есть 6 героев и 6 злодеев. Герои памагают
          лор гамадону и милому сенсею ВУ, а злодеи сражаются. Во тупые. Герои и
          злодеи сражаются друг с другомзаоружие, которое кружится {'('}
          вроде {')'} . Правила каждого боя определяются карточками
          <br />
          {'( '}
          Существует дофига карточек 2011 и 2012 годов. Запомни, I have two
          sides: карточки Персонажей и Боевые карточки. Карточка Персонажа -
          предоставляет вам интимные услуги. Боевая карточка - действует. {' )'}
          <br />
          <br />
          Задача каждого стать мастером, который кружится, чтоб типа победить
          противника и забрать там чет типа оружия его или как там, то ли орудия
          труда, то ли не вытянешь рыбку из пруда кароч типа лол иди нафиг
        </p>
      </div>
      <Footer />
    </div>
  )
}

export default MainEn
