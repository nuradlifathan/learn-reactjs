import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { employeeList } from "../api"
import { useParams } from "react-router-dom"
import { useFormik } from "formik"

const EmployeeRegister = () => {
  const [employee, setEmployee] = useState({})
  const params = useParams()
  const toast = useToast()

  const formChange = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ name, email, password }) => {
      try {
        let newEmployee = {
          name,
          email,
          password,
        }

        await employeeList.post("/employeeUser", newEmployee)

        toast({ title: "employee created", status: "success" })
      } catch (err) {
        console.log(err)
        toast({ title: "network error", status: "err" })
      }
    },
  })

  return (
    <>
      <Container>
        <Box
          mt="50px"
          p={8}
          maxWidth="800px"
          borderWidth={1}
          borderColor="black"
          borderRadius="8"
          textAlign="center"
          py="4"
          mr="100px"
          backgroundColor="cyan.50"
        >
          <Heading align="center">Employee Register</Heading>
          <FormControl mt="1">
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              borderColor="1px solid black"
              onChange={formChange}
              defaultValue={employee.name}
            />
          </FormControl>
          <FormControl mt="1">
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              borderColor="1px solid black"
              onChange={formChange}
              defaultValue={employee.email}
            />
          </FormControl>
          <FormControl mt="1">
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              borderColor="1px solid black"
              onChange={formChange}
              defaultValue={employee.password}
            />
          </FormControl>

          <FormControl>
            <Link to={"/EmployeeList/"}>
              <Button mt="4" colorScheme="pink" onClick={formik.handleSubmit}>
                Submit
              </Button>
            </Link>
          </FormControl>
        </Box>
      </Container>
    </>
  )
}

export default EmployeeRegister
