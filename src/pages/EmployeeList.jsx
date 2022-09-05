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
  Text,
  FormLabel,
  FormControl,
  InputGroup,
  InputRightElement,
  Stack,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react"
import { employeeList } from "../api"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useFormik } from "formik"
import * as Yup from "yup"
import {
  currentEmployee,
  fillEmployee,
  loginEmployee,
  selectUser,
  newloginEmployee,
} from "../features/employee/employeeSlice"

const EmployeeList = () => {
  const toast = useToast()
  const employeeSelector = useSelector((state) => state.employee)
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      let loginStatus = false
      employeeSelector.data.map((val) => {
        if (values.email === val.email && values.password === val.password) {
          console.log(val)
          loginStatus = true
          dispatch(newloginEmployee(val))
          toast({ title: "Login Success", status: "success" })
          fetchEmployee()
        } else if (
          values.email === val.email &&
          values.password !== val.password
        ) {
          return toast({ title: "wrong password input", status: "error" })
        } else if (
          values.password === val.password &&
          values.email !== val.email
        ) {
          return toast({ title: "email doesn't exist", status: "error" })
        }
      })
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("wrong email"),
      password: Yup.string()
        .required("password is empty")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
  })

  const handleFormChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  const fetchEmployee = async () => {
    try {
      const response = await employeeList.get("/employeeUser")

      dispatch(fillEmployee(response.data))
    } catch (err) {
      console.log(err)
      alert("Server Error! start db/employee.json ")
    }
  }

  const btnDelete = async (id) => {
    try {
      await employeeList.delete(`/employeeUser/${id}`)
      fetchEmployee()
      toast({ title: "user deleted", status: "success" })
    } catch (err) {
      toast({ title: "cannot delete", status: "error" })
      console.log(err)
    }
  }

  // const btnLogin = async (id) => {
  //   try {
  //     const response = await employeeList.get(`/employeeUser/${id}`)

  //     dispatch(loginEmployee(response.data))
  //     console.log(response.data)
  //   } catch (err) {
  //     console.log(err)
  //     toast({ title: "login error", status: "error" })
  //   }
  // }

  useEffect(() => {
    fetchEmployee()
  }, [])

  // untuk login di table
  // const renderEmployee = () => {
  //   return employeeSelector.data.map((val) => {
  //     return (
  //       <Tr key={val.id}>
  //         <Td>{val.name}</Td>
  //         <Td>{val.email}</Td>
  //         <Td>{val.password}</Td>
  //         <Td justifyItems="center">
  //           <Button
  //             colorScheme="green"
  //             ml="55"
  //             isDisabled={employeeSelector.currentEmployee.id === val.id}
  //             onClick={() => dispatch(loginEmployee(val))}
  //           >
  //             Login
  //           </Button>
  //           <Button ml="55" colorScheme="red" onClick={() => btnDelete(val.id)}>
  //             Delete
  //           </Button>
  //           <Button ml="55" colorScheme="messenger">
  //             Edit
  //           </Button>
  //         </Td>
  //       </Tr>
  //     )
  //   })
  // }

  // untuk login exercise
  const renderEmployee = () => {
    return employeeSelector.data.map((val) => {
      return (
        <Tr key={val.id}>
          <Td>{val.name}</Td>
          <Td>{val.email}</Td>
          <Td>{val.password}</Td>
          <Td justifyItems="center">
            <Button
              colorScheme="green"
              ml="55.5"
              isDisabled={employeeSelector.currentEmployee.id === val.id}
              onClick={() => dispatch(loginEmployee(val))}
            >
              Login
            </Button>
            <Button
              ml="55.5"
              colorScheme="red"
              onClick={() => btnDelete(val.id)}
            >
              Delete
            </Button>
            <Button ml="55.5" colorScheme="messenger">
              Edit
            </Button>
          </Td>
        </Tr>
      )
    })
  }

  return (
    <>
      <Container maxW="container.lg" p="3">
        <Flex backgroundColor="teal.400" borderRadius="12">
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
          <Box>
            <Text>Current Employee</Text>
            <Text>ID : {employeeSelector.newloginEmployee.id}</Text>
            <Text>Name : {employeeSelector.newloginEmployee.name}</Text>
            <Text>Email : {employeeSelector.newloginEmployee.email} </Text>
            <Text>Password: {employeeSelector.newloginEmployee.password}</Text>
          </Box>
          {/* <Box>
            <Text>Current Employee</Text>
            <Text>ID : {employeeSelector.fillEmployee.id}</Text>
            <Text>Name : {employeeSelector.fillEmployee.name2}</Text>
            <Text>Email : {employeeSelector.fillEmployee.email} </Text>
            <Text>Password: {employeeSelector.fillEmployee.password}</Text>
          </Box> */}
        </Flex>

        <Box
          p="8"
          mb="8"
          mt="2"
          borderRadius="6px"
          border="solid 1px lightgrey"
        >
          <Text fontWeight="bold" fontSize="4xl" mb="8">
            Login Employee
          </Text>
          <Stack>
            <FormControl isInvalid={formik.errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                autoComplete="off"
                value={formik.values.email}
                onChange={handleFormChange}
                name="email"
                type="email"
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={formik.values.password}
                  onChange={handleFormChange}
                  name="password"
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Flex>
              <Button
                maxW="500"
                colorScheme="green"
                onClick={formik.handleSubmit}
              >
                Login
              </Button>
              <Button colorScheme="red">Logout</Button>
            </Flex>
          </Stack>
        </Box>

        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Password</Th>
              <Th textAlign="2">Action</Th>
            </Tr>
          </Thead>
          <Tbody>{renderEmployee()}</Tbody>
        </Table>
      </Container>
    </>
  )
}

export default EmployeeList
