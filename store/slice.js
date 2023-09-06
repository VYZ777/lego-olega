import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '../src/libs/supabaseClient'

export const fetchCharactersByPage = createAsyncThunk(
  'characters/byPage',
  async (page) => {
    const from = Math.max(page - 1, 0) * 20
    const to = Math.max(page - 1, 0) * 20 + 20 - 1
    const { data: cards, error } = await supabase
      .from('cards')
      .select('*')
      .eq('category_id', 1)
      .range(from, to)
    return cards.map((card) => {
      const { image_url, ...rest } = card
      return {
        ...rest,
        imageUrl: card.image_url,
      }
    })
  }
)

export const fetchBestSellers = createAsyncThunk(
  'characters/bestSellers',
  async () => {
    const { data: cards, error } = await supabase
      .from('cards')
      .select('*')
      .eq('category_id', 1)
      .range(0, 7)
    console.log(cards, 'cards')
    return cards.map((card) => {
      const { image_url, ...rest } = card
      return {
        ...rest,
        imageUrl: card.image_url,
      }
    })
  }
)

export const fetchBattle = createAsyncThunk(
  'characters/battle',
  async (page) => {
    const from = Math.max(page - 1, 0) * 20
    const to = Math.max(page - 1, 0) * 20 + 20 - 1

    const { data: cards, error } = await supabase
      .from('cards')
      .select('*')
      .eq('category_id', 2)
      .range(from, to)
    return cards.map((card) => {
      const { image_url, ...rest } = card
      return {
        ...rest,
        imageUrl: card.image_url,
      }
    })
  }
)

export const fetchSingleCharacter = createAsyncThunk(
  'characters/singleCharacter',
  async (characterId) => {
    const { data, error } = await supabase
      .from('cards')
      .select(`*`)
      .eq('id', characterId)
    return data
  }
)

export const fetchCharacters = createAsyncThunk(
  'characters/character',
  async () => {
    const { data, error } = await supabase
      .from('cards')
      .select(`*`)
      .order('category_id', {
        ascending: true,
      })
    return data
  }
)

export const addToScalesAsync = createAsyncThunk(
  'characters/addToScalesAsync',
  async ({ item }, thunkAPI) => {
    const { data, error } = await supabase
      .from('scales')
      .insert([{ card_id: item.id }])
      .select()
    thunkAPI.dispatch(fetchScalesAsync())
  }
)

export const addToCartAsync = createAsyncThunk(
  'characters/addToCartAsync',
  async ({ userId, item }, thunkAPI) => {
    const { data, error } = await supabase
      .from('user_cart')
      .select()
      .eq('user_key', userId)

    if (data.length > 0) {
      const { data: cartItems } = await supabase
        .from('cart')
        .select()
        .eq('user_cart_id', data[0].id)
      const existingItem = cartItems.find((it) => it.card_id === item.id)
      if (existingItem) {
        const { data, error } = await supabase
          .from('cart')
          .update({
            amount: existingItem.amount + 1,
          })
          .eq('card_id', item.id)
          .select()
        thunkAPI.dispatch(fetchCart(userId))
        return data
      } else {
        const { data: response, error } = await supabase
          .from('cart')
          .insert([{ user_cart_id: data[0].id, card_id: item.id, amount: 1 }])
          .select()
        thunkAPI.dispatch(fetchCart(userId))
        return response
      }
    } else {
      const { data: cart, error: insertCartError } = await supabase
        .from('user_cart')
        .insert([{ user_key: userId }])
        .select()
      const { data: items, error: insertItemError } = await supabase
        .from('cart')
        .insert([{ user_cart_id: cart[0].id, card_id: item.id, amount: 1 }])
        .select()
      return items
    }
  }
)

export const removeCart = createAsyncThunk(
  'characters/remove',
  async ({ userId, item }, thunkAPI) => {
    const { cartItem } = thunkAPI.getState().characters
    const { data: cartItems } = await supabase
      .from('cart')
      .select()
      .eq('user_cart_id', cartItem[0].id)
    const existingItem = cartItems.find((it) => it.card_id === item.card_id)
    if (existingItem.amount === 1) {
      const { data: response, error } = await supabase
        .from('cart')
        .delete()
        .eq('card_id', existingItem.card_id)
      thunkAPI.dispatch(fetchCart(userId))
      return response
    }
    if (existingItem) {
      const { data, error } = await supabase
        .from('cart')
        .update({
          amount: existingItem.amount - 1,
        })
        .eq('card_id', existingItem.card_id)
        .select()
      console.log({ error })
      thunkAPI.dispatch(fetchCart(userId))
      return data
    }
  }
)

