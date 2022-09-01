import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { jsonProducts } from "../api"
import { useFormik } from "formik"

const ProductEdit = () => {
  const [product, setProduct] = useState({})
  const params = useParams()
  const toast = useToast()

  const fetchProducts = async () => {
    try {
      // ini hanya boleh params.id
      const response = await jsonProducts.get(`/products/${params.id}`)

      setProduct(response.data)

      formik.setFieldValue("product_name", response.data.product_name)
      formik.setFieldValue("price", response.data.price)
      formik.setFieldValue("stock", response.data.stock)
    } catch (err) {
      console.log(err)
    }
  }

  const formChange = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const formik = useFormik({
    initialValues: {
      product_name: "",
      price: 0,
      stock: 0,
    },
    // using destructuring
    onSubmit: async ({ product_name, price, stock }) => {
      try {
        let newProduct = {
          product_name,
          price: Number(price),
          stock: Number(stock),
        }

        await jsonProducts.patch(`/products/${params.id}`, newProduct)

        fetchProducts()
        toast({ title: "Product Added", status: "success" })
      } catch (err) {
        toast({ title: "Network error", status: "error" })
        console.log(err)
      }
    },
  })

  return (
    <Box>
      <Heading align="center">Edit Page</Heading>
      <Container>
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input
            onChange={formChange}
            defaultValue={product.product_name}
            name="product_name"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Product Price</FormLabel>
          <Input
            onChange={formChange}
            defaultValue={product.price}
            name="price"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Product Stock</FormLabel>
          <Input
            onChange={formChange}
            defaultValue={product.stock}
            name="stock"
          />
        </FormControl>
        <Button mt="4" onClick={formik.handleSubmit}>
          Edit
        </Button>
      </Container>
    </Box>
  )
}

export default ProductEdit
