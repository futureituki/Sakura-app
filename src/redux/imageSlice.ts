import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { deleteImg, saveImage, setImg } from '@/firebase/firestore'

type Props = {
  uid: string
  sign?: boolean
}
type Img = {
  src: Array<string>
}
type favoriteImg = {
  uid: string
  src: string
  srcs: Array<string>
}

export const favoriteImgSave = createAsyncThunk(
  'favoriteImg',
  async ({ uid, src, srcs }: favoriteImg): Promise<any> => {
    const imgSrc = await saveImage(uid, src, srcs)
    return imgSrc
  },
)

export const favoriteImgDelete = createAsyncThunk(
  'favoriteImgDelete',
  async ({ uid, src, srcs }: favoriteImg): Promise<any> => {
    const imgSrc = await deleteImg(uid, src, srcs)
    return imgSrc
  },
)

export const setImages = createAsyncThunk('setImg', async ({ uid, sign }: Props): Promise<any> => {
  const images = await setImg(uid, sign)
  return images
})

const initialState: Img = {
  src: [],
}

export const imagesSlice = createSlice({
  name: 'images',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(favoriteImgSave.fulfilled, (state, action: PayloadAction<string>) => {
      state.src.push(action.payload)
    })
    builder.addCase(favoriteImgDelete.fulfilled, (state, action: PayloadAction<string>) => {
      const newState = state.src.filter((value) => value != action.payload)
      state.src = newState
    })
    builder.addCase(setImages.fulfilled, (state, action: PayloadAction<Array<string>>) => {
      state.src = []
      state.src = action.payload
    })
  },
})

export default imagesSlice.reducer
