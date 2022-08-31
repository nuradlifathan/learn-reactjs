import { useState, useEffect } from "react"
import { Box, Heading, Button } from "@chakra-ui/react"

const List = () => {
  const [counter, setCounter] = useState(0)

  // component Did-Mount
  // Trigger setelah component di Mount pertamax
  useEffect(() => {
    alert("Hello")
  }, [])

  // component Did-Update
  useEffect(() => {
    alert("Counter berubah menjadi " + counter)
  }, [counter])
  // tiap kali 'counter' ada perubahan

  // component Will-Unmount
  // trigger sebelum component di-destroy
  useEffect(() => {
    return () => {
      alert("Goodbye")
    }
  }, [])

  return (
    <Box>
      <Heading>List Page</Heading>
      <Button onClick={() => setCounter(counter + 1)}>Tambah</Button>
    </Box>
  )
}

export default List
