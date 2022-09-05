import {
  Box,
  Text,
  Button,
  Heading,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import {
  increment,
  decrement,
  reset,
  addInput,
} from "../features/counter/counterSlice"

const ReduxCounter = () => {
  const [input, SetInput] = useState("")

  const counterSelector = useSelector((state) => {
    return state.counter
  })

  const dispatch = useDispatch()

  const incrementBtnHandler = () => {
    dispatch(increment())
  }

  const decrementBtnHandler = () => {
    dispatch(decrement())
  }

  const resetBtnHandler = () => {
    dispatch(reset())
  }

  const submitInput = () => {
    dispatch(addInput(Number(input)))
    // dispatch({
    //   type: "counter/addInput",
    //   payload: SetInput,
    // })
  }

  return (
    <Box>
      <Heading>Redux Counter</Heading>
      <Text fontSize="4xl" fontWeight="bold">
        {counterSelector.value}
      </Text>
      <HStack>
        <Button onClick={incrementBtnHandler} colorScheme="facebook">
          Increment
        </Button>
        <Button onClick={decrementBtnHandler} colorScheme="red">
          Decrement
        </Button>
        <Button onClick={resetBtnHandler} colorScheme="blackAlpha">
          Reset
        </Button>
      </HStack>
      <Stack mt="3">
        <Input
          type="number"
          borderColor="Highlight"
          maxWidth="305px"
          value={input}
          onChange={(event) => SetInput(event.target.value)}
        />
        <Button maxWidth="305px" colorScheme="cyan" onClick={submitInput}>
          Confirm
        </Button>
      </Stack>
    </Box>
  )
}

export default ReduxCounter
