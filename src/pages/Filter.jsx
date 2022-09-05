import { useState } from "react"
import {
  Box,
  Heading,
  Button,
  Input,
  useToast,
  Divider,
  Flex,
  List,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react"

const Filter = () => {
  const [inputFilter, setInputFilter] = useState("") // untuk input text
  const [inputAddFruit, setInputAddFruit] = useState("")
  const [currentFilter, setCurrentFilter] = useState("") // unutuk simpan value input text
  const toast = useToast()

  const [fruits, setFruits] = useState([
    "Jeruk",
    "Leci",
    "Apel",
    "Mangga",
    "Salak",
    "Pisang",
    "Buah Naga",
  ])

  const renderFruits = () => {
    return fruits.map((val) => {
      if (val.toLowerCase().includes(currentFilter.toLowerCase())) {
        return <ListItem>{val}</ListItem>
      }
    })
  }

  const btnFilter = () => {
    setCurrentFilter(inputFilter)
  }

  const btnAddFruit = () => {
    if (inputAddFruit) {
      let newFruit = [...fruits]
      newFruit.push(inputAddFruit)
      setFruits(newFruit)
      setInputAddFruit("")
      toast({ title: "fruits added", status: "success" })
    } else {
      toast({ title: "Input is empty", status: "error" })
    }
  }

  return (
    <>
      <Box spacing="4px" ml="2">
        <Heading>Filter Page</Heading>
        <Flex>
          <Box mr="1">
            <Input
              maxWidth="300px"
              type="text"
              onChange={(event) => setInputFilter(event.target.value)}
            />
            <Button mr="1" onClick={btnFilter}>
              Filter
            </Button>
          </Box>
          <Box>
            <Input
              type="text"
              onChange={(event) => setInputAddFruit(event.target.value)}
            />
            <Button onClick={btnAddFruit}>Add</Button>
          </Box>
        </Flex>
        <UnorderedList>{renderFruits()}</UnorderedList>
      </Box>
    </>
  )
}

export default Filter
