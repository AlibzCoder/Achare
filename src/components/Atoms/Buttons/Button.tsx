import { IsArray, IsEmpty } from "../../../utils";
import Loader from "../Loader";
import {
  ButtonProps,
  ButtonTypes,
  LinkButtonProps,
  TextSizesEnum,
} from "../types";

const Button = (props: ButtonProps | LinkButtonProps | any) => {
  const {
    className,
    href,
    children,
    types,
    size,
    isActive = false,
    isLoading = false,
    ...otherProps
  } = props;

  const _isUrl = !IsEmpty(href);
  const _class = `btn
        ${className || ""} 
        ${
          types && IsArray(types) && types?.length > 0
            ? types.join(" ")
            : `${ButtonTypes.bold} ${ButtonTypes.round} ${ButtonTypes.primary}`
        } 
        ${size && !IsEmpty(size) ? size : TextSizesEnum.base} 
        ${isActive ? "btn-active" : ""}
    `;
  const loaderColor =
    types && IsArray(types) && types?.length > 0
      ? types.includes(ButtonTypes.primary)
        ? "text-white"
        : "text-primary"
      : "text-white";

  return _isUrl ? (
    <button className={_class} {...otherProps}>
      {!isLoading ? children : <Loader className={loaderColor} />}
    </button>
  ) : (
    <>
      &nbsp;
      <a className={_class} {...otherProps} href={href}>
        {!isLoading ? children : <Loader className={loaderColor} />}
      </a>
    </>
  );
};

export default Button;
