import { ButtonStyle } from './styles';

const Button = (
    {
        type = 'submit',
        children,
        onClick,
        ...props
    }: {
        type?: 'submit' | 'reset' | 'button',
        children: any,
        onClick?: any,
    }
) => {

    return (
        <ButtonStyle type = { type } onClick={ onClick } {...props}>
            { children }
        </ButtonStyle>
    );
}

export default Button