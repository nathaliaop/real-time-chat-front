import { ButtonLabel } from './styles';

const Button = (
    {
        type = 'submit',
        children,
        onClick,
        ...props
    }: {
        type?: 'submit' | 'reset' | 'button',
        children: any,
        onClick?: any
    }
) => {

    return (
        <ButtonLabel type = { type } onClick={ onClick } {...props}>
            { children }
        </ButtonLabel>
    );
}

export default Button