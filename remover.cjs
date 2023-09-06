const path = require('node:path')
const fs = require('node:fs')

const fileName = path.resolve(__dirname, 'db.json')

const result = fs.readFileSync(fileName, 'utf-8')

const json = JSON.parse(result)
// console.log(json)
const output = {}

const dedupByKey = (key) => {
  const dedupedByName = json[key].reduce((acc, curr) => {
    if (!acc.find((it) => it.name === curr.name)) {
      acc.push(curr)
    }
    return acc
  }, [])
  output[key] = dedupedByName
}

for (const key of Object.keys(json)) {
  dedupByKey(key)
}

fs.writeFileSync('db1.json', JSON.stringify(output))
