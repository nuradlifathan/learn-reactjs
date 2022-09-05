import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Text,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/react"

import { useState } from "react"
import { employeeList } from "../api" // server json
import { Link, Route, useParams } from "react-router-dom"
import { useFormik } from "formik"
// import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fillEmployee } from "../features/employee/employeeSlice"
import * as Yup from "yup"
import { useEffect } from "react"
// import { useEffect } from "react"

const EmployeeRegister = () => {
  const [showPW, setShowPW] = useState(false)
  const handleClick = () => setShowPW(!showPW)
  const toast = useToast()
  const dispatch = useDispatch()
  const employeeSelector = useSelector((state) => state.employee)

  //fetchEmployee disini hanya menampilkan untuk Navbar
  const fetchEmployee = async () => {
    try {
      const response = await employeeList.get("/employeeUser")

      dispatch(fillEmployee(response.data))
    } catch (err) {
      console.log(err)
      toast({ title: "Network error", status: "error" })
    }
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

        fetchEmployee()
        formik.setFieldValue("name", "")
        formik.setFieldValue("email", "")
        formik.setFieldValue("password", "")
        toast({ title: "employee created", status: "success" })
      } catch (err) {
        console.log(err)
        toast({ title: "network error", status: "err" })
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required().min(3),
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
  })

  const formChange = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  useEffect(() => {
    fetchEmployee()
  }, [])
  return (
    <>
      <Flex backgroundColor="teal.400" justifyContent="center">
        <Box p="4">
          <Heading backgroundColor="white" color="black" borderRadius="5">
            Network Call Practice
          </Heading>
        </Box>
        <Box p="4">
          <Heading backgroundColor="white" color="black" borderRadius="5">
            Total Employee : {employeeSelector.data.length}
          </Heading>
        </Box>
      </Flex>
      <Container max="container.lg">
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
        >
          <Heading align="center">Employee Register</Heading>

          <FormControl mt="1" isInvalid={formik.errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              borderColor="1px solid black"
              onChange={formChange}
              value={formik.values.name}
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          <FormControl mt="1" isInvalid={formik.errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              borderColor="1px solid black"
              onChange={formChange}
              value={formik.values.email}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl mt="1" isInvalid={formik.errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                name="password"
                borderColor="1px solid black"
                type={showPW ? "text" : "password"}
                placeholder="type password"
                onChange={formChange}
                value={formik.values.password}
              />
              <InputRightElement>
                <Button h="2rem" size="md" mr="2" onClick={handleClick}>
                  {showPW ? "hide" : "show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <Link to="/EmployeeList">
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
