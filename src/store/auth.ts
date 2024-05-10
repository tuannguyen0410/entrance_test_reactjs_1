import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getCustomerInformationService } from 'services/auth';
import { UserInformation } from 'services/auth/types';

interface AuthState {
  profileData?: UserInformation;
  roles: string[];
}

const initialState: AuthState = {
  profileData: undefined,
  roles: [],
};

export const getProfileAction = createAsyncThunk<
  UserInformation,
  void,
  { rejectValue: any }
>('profileReducer/getProfileAction', async (_, { rejectWithValue }) => {
  try {
    const res = await getCustomerInformationService();
    return res;
  } catch (error) {
    return rejectWithValue(error as any);
  }
});

export const authSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    logout($state) {
      $state.profileData = undefined;
    },
    setUserProfile($state, action: PayloadAction<UserInformation>) {
      $state.profileData = action.payload;
    }
  },
  extraReducers(builder) {
    builder.addCase(getProfileAction.fulfilled, ($state, action) => {
      $state.profileData = action.payload;
    });
  }
});

export const { logout, setUserProfile } = authSlice.actions;

export default authSlice.reducer;
