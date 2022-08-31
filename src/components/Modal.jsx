import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"

const RegisterModal = ({
  isOpen,
  onClose,
  username,
  email,
  password,
  gender,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Result</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Username : {username}</Text>
          <Text>Email : {email}</Text>
          <Text>Password : {password}</Text>
          <Text>Gender : {gender}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default RegisterModal
