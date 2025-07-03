import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserState {
    streak: number,
    name: string,
    email: string,
    userTheme: string,
    isAuthenticated: boolean;
    streakIsActive: boolean;
}


const initialState: UserState = {
    streak: 0,
    name: '',
    email: '',
    userTheme: 'light',
    isAuthenticated: false,
    streakIsActive: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setStreak: (state, action: PayloadAction<number>) => {
            state.streak = action.payload;
        },
        streakIsActive: (state, action: PayloadAction<boolean>) => {
            state.streakIsActive = action.payload
        },
        incrementStreak: (state) => {
            state.streak += 1;
        },
        resetStreak: (state) => {
            state.streak = 0;
        },
        setUser: (state, action: PayloadAction<Partial<UserState>>) => {
            return {...state, ...action.payload};
        },
        login: (state, action: PayloadAction<{ name: string, email: string }>) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.name = '',
            state.email = '',
            state.isAuthenticated = false;
            state.streak = 0;
        },
        setUserTheme: (state, action: PayloadAction<string>) => {
            state.userTheme = action.payload
        },
        userTheme: (state) => {
            state.userTheme = 'light';
        }
    }
});

export const { 
  setStreak, 
  incrementStreak, 
  streakIsActive,
  resetStreak, 
  setUser, 
  login, 
  logout,
  setUserTheme,
  userTheme 
} = userSlice.actions;


export default userSlice.reducer;