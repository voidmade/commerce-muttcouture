import cn from 'classnames'
import s from './Input.module.css'
import React, { InputHTMLAttributes } from 'react'
import {
  ChakraComponent,
  ChakraProps,
  Input,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'

export interface Props extends ChakraProps {
  onChange?: (...args: any[]) => any
  type?: string
  placeholder?: string
  size?: string
  label?: string
}

const CommerceInput: React.FC<Props> = (props) => {
  const { children, type, label, onChange, ...rest } = props

  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value)
    }
    return null
  }

  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <Input
        borderRadius={0}
        type={type}
        onChange={handleOnChange}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...rest}
      />
    </FormControl>
  )
}

export default CommerceInput
