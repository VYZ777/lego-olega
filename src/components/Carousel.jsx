import React, { useState, useEffect } from 'react'
import image1 from '../../public/babanaba.png'
import image2 from '../../public/cole jay.png'
import image3 from '../../public/1sen.png'
import image4 from '../../public/creep.png'
import image5 from '../../public/saitama.jpg'
import image6 from '../../public/zane.png'
import image7 from '../../public/gigacole.png'
import image8 from '../../public/2sen.png'
import image9 from '../../public/sen 3.png'
import image10 from '../../public/shpork.png'
import image11 from '../../public/spin.png'
import image12 from '../../public/blackone.png'
import image13 from '../../public/4sen.png'
import '../../styles/styles.css'
import '../../src/index.css'

const text1 =
  'Костюм LEGO Бэтмен Продажа носков онлайн без смс и мошенических действий'
const text2 =
  'презервативы использованные купить японские гуси лечебная мазь со светодиодами'
const text3 =
  'Принимайте этот порошок три раза в день и вы станете... Читать в источнике'
const text4 = 'Rjytw lnj yt yfxfkj f dct kbim yjdsq rjytw'
const text5 = 'Эээ животным не счастливы типа в зоопарке или че там '
const text6 = 'Для мужчины принять женщину - целое исскуство. А женщине '
const text7 =
  'Он отказал дочке(эмоция сигмы) султана и его выгнали из страны за его красоту'
const text8 =
  'Трепещи Лор Гармадон, есть кое-что, что я тебе не сказал. Узри мой точтокружится3000'
const text9 = 'Я пока що малюк, вивчати свыт люблю кожного дня я зростаю'
const text10 =
  ' Шрек подивився йому прямо в очі і промовив , - все підійшло до шреКінцю , шрек вилитів через вікно моєї кімнати . ШРЕК - ЦЕ КОХАННЯ , ШРЕК - ЦЕ ЖИТТЯ.'
const text11 = 'Алё, Светлана, пойдем кружится. Я ща убивать буду...'
const text12 = 'Cole, the BLACK ONE!!!!! MASTUR N.. nightmare'
const text13 =
  'Лонг бефор тайм хэд э нейм, зе верст спинджитсу мастер креейтет ниндзяго юзинг фор элементед веапонс. Бат вен хи паст э дарк презентс сот аут ту колект вем ол:Лорда Гармадон.Со ай сэнсей ву хис бразер сот аут ту файнд фор нинджа ту коллект фем фёрст'

function CarouselAuto() {
  const [index, setIndex] = useState(0)
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
    image13,
  ]
  const text = [
    text1,
    text2,
    text3,
    text4,
    text5,
    text6,
    text7,
    text8,
    text9,
    text10,
    text11,
    text12,
    text13,
  ]

  // Use useEffect to increment the index and update the image every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % text.length)
    }, 10000)

    return () => clearInterval(intervalId)
  }, [])

  // Render the current image
  return (
    <div
      className='anim-show block'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ marginLeft: '10rem', maxWidth: '50%' }}>
        <p
          className='font-dancing-script'
          style={{ fontSize: '4rem', fontFamily: '' }}
        >
          {text[index]}
        </p>
      </div>
      <img
        style={{
          borderRadius: '3rem',
          minBlockSize: '30rem',
          maxBlockSize: '10rem',
          maxWidth: '40rem',
          marginLeft: '5rem',
        }}
        src={images[index]}
        alt='Slide'
      />
    </div>
  )
}

export default CarouselAuto
