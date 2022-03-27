import React from 'react';
import { InputStyle } from './styles';

const Input = (
    {
        type='text',
        placeholder,
        value,
        onChange,
        minLength = 1,
        ...props
    }: {
        type?: string,
        placeholder: string,
        value: string,
        onChange: any,
        minLength?: number,
    }
) => {

    return (
        <InputStyle placeholder = { placeholder } minLength = { minLength } type={ type } value={value} onChange={e => onChange(e.target.value)} required {...props}/>
    );
}

export default Input