import {
  Box,
  Text,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Button,
  GridItem,
  Grid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react"

import { useState, useEffect } from "react"
import axios from "axios"
import { jsonProducts } from "../api/"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"

const ProductList = () => {
  const [products, setProducts] = useState([])
  const toast = useToast()

  const fetchProducts = async () => {
    try {
      const response = await jsonProducts.get("/products")

      setProducts(response.data)
    } catch (err) {
      console.log(err)
      alert("Server Error! start db/db.json")
    }
  }

  const btnDelete = async (id) => {
    try {
      await jsonProducts.delete(`/products/${id}`)
      fetchProducts()
      toast({ title: "product deleted", status: "info" })
    } catch (err) {
      toast({ title: "cannot delete", status: "info" })
      console.log(err)
    }
  }

  const renderProduct = () => {
    return products.map((val) => {
      return (
        <Tr>
          <Td>{val.product_name}</Td>
          <Td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.price)}
          </Td>
          <Td>{val.stock}</Td>
          <Td>
            <Link to={`/ProductEdit/${val.id}`}>
              <Button colorScheme="whatsapp" mx="1">
                Edit
              </Button>
            </Link>
            <Button colorScheme="red" mx="1" onClick={() => btnDelete(val.id)}>
              Delete
            </Button>
          </Td>
        </Tr>
      )
    })
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
    onSubmit: async (values) => {
      try {
        const { product_name, price, stock } = values

        let newProduct = {
          product_name,
          price,
          stock,
        }

        await jsonProducts.post("/products", newProduct)

        fetchProducts()
        toast({ title: "Product Added", status: "success" })
      } catch (err) {
        toast({ title: "Network error", status: "failed" })
        console.log(err)
      }
    },
    validationSchema: Yup.object({
      product_name: Yup.string().required("product name still empty"),
      price: Yup.number()
        .required()
        .min(1000, "minimum price is 1000")
        .max(100000),
      stock: Yup.number().required().min(1, "minimum stock is 1"),
    }),
    validateOnChange: false,
  })

  const formChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <Container maxW="container.lg">
      <Text fontWeight="bold" fontSize="4xl" mb="16">
        Product List
      </Text>
      {/* <Button onClick={fetchProducts}>Fetch Data</Button> */}

      <Grid templateColumns="repeat(3,1fr)" columnGap="4">
        <GridItem>
          <FormControl isInvalid={formik.errors.product_name}>
            <FormLabel>Product Name</FormLabel>
            <Input name="product_name" onChange={formChange} />
            <FormErrorMessage>{formik.errors.product_name}</FormErrorMessage>
          </FormControl>
          <Button
            mt="2"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            Add Product
          </Button>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={formik.errors.price}>
            <FormLabel>Product Price</FormLabel>
            <Input name="price" type="number" onChange={formChange} />
            <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
          </FormControl>
        </GridItem>

        <GridItem>
          <FormControl isInvalid={formik.errors.stock}>
            <FormLabel>Product Stock</FormLabel>
            <Input name="stock" type="number" onChange={formChange} />
            <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>

      <Table>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>{renderProduct()}</Tbody>
      </Table>
    </Container>
  )
}

export default ProductList
