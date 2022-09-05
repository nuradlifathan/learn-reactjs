import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      if (state.value <= 0) {
        return
      }
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    },
    addInput: (state, action) => {
      state.value = action.payload
    },
  },
})

// Actions is a function that return an "ACTION OBJECT"
// ACTION OBJECT have property :
// -type (increment,decrement,reset) (menentukan reducer mana yang di input)
// -payload (untuk nyimpan data/kirim data)
// nama function di reducer/action akan menjadi nama type di reducer

// Reducer is a condition that will change GLOBAL STATE
// setiap condition dari reducer akan cek "type" dari ACTION OBJECT
// means perubahan isi global state, akan ditentukan
// berdasarkan type action object yang dikirim ke reducer

export const { increment, decrement, reset, addInput } = counterSlice.actions

export default counterSlice.reducer
