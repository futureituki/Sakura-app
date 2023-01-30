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

type State = {
  community: Array<Community>
}

const initialState: State = {
  community: [],
}

export const communitySlice = createSlice({
  name: 'community',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(savePhoto.fulfilled, (state, action: PayloadAction<Community>) => {
      state.community.push(action.payload)
    })
  },
})

export default communitySlice.reducer
