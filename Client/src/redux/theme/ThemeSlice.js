import {createSlice} from "@reduxjs/toolkit"

const initialTheme = {
    theme:'light'
}
const themeSlice = createSlice({
    name:'theme',
    initialState:initialTheme,
    reducers:{
        toogleTheme:(state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        },
    }
})

export const { toogleTheme } = themeSlice.actions
export default themeSlice.reducer