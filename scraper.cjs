const axios = require('axios')
const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

const fileName = 'index.html'
const baseUrl = 'https://ninjago.fandom.com'
const file = path.resolve(__dirname, 'public', 'index.html')

const writeToFile = (fileName, data) => {
  const file = path.resolve(__dirname, 'public', fileName)
  fs.writeFileSync(file, data)
}

const run = async () => {
  const { data } = await axios.get(
    'https://ninjago.fandom.com/ru/wiki/Карточки#Наборы_с_картами'
  )
  console.log(data)

  fs.writeFileSync(file, data)
}

const scrape = async () => {
  const content = fs.readFileSync(file)
  const $ = cheerio.load(content)
  const anchors = $('a[title^="Карточка"]')
  const anchors1 = $('a[title^="95"]')

  for (const card of anchors1) {
    const el = $(card)
    const url = el.attr('href')
    const { data } = await axios.get(`${baseUrl}${decodeURIComponent(url)}`)
    writeToFile(`${el.text()}.html`, data)
  }
}

const generateRandomPrice = () => {
  return Math.floor(Math.random() * (200 - 60 + 1)) + 60
}

const readDirectory = (root) => {
  const result = fs.readdirSync(root)
  const characterCharacters = []
  const battleCharacters = []
  const otherCharacters = []

  for (const name of result) {
    const fileName = path.resolve(__dirname, 'public', name)
    const $ = extractHtmlContent(fileName)
    const imageUrl = extractImageUrl($)
    const kit = extractDescription($)
    const headerName = extractName($)
    const fireEl = extractFire($)
    const thunderEl = extractThunder($)
    const dirtEl = extractDirt($)
    const iceEl = extractIce($)
    const kind = extractKind($)
    const year = extractYear($)

    const character = {
      imageUrl: imageUrl,
      kit: kit,
      name: headerName,
      fire: fireEl,
      thunder: thunderEl,
      dirt: dirtEl,
      ice: iceEl,
      kind: kind,
      year: year,
      price: generateRandomPrice(),
    }

    if (kind === 'Персонаж') {
      characterCharacters.push(character)
    } else if (kind === 'Боевая') {
      battleCharacters.push(character)
    } else {
      otherCharacters.push(character)
    }
  }

  const sortedCharacterCharacters = characterCharacters.sort((a, b) => {
    const numberA = extractCardNumber(a.name)
    const numberB = extractCardNumber(b.name)
    return numberA - numberB
  })

  const sortedBattleCharacters = battleCharacters.sort((a, b) => {
    const numberA = extractCardNumber(a.name)
    const numberB = extractCardNumber(b.name)
    return numberA - numberB
  })

  const sortedOtherCharacters = otherCharacters.sort((a, b) => {
    const numberA = extractCardNumber(a.name)
    const numberB = extractCardNumber(b.name)
    return numberA - numberB
  })

  const data = {
    character: [
      ...sortedCharacterCharacters,
      ...sortedBattleCharacters,
      ...sortedOtherCharacters,
    ].map((character, index) => ({
      id: index + 1,
      ...character,
    })),
  }

  writeToFile(
    path.resolve(__dirname, 'public', 'data.json'),
    JSON.stringify(data)
  )
}

const extractCardNumber = (name) => {
  const matches = name.match(/(\d+)/)
  if (matches && matches.length > 1) {
    return parseInt(matches[1], 10)
  }
  return 0
}

const extractHtmlContent = (fileName) => {
  const content = fs.readFileSync(fileName)
  const $ = cheerio.load(content)
  return $
}

const extractImageUrl = ($) => {
  const image = $('a[href^="https://static.wikia.nocookie.net/ninjago/images"]')
  return $(image[0]).attr('href')
}

const extractDescription = ($) => {
  const title = $('.pi-data-value a')
  return $(title[1]).text()
}

const extractName = ($) => {
  const header = $('span[class=mw-page-title-main]')
  return $(header).text()
}

const extractFire = ($) => {
  const element = $('.pi-smart-data-value[data-source="Огонь"]')
  const value = element.text().trim()
  return value
}

const extractThunder = ($) => {
  const element = $('.pi-smart-data-value[data-source="Молния"]')
  const value = element.text().trim()
  return value
}

const extractDirt = ($) => {
  const element = $('.pi-smart-data-value[data-source="Земля"]')
  const value = element.text().trim()
  return value
}

const extractIce = ($) => {
  const element = $('.pi-smart-data-value[data-source="Лёд"]')
  const value = element.text().trim()
  return value
}

const extractKind = ($) => {
  const kind = $('.pi-data-value')
  const value = $(kind[8]).text().trim()
  return value
}

const extractYear = ($) => {
  const year = $('.category.normal a')
  const value = $(year[6]).text().trim()
  return value
}

const name = path.resolve(__dirname, 'public', 'Карточка 1 - Кай.html')
// extractImageUrl(name)
readDirectory(path.resolve(__dirname, 'public'))
// scrape().catch(console.error)
