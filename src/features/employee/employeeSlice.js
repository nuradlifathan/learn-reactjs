import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  currentEmployee: {
    name: "",
    email: "",
    password: "",
    id: 0,
  },
  newloginEmployee: {
    name: "",
    email: "",
    password: "",
    id: 0,
  },
}

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    fillEmployee: (state, action) => {
      state.data = action.payload
    },
    loginEmployee: (state, action) => {
      const { name, email, password, id } = action.payload

      state.currentEmployee = {
        name,
        email,
        password,
        id,
      }
    },
    newloginEmployee: (state, action) => {
      const { name, email, password, id } = action.payload

      state.newloginEmployee = {
        name,
        email,
        password,
        id,
      }
    },
    logoutEmployee: (state, action) => {
      return { ...initialState }
    },
  },
})

export const { fillEmployee, loginEmployee, newloginEmployee } =
  employeeSlice.actions

export default employeeSlice.reducer
