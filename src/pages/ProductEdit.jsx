import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { jsonProducts } from "../api"

const ProductEdit = () => {
  const params = useParams()
  const [product, setProduct] = useState({})

  const fetchProducts = async () => {
    try {
      const response = await jsonProducts.get(`/products/${params.id}`)

      setProduct(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <Box>
      <Heading align="center">Edit Page</Heading>
      <Container>
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input defaultValue={product.product_name} name="product_name" />
        </FormControl>
        <FormControl>
          <FormLabel>Product Price</FormLabel>
          <Input defaultValue={product.price} name="price" />
        </FormControl>
        <FormControl>
          <FormLabel>Product Stock</FormLabel>
          <Input defaultValue={product.stock} name="stock" />
        </FormControl>
      </Container>
    </Box>
  )
}

export default ProductEdit
