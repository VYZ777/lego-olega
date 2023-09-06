import { Group, Avatar, Text, Autocomplete } from '@mantine/core'
import { fetchCharacters } from '../../store/slice.js'
import { useEffect, forwardRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function SearchBar() {
  let [value, setValue] = useState()
  const characters = useSelector((state) => state.characters.all)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!characters.length) {
      dispatch(fetchCharacters())
    }
  }, [])

  const handleChange = (val) => {
    setValue(val)
  }
  return (
    <div style={{ width: '15rem' }}>
      <Autocomplete
        data={characters?.map((character) => ({
          value: character?.name,
          id: character?.id,
          image: character?.image_url,
        }))}
        onChange={handleChange}
        placeholder='Найти'
        itemComponent={AutoCompleteItem}
      />
    </div>
  )
}

const AutoCompleteItem = forwardRef(({ id, value, image, ...others }, ref) => {
  return (
    <div style={{ margin: '0.5rem' }} ref={ref}>
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={`/character/${id}`}
      >
        <Group noWrap>
          <Avatar src={image} />

          <div>
            <Text>{value}</Text>
          </div>
        </Group>
      </Link>
    </div>
  )
})
