import { useState } from "react"
import {
  Box,
  Textarea,
  Button,
  Input,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Heading,
  Flex,
  Spacer,
  Divider,
} from "@chakra-ui/react"

const TextPage = () => {
  const [inputText, setInputText] = useState("")
  //   const [count, setCount] = useState(0)

  const showTweet = () => {
    alert(inputText)
  }

  return (
    <>
      <Box maxW="505">
        <Heading>Text Page</Heading>
        <Textarea
          maxW="500"
          ml="2"
          mb="1"
          isInvalid={inputText.length >= 140}
          color={inputText.length >= 140 ? "red" : "black"}
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <Flex>
          <Button
            colorScheme="twitter"
            ml="2"
            disabled={inputText.length >= 140 || inputText.length <= 0}
            onClick={showTweet}
          >
            Tweet
          </Button>
          <Spacer />
          <span
            style={{
              color: inputText.length >= 140 ? "red" : "black",
            }}
          >
            {inputText.length} / 140
          </span>

          <CircularProgress
            ml="1"
            // size="8"
            value={(inputText.length / 140) * 100}
            color={inputText.length >= 140 ? "red" : "blue"}
          >
            {inputText.length >= 120 ? (
              <CircularProgressLabel>
                {140 - inputText.length}
              </CircularProgressLabel>
            ) : null}
          </CircularProgress>
        </Flex>
      </Box>
    </>
  )
}

export default TextPage
