import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  useToast,
} from "@chakra-ui/react"
import { employeeList } from "../api"
import { useState, useEffect } from "react"

const EmployeeList = () => {
  const [employee, setEmployee] = useState([])
  const toast = useToast()

  const fetchEmployee = async () => {
    try {
      const response = await employeeList.get("/employeeUser")

      setEmployee(response.data)
    } catch (err) {
      console.log(err)
      //   alert("Server error")
      toast({ title: "Network error", status: "error" })
    }
  }

  const renderEmployee = () => {
    return employee.map((val) => {
      return (
        <Tr>
          <Td>{val.name}</Td>
          <Td>{val.email}</Td>
          <Td>{val.password}</Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchEmployee()
  }, [])
  return (
    <>
      <Container maxW="container.lg" p="3">
        <Flex backgroundColor="teal.400">
          <Box p="4">
            <Heading backgroundColor="white" color="black" borderRadius="5">
              Network Call Practice
            </Heading>
          </Box>
          <Box p="4">
            <Heading backgroundColor="white" color="black" borderRadius="5">
              Total Employee :
            </Heading>
          </Box>
        </Flex>

        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Password</Th>
            </Tr>
          </Thead>
          <Tbody>{renderEmployee()}</Tbody>
        </Table>
      </Container>
    </>
  )
}

export default EmployeeList
