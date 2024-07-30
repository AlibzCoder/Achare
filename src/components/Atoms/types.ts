import { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, FormHTMLAttributes, InputHTMLAttributes } from "react";

export enum TextSizesEnum {
    sm = "text-sm sm:text-xs xss:text-xs", // text-sm	-> font-size: 0.875rem;  14px
    base = "text-base sm:text-sm xss:text-sm", // text-base -> font-size: 1rem; 16px 
    lg = "text-lg sm:text-base xss:text-base", // text-lg	-> font-size: 1.125rem; 18px 
    xl = "text-xl sm:text-lg xss:text-lg" // text-xl	-> font-size: 1.25rem; 20px 
}

export enum ButtonTypes {
    circle = "btn-circle",
    square = "btn-square",
    bordered = "btn-bordered",
    round = "btn-round",
    secondary = "btn-secondary",
    primary = "btn-primary",
    bold = "btn-bold",
    fixed = "btn-fixed-size"
}

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{ 
    onClick?: (e : any) => void,
    href? : string,
    size? : TextSizesEnum,
    types? : ButtonTypes[],
    isActive? : boolean,
    isLoading? : boolean
}
export interface LinkButtonProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>{ 
    onClick?: (e : any) => void,
    href? : string,
    size? : TextSizesEnum,
    types? : ButtonTypes[],
    isActive? : boolean,
    isLoading? : boolean
}

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    type : "text" | "number" | "email" | "password" | "range" | "tel",
    placeHolder? : string,
    name? : string,
    legend? : string,
    info? : string,
    validators? : Array<(v : string) => boolean | string>,
    value? : string | number | any,
    ignoreValidation? : boolean,
    autoValidate? : boolean,
    selectAllOnFocus? : boolean,
    required? : boolean,
    onFocus? : (e? : Event | any) => void,
    onBlur? : (e? : Event | any) => void,
    onChange? : (e? : Event | any) => void
}

export interface FormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>{
    inputNames : string[],
    HandleSubmit: (e : SubmitEvent | Event | any, isValid : boolean, data: object) => void
}