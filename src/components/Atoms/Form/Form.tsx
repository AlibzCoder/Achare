import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import {
  DispatchEventOnEl,
  IsArray,
  IsDomElement,
  IsFunction,
} from "../../../utils";
import { FormProps } from "../types";

const Form = (props: FormProps, outerRef: ForwardedRef<any>) => {
  const { children, inputNames, HandleSubmit, ...otherProps } = props;
  const ref = useRef<HTMLFormElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const submiting = useRef<boolean>(false);
  useImperativeHandle(outerRef, () => ref.current!, []);

  useEffect(() => {
    if (
      IsDomElement(ref.current) &&
      ref.current instanceof HTMLFormElement &&
      IsDomElement(submitRef.current) &&
      submitRef.current instanceof HTMLButtonElement
    ) {
      ref.current.doSubmit = doSubmit;
    }
  });

  function doSubmit() {
    if (
      !submiting.current &&
      IsDomElement(submitRef.current) &&
      submitRef.current instanceof HTMLButtonElement
    ) {
      DispatchEventOnEl("form-submit", {});
      submiting.current = true;
      setTimeout(() => {
        submitRef.current?.click();
        submiting.current = false;
      }, 100);
    }
  }

  function getData() {
    if (IsDomElement(ref.current) && ref.current instanceof HTMLFormElement) {
      try {
        const formData = new FormData(ref.current);
        const entries = Object.fromEntries(formData);
        if (IsArray(inputNames)) {
          Object.keys(entries).forEach((key) => {
            if (!inputNames.includes(key)) {
              delete entries[key];
            }
          });
          return entries;
        }
        return {};
      } catch (e) {
        console.log(e);
      }
    }
    return {};
  }

  function isValidForm() {
    if (IsDomElement(ref.current) && ref.current instanceof HTMLFormElement) {
      const invalidInputs = ref.current.querySelectorAll(".form-input-invalid");
      if (invalidInputs.length > 0) {
        const invalids = Array.from(invalidInputs).map((el: HTMLElement | Element) => {
          const input = el.querySelector("input");
          if (
            input &&
            IsDomElement(input) &&
            input instanceof HTMLInputElement &&
            IsArray(inputNames)
          ) {
            return inputNames.includes(input?.name);
          }
          return false;
        });
        return !invalids.includes(true)
      }
    }
    return true;
  }

  function onSubmit(e: SubmitEvent | Event | any) {
    e.preventDefault();
    if (HandleSubmit && IsFunction(HandleSubmit))
      HandleSubmit(e, isValidForm(), getData());
    return false;
  }

  return (
    <form onSubmit={onSubmit} ref={ref} {...otherProps}>
      {children}
      <button ref={submitRef} type="submit" className="hidden"></button>
    </form>
  );
};

export default forwardRef(Form);