export const removeScales = createAsyncThunk(
  'characters/removeScales',
  async ({ item }, thunkAPI) => {
    console.log(item?.data?.id, 'item247')
    const { error } = await supabase
      .from('scales')
      .delete()
      .eq('card_id', item?.data?.id)
    thunkAPI.dispatch(fetchScalesAsync())
  }
)

export const fetchScalesAsync = createAsyncThunk(
  'characters/scalesFetch',
  async () => {
    const { data, error } = await supabase
      .from('scales')
      .select(
        `id, card_id, cards ( name, kind, price, id, kit, fire, thunder, dirt, ice)`
      )
    return data.map((it) => it.cards)
  }
)

export const fetchCart = createAsyncThunk(
  'characters/cartItem',
  async (userId) => {
    const { data, error } = await supabase
      .from('user_cart')
      .select(
        `id, user_key, cart( id, card_id, amount, cards ( name, image_url, kind, price,id ))`
      )
      .eq('user_key', userId)
    return data
  }
)

export const deleteCart = createAsyncThunk(
  'characters/delete',
  async (userId) => {
    const { error } = await supabase
      .from('user_cart')
      .delete()
      .eq('user_key', userId)
  }
)

export const fetchSingleBattle = createAsyncThunk(
  'characters/singleBattle',
  async (battleId) => {
    const { data, error } = await supabase
      .from('cards')
      .select(`*`)
      .eq('id', battleId)
    return data
  }
)

export const characterSlice = createSlice({
  name: 'characters',
  initialState: {
    characters: [],
    sellers: [],
    battle: [],
    kit: [],
    characterSingle: {},
    battleSingle: {},
    kitSingle: {},
    cart: [],
    cartItem: [],
    scalesItem: [],
    scales: [],
    loading: false,
    all: [],
  },
  reducers: {
    addToCart(state, action) {
      if (state.cart[action.payload.id]) {
        state.cart[action.payload.id].push(action.payload)
      } else {
        state.cart[action.payload.id] = [action.payload]
      }
      // state.cart.push(action.payload)
    },
    removeFromCart(state, action) {
      if (state.cart[action.payload.id]?.length > 1) {
        state.cart[action.payload.id].pop(action.payload)
      } else {
        delete state.cart[action.payload.id]
      }
      // state.cart = state.cart.filter((item) => item.id !== action.payload)
    },
    addToScales(state, action) {
      state.scales.push(action.payload)
    },
    removeFromScales(state, action) {
      state.scales = state.scales.filter((item) => item.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCharactersByPage.fulfilled, (state, action) => {
      state.characters = [...action.payload]
      state.loading = false
    })
    builder.addCase(fetchCharactersByPage.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchBestSellers.fulfilled, (state, action) => {
      state.sellers = [...action.payload]
      state.loading = false
    })
    builder.addCase(fetchBestSellers.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchBattle.fulfilled, (state, action) => {
      state.battle = [...action.payload]
      state.loading = false
    })
    builder.addCase(fetchBattle.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchSingleCharacter.fulfilled, (state, action) => {
      state.characterSingle = action.payload
      state.loading = false
    })
    builder.addCase(fetchSingleCharacter.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchSingleBattle.fulfilled, (state, action) => {
      state.battleSingle = action.payload
      state.loading = false
    })
    builder.addCase(fetchSingleBattle.pending, (state, action) => {
      state.loading = true
    })
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      console.log(action.payload, 'action.payload.cartItem')
      state.cartItem = action.payload
    })
    builder.addCase(fetchScalesAsync.fulfilled, (state, action) => {
      console.log(action.payload, 'action.payload.scalesItem')
      state.scales = action.payload
    })
    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      console.log('Response create', action.payload)
      state.cart = [...state.cart, ...action.payload]
    })
    builder.addCase(addToScalesAsync.fulfilled, (state, action) => {
      console.log('Scales create', action.payload)
      state.scales = action.payload
    })
    builder.addCase(removeCart.fulfilled, (state, action) => {
      console.log('Response remove', action.payload)
      delete state.cart[action.payload.id]
    })
    builder.addCase(deleteCart.fulfilled, (state, action) => {
      state.cartItem = []
    })
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.all = [...action.payload]
      state.loading = false
    })
  },
})

export const { addToScales, removeFromScales, removeFromCart, addToCart } =
  characterSlice.actions
