import { FC } from 'react'

import {
  CloseButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
interface Props {
  className?: string
  children?: any
  open?: boolean
  onClose: () => void
  onEnter?: () => void | null
}

const CommerceModal: FC<Props> = ({
  children,
  open,
  onClose,
  onEnter = null,
}) => {
  return (
    <Modal isOpen={open ?? false} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={0}>
        <ModalHeader>
          <CloseButton onClick={onClose} />
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CommerceModal
