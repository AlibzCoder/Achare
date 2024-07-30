import { ButtonProps, ButtonTypes } from "../types";
import Button from "./Button";

const LinkButton = (props : ButtonProps) =>{
    const { 
        children,
        ...otherProps
    } = props;
    return <Button {...otherProps} types={[ButtonTypes.secondary, ButtonTypes.bold]}>{children}</Button>
}

export default LinkButton;