import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface UserState {
  name: string;
  email: string;
  password: string;
  token: string | null;
  fk_function: number | null
}

const initialState: UserState = {
  name: '',
  email: '',
  password: '',
  token: null, // Inicializa com o token salvo nos cookies, se existir
  fk_function: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: ( state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      Cookies.set('user_token', action.payload, { expires: 7 }); // Salva o token no cookie com validade de 7 dias
    },

    setFk_function: ( state, action: PayloadAction<number>) => {
      state.fk_function = action.payload;
    },

    clearToken: (state) => {
      state.token = null;
      Cookies.remove('user_token'); // Remove o token dos cookies
    },
  },
});

export const { setEmail, setPassword, setToken, clearToken, setFk_function, setName } = userSlice.actions;
export default userSlice.reducer;
