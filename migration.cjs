const { createClient } = require('@supabase/supabase-js')
const path = require('path')
const fs = require('fs')

const supabase = createClient(
  'https://nuagqbcwhszviejtsgyc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51YWdxYmN3aHN6dmllanRzZ3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5Mjk2NTEsImV4cCI6MjAwNTUwNTY1MX0.96XjZ8_P6JI1XqbF_4QVWsxdDIZ2l7GbjcFyNCfM5IU'
)

const categories = {
  character: 1,
  battle: 2,
  kit: 3,
}

const migrate = async () => {
  const fileName = path.resolve(__dirname, 'db1.json')
  const data = fs.readFileSync(fileName, 'utf-8')
  const dataToMigrate = JSON.parse(data)
  const keys = Object.keys(dataToMigrate)
  for (const key of keys) {
    const cards = dataToMigrate[key]
    const preparedData = cards.map((card) => ({
      ...card,
      image_url: card.imageUrl,
      category_id: categories[key],
    }))

    const { data, error } = await supabase
      .from('cards')
      .insert(
        cards.map((card) => {
          const { imageUrl, ...rest } = card
          return {
            ...rest,
            image_url: card.imageUrl,
            category_id: categories[key],
          }
        })
      )
      .select()

    if (error) {
      console.log('Error during migration', error)
    }
  }
}

migrate().catch(console.error)
