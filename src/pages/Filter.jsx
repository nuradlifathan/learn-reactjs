import { useState } from "react"
import { Box, Heading, Button, Input } from "@chakra-ui/react"

const Filter = () => {
  const [filter, setFilter] = useState("")
  const [input, setInputFilter] = useState("")

  const fruits = [
    "Jeruk",
    "Leci",
    "Apel",
    "Mangga",
    "Salak",
    "Pisang",
    "Buah Naga",
  ]

  const filterBuah = () => {
    return fruits
      .filter((buah) => buah.includes(filter) || filter === "")
      .map((buah) => <li key={buah}> {buah} </li>)
  }

  const filterButton = () => {
    setFilter(filter)
  }

  return (
    <>
      <Box spacing="4px">
        <Heading>Filter Page</Heading>
        <Input
          maxWidth="500px"
          type="text"
          onChange={(event) => setFilter(event.target.value)}
        />
        <Button onClick={filterButton}>Filter</Button>

        <ul>{filterBuah()}</ul>
      </Box>
    </>
  )
}

export default Filter
