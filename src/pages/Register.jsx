import { useState } from "react"
import RegisterModal from "../components/Modal"
import {
  GridItem,
  HStack,
  Heading,
  Stack,
  Radio,
  RadioGroup, // for Password
  Text,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"

const Register = () => {
  const [show, setShow] = useState(false) // for password
  const handleClick = () => setShow(!show) // for password
  const { isOpen, onOpen, onClose } = useDisclosure() // open close modal
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  // const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")
  const toast = useToast()
  const [users, setUsers] = useState([])

  const submitRegister = () => {
    if (username.length >= 3 && email && password.length >= 8 && gender) {
      onOpen(true)

      let newUser = {
        username,
        email,
        password,
        gender,
      }
      setUsers([...users, newUser])
    } else {
      toast({
        title: "Form is invalid",
        status: "error",
      })
    }
  }

  const deleteUser = (idx) => {
    let tempUsers = [...users]
    tempUsers.splice(idx, 1)

    setUsers(tempUsers)
  }

  const showUsers = () => {
    return users.map((val, idx) => {
      return (
        <Stack
          spacing="4"
          border="1px solid black"
          borderRadius="8"
          padding="12px"
        >
          <Text>Username: {val.username}</Text>
          <Text>Email: {val.email}</Text>
          <Text>Password: {val.password}</Text>
          <Text>Gender: {val.gender}</Text>
          <Button onClick={() => deleteUser(idx)} colorScheme="red">
            Delete
          </Button>
        </Stack>
      )
    })
  }

  return (
    <>
      <Stack maxWidth={"650px"}>
        <Box
          mt="150px"
          align="top"
          justifyContent="center"
          p={8}
          maxWidth="800px"
          borderWidth={1}
          borderColor="black"
          borderRadius="8"
          textAlign="right"
          py="4"
          mr="100px"
        >
          <Heading align="left">Register</Heading>
          <br />
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement width={"4.5rem"}>
                <Button h="1.75 rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mt="5px">
            <FormLabel>Gender</FormLabel>
            <RadioGroup onChange={setGender} value={gender}>
              <HStack>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </HStack>
            </RadioGroup>
          </FormControl>

          <Button
            type="submit"
            onClick={submitRegister}
            colorScheme="teal"
            variant="solid"
            mt="3"
            width="full"
          >
            Register
          </Button>
        </Box>
        <GridItem height="50vh" overflow="scroll">
          <Stack>{showUsers()}</Stack>
        </GridItem>
      </Stack>

      <RegisterModal
        isOpen={isOpen}
        onClose={onClose}
        username={username}
        email={email}
        password={password}
        gender={gender}
      />
    </>
  )
}

export default Register
