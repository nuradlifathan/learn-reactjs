import { useState } from "react"
import {
  Box,
  Textarea,
  Button,
  Input,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react"

const TextPage = () => {
  const [inputText, setInputText] = useState("")
  //   const [count, setCount] = useState(0)

  const showTweet = () => {
    alert(inputText)
  }

  return (
    <div>
      <h1>Text Page</h1>
      <Textarea
        isInvalid={inputText.length >= 140}
        color={inputText.length >= 140 ? "red" : "black"}
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
      />
      <br />
      <span
        style={{
          color: inputText.length >= 140 ? "red" : "black",
        }}
      >
        {inputText.length} / 140
      </span>
      <CircularProgress
        value={(inputText.length / 140) * 100}
        color={inputText.length >= 140 ? "red" : "blue"}
      >
        {inputText.length >= 120 ? (
          <CircularProgressLabel>
            {140 - inputText.length}
          </CircularProgressLabel>
        ) : null}
      </CircularProgress>

      <br />
      <Button
        disabled={inputText.length >= 140 || inputText.length <= 0}
        onClick={showTweet}
      >
        Tweet
      </Button>
    </div>
  )
}

export default TextPage
