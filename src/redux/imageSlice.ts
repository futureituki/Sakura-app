import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { saveImage, setImg } from '@/firebase/firestore'

type favoriteImg = {
  uid:string
  src:string
}
export const favoriteImgSave = createAsyncThunk(
  'favoriteImg',
  async ({uid,src}: favoriteImg): Promise<any> => {
    const imgSrc = await saveImage(uid,src)
    console.log(imgSrc)
    return imgSrc
  },
)
type Props = {
  uid:string
}
export const setImages = createAsyncThunk(
  'setImg',
  async (uid:string): Promise<any> => {
    console.log(await setImg(uid))
    const images = await setImg(uid)
    return images
  },
)
type Img = {
  src:Array<string>
}

const initialState:Img = {
  src:[],
}

export const imagesSlice = createSlice({
  name: 'images',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      favoriteImgSave.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.src.push(action.payload)
      },
    )
    builder.addCase(
      setImages.fulfilled,
      (state, action: PayloadAction<Array<string>>) => {
        state.src = action.payload
      },
    )
  },
})

export default imagesSlice.reducer