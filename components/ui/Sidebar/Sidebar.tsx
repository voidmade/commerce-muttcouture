import s from './Sidebar.module.css'
import Portal from '@reach/portal'
import { FC, useEffect, useRef } from 'react'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import { Modal, ModalContent } from '@chakra-ui/modal'

interface Props {
  children: any
  open: boolean
  onClose: () => void
}

const Sidebar: FC<Props> = ({ children, open = false, onClose }) => {
  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      motionPreset="slideInRight"
      size="full"
    >
      <ModalContent bottom="0" ml="auto" mt="0" w="90vw" maxW="400px">
        {children}
      </ModalContent>
    </Modal>
  )
}

export default Sidebar
