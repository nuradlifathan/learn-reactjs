import Profile from "./components/Profile/"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Counter from "./pages/Counter"
import TextPage from "./pages/Text"
import List from "./pages/List"
import Filter from "./pages/Filter"
import Register from "./pages/Register"
import ReduxCounter from "./pages/ReduxCounter"
import Exercise from "./pages/Exercise"
import UserList from "./pages/UserList"
import ProductList from "./pages/ProductList"
import ProductEdit from "./pages/ProductEdit"
import EmployeeList from "./pages/EmployeeList"
import EmployeeRegister from "./pages/EmployeeRegister"
import { Text, Tab, Tabs, TabList, TabPanels, Box } from "@chakra-ui/react"
import { useSelector } from "react-redux"

const data = [
  {
    fullName: "Naruto",
    position: "Hokage",
    age: "17",
  },
  {
    fullName: "Dorameon",
    position: "Kucing",
    age: "100",
  },
  {
    fullName: "Bill",
    position: "CEO",
    age: "40",
  },
]

function App() {
  // only for inside vscode
  const testFn = () => {
    const result = data.map((val) => {
      return (
        // yang ini untuk val =>
        <Profile
          fullName={val.fullName}
          position={val.position}
          age={val.age}
        />
      )
    })
    return result // testFn
  }
  const counterSelector = useSelector((state) => state.counter)
  // output to browser
  return (
    <Box>
      <Text fontSize={"3xl"} fontWeight={"bold"} color={"red.400"}>
        React.Js!
      </Text>
      <hr />
      {/* <Text fontWeight="1000">Counter : {counterSelector.value}</Text> */}
      <Tabs variant="enclosed">
        <TabList fontWeight="4">
          <Tab>
            <Link to="Home"> Home</Link>
          </Tab>
          <Tab>
            <Link to="About">About</Link>
          </Tab>
          <Tab>
            <Link to="Counter">Counter</Link>
          </Tab>
          <Tab>
            <Link to="Text">Text</Link>
          </Tab>
          <Tab>
            <Link to="List">List</Link>
          </Tab>
          <Tab>
            <Link to="Filter">Filter</Link>
          </Tab>
          <Tab>
            <Link to="Register">Register</Link>
          </Tab>
          <Tab>
            <Link to="ReduxCounter">ReduxCounter</Link>
          </Tab>
          <Tab>
            <Link to="Exercise">Exercise</Link>
          </Tab>
          <Tab>
            <Link to="UserList">UserList</Link>
          </Tab>
          <Tab>
            <Link to="ProductList">ProductList</Link>
          </Tab>
          <Tab>
            <Link to="EmployeeList">EmployeeList</Link>
          </Tab>
          <Tab>
            <Link to="EmployeeRegister">EmployeeRegister</Link>
          </Tab>
        </TabList>
      </Tabs>
      {/*  */}
      {/* {testFn()} */}
      {/*  */}
      {/* below here is to acces Routes */}
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Counter" element={<Counter />} />
        <Route path="/Text" element={<TextPage />} />
        <Route path="/List" element={<List />} />
        <Route path="/Filter" element={<Filter />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ReduxCounter" element={<ReduxCounter />} />
        <Route path="/Exercise" element={<Exercise />} />
        <Route path="/UserList" element={<UserList />} />
        {/* Route params */}
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/ProductEdit/:id" element={<ProductEdit />} />
        <Route path="/EmployeeList" element={<EmployeeList />} />
        <Route path="/EmployeeRegister" element={<EmployeeRegister />} />
      </Routes>
    </Box>
  )
}
export default App
