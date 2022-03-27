import React from 'react';
import { InputLabel } from './styles';

const Input = (
    {
        type='text',
        placeholder,
        value,
        onChange,
        minLength = 3,
        maxLength = 32,
        ...props
    }: {
        type?: string,
        placeholder: string,
        value: string,
        onChange: any,
        minLength?: number,
        maxLength?: number
    }
) => {

    return (
        <InputLabel>
            <input minLength = { minLength } maxLength = { maxLength } type={ type } value={value} onChange={e => onChange(e.target.value)} required {...props}/>
            <span>{ placeholder }</span>
        </InputLabel>
    );
}

export default Input