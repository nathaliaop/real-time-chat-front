import React from 'react';
import { InputStyle } from './styles';

const Input = (
    {
        width = "13rem",
        type='text',
        placeholder,
        value,
        onChange,
        minLength = 1,
        ...props
    }: {
        width?: string,
        type?: string,
        placeholder: string,
        value: string,
        onChange: any,
        minLength?: number,
    }
) => {

    return (
        <InputStyle width = { width } placeholder = { placeholder } minLength = { minLength } type={ type } value={value} onChange={e => onChange(e.target.value)} required {...props}/>
    );
}

export default Input