import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createPhotoStorage } from '@/firebase/firestore'
import { Community } from '@/types/community'

type SavePhotoProps = {
  uid: string
  file: File
  url: string
  title: string
  tag: string[]
}
export const savePhoto = createAsyncThunk(
  'savePhoto',
  async ({ uid, file, url, title, tag }: SavePhotoProps): Promise<any> => {
    const communityData = await createPhotoStorage({ uid, file, url, title, tag })
    return communityData
  },
)

const initialState: Community = {
  id: '',
  uid: '',
  title: '',
  created_at: null,
  updated_at: null,
  tag: [],
  url: '',
}

export const communitySlice = createSlice({
  name: 'community',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(savePhoto.fulfilled, (state, action: PayloadAction<Community>) => {
      state.id = action.payload.id
      state.uid = action.payload.uid
      state.title = action.payload.title
      state.created_at = action.payload.created_at
      state.updated_at = action.payload.updated_at
      state.tag = action.payload.tag
      state.url = action.payload.url
    })
  },
})

export default communitySlice.reducer
