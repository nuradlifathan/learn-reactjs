import {
  Box,
  Text,
  Heading,
  Flex,
  HStack,
  Input,
  Button,
  Radio,
  RadioGroup,
  Select,
  FormControl,
} from "@chakra-ui/react"
import {
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
} from "@chakra-ui/react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addUser, deleteUser } from "../features/student/studentSlice"

const Exercise = () => {
  const studentSelector = useSelector((state) => state.student)
  const dispatch = useDispatch()

  const [submitName, setSubmitName] = useState("")
  const [submitGender, setSubmitGender] = useState("")
  const [submitCourse, setSubmitCourse] = useState("")

  const showStudent = () => {
    return studentSelector.data.map((val, idx) => {
      return (
        <Tr key={val.name}>
          <Td>{val.name}</Td>
          <Td>{val.gender}</Td>
          <Td>{val.course}</Td>
          <Td>
            <Button onClick={() => dispatch(deleteUser(idx))}>Delete</Button>
            <Button>Edit</Button>
          </Td>
        </Tr>
      )
    })
  }

  const btnAddData = () => {
    let newUser = {
      name: submitName,
      gender: submitGender,
      course: submitCourse,
    }
    dispatch(addUser(newUser))
  }

  return (
    <>
      <Flex backgroundColor="teal.400">
        <Box p="4">
          <Heading size="lg">Exercise - State Management</Heading>
        </Box>
        <Box p="4">
          <Heading size="lg" color="white">
            Total User: {studentSelector.data.length}
          </Heading>
        </Box>
      </Flex>

      <TableContainer
        overflowY="scroll"
        maxHeight="280px"
        mt="5"
        justifyContent="center"
        maxWidth="full"
        alignSelf="center"
      >
        <Table variant="striped" colorScheme="teal">
          {/* <Flex></Flex> */}
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Gender</Th>
              <Th>Course</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>{showStudent()}</Tbody>
        </Table>
      </TableContainer>

      <HStack mt="5" justifyContent="center">
        <Input
          value={submitName}
          onChange={(event) => setSubmitName(event.target.value)}
          type="text"
          width="500"
          placeholder="type your name"
        />
        <RadioGroup
          value={submitGender}
          onChange={(value) => setSubmitGender(value)}
        >
          <HStack>
            <Radio value="Male">Male</Radio>
            <Radio value="Female">Female</Radio>
          </HStack>
        </RadioGroup>
        <Select
          placeholder="Select Course"
          maxWidth="300"
          value={submitCourse}
          onChange={(event) => setSubmitCourse(event.target.value)}
        >
          <option>Full Stack</option>
          <option>Digital Marketing</option>
          <option>Data Scientist</option>
          <option>UI/UX</option>
        </Select>
        <Button width="250" onClick={btnAddData}>
          Add
        </Button>
      </HStack>
    </>
  )
}

export default Exercise
