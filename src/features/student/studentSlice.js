import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [
    {
      name: "Adli",
      gender: "Male",
      course: "Full Stack",
    },
    {
      name: "Olsen",
      gender: "Female",
      course: "UI/UX",
    },
  ],
}

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addUser: (state, action) => {
      let newUser = {
        name: action.payload.name,
        gender: action.payload.gender,
        course: action.payload.course,
      }
      state.data.push(newUser)
    },
    deleteUser: (state, action) => {
      state.data.splice(action.payload, 1)
    },
  },
})
export const { addUser, deleteUser } = studentSlice.actions

export default studentSlice.reducer
