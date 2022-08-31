import { useState, useEffect } from "react"
import { Box, Text, Button, Stack, HStack } from "@chakra-ui/react"

const Counter = () => {
  // counter didalam isinya data kita , setcounter data yg ingin kita ganti
  const [counter, setCounter] = useState(0)
  const [showCounter, setShowCounter] = useState(true)

  const incrementCounter = () => {
    setCounter(counter + 1)
  }

  const decrementCounter = () => {
    setCounter(Math.max(0, counter - 1))
  }

  const resetCounter = () => {
    setCounter(0)
  }

  const toggleCounter = () => {
    setShowCounter(!showCounter)
  }

  useEffect(() => {
    if (!counter) {
      return
    }

    if (counter % 3 === 0) {
      alert("Fizz")
    } else if (counter % 5 === 0) {
      alert("Buzz")
    } else {
      alert(counter)
    }
  }, [counter])

  return (
    <>
      <Box mt={"4"}>
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          Counter Page
        </Text>
        <Text fontSize={"1xl"}>{counter}</Text>
        {/* Stack adalah Div yang memiliki display flex dan direction column */}

        <Stack width="400px">
          <HStack spacing={"3"}>
            <Button
              flex={"1"}
              colorScheme={"whatsapp"}
              onClick={incrementCounter}
            >
              Tambah
            </Button>
            <Button flex={"1"} colorScheme={"red"} onClick={decrementCounter}>
              Kurang
            </Button>
            <Button
              flex={"1"}
              colorScheme={"blackAlpha"}
              onClick={resetCounter}
            >
              Reset
            </Button>
          </HStack>
          <Button colorScheme="pink" onClick={toggleCounter}>
            Toogle Counter Visibility
          </Button>
        </Stack>
      </Box>
    </>
  )
}

export default Counter
