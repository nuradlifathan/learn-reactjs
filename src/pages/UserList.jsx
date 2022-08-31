import {
  Box,
  Text,
  Button,
  Table,
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Container,
  useToast,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axiosInstance from "../api"
import axios from "axios"

// API
// https://jsonplaceholder.typicode.com/users

const UserList = () => {
  const [users, setUsers] = useState([])
  const toast = useToast()

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users")

      console.log(response.data)
      setUsers(response.data)
    } catch (err) {
      //   console.log(err)
      //   alert("Server Error")
      toast({
        title: "Network Error",
        status: "Error",
      })
    }
  }

  const renderUser = () => {
    return users.map((val) => {
      return (
        <Tr>
          <Td>{val.id}</Td>
          <Td>{val.username}</Td>
          <Td>{val.email}</Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container maxW="container.lg">
      <Text>User List Page</Text>
      <Button onClick={fetchUsers}>Fetch Data</Button>
      <Table>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Username</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>{renderUser()}</Tbody>
      </Table>
    </Container>
  )
}

export default UserList
