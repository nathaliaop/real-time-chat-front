import React from 'react';
import { InputLabel } from './styles';

const Input = (
    {
        placeholder,
        value,
        onChange,
        password=false,
        ...props
    }: {
        placeholder: string,
        value: string,
        onChange: any,
        password?: boolean
    }
) => {

    return (
        <InputLabel>
            <input type={password ? 'password': 'text'} value={value} onChange={e => onChange(e.target.value)} required {...props}/>
            <span>{ placeholder }</span>
        </InputLabel>
    );
}

export default Input