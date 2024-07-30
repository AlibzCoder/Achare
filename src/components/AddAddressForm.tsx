import {
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Form from "./Atoms/Form/Form";
import Input from "./Atoms/Form/Input";
import { FormProps } from "./Atoms/types";

const validators = {
  wiredPhone: [
    (v: string) => (!!v && !!v.trim()) || "",
    (v: string) =>
      !v
        .toString()
        .match(
          /^(?:\+98|0)?(21|24|25|26|31|34|35|36|37|38|41|44|45|51|54|56|58|61|66|71|74|76|77|81|83|84|86|87|88)\d{7}$/
        ) && "شماره وارد شده صحیح نمیباشد",
  ],
  cellPhone: [
    (v: string) => (!!v && !!v.trim()) || "لطفا این فیلد را پر کنید",
    (v: string) =>
      !v.toString().match(/^(?:\+98|0)?9[0-9]{2}[0-9]{7}$/) &&
      "شماره وارد شده صحیح نمیباشد",
  ],
  atleast3Chars: (name: string) => [
    (v: string) => (!!v && !!v.trim()) || "لطفا این فیلد را پر کنید",
    (v: string) => v?.length < 3 && `${name} باید حداقل دارای 3 کاراکتر باشد`,
  ],
};

const AddAddressForm = (props: FormProps, outerRef: ForwardedRef<any>) => {
  const ref = useRef<HTMLFormElement>(null);
  const { className, HandleSubmit, inputNames } = props;
  useImperativeHandle(outerRef, () => ref.current!, []);

  const [gender, setGender] = useState("male");

  return (
    <Form
      ref={ref}
      className={className}
      HandleSubmit={HandleSubmit}
      inputNames={inputNames}
    >
      <Input
        type="text"
        name="first_name"
        className="w-full lg:w-[32%]"
        legend="نام"
        placeHolder="مثال: محمد رضا"
        validators={validators.atleast3Chars("نام")}
        required={true}
      />
      <Input
        type="text"
        name="last_name"
        className="w-full lg:w-[32%]"
        legend="نام خانوادگی"
        placeHolder="مثال: رضایی"
        validators={validators.atleast3Chars("نام خانوادگی")}
        required={true}
      />

      <Input
        type="tel"
        name="coordinate_phone_number"
        className="w-full lg:w-[32%]"
        legend="شماره تلفن همراه"
        placeHolder="مثال 09302268216"
        validators={validators.cellPhone}
        pattern="[0-9]+"
        maxLength={11}
        required={true}
      />

      <Input
        type="tel"
        name="coordinate_mobile"
        className="w-full lg:w-[32%]"
        legend="شماره تلفن ثابت"
        info="* با پیش شماره"
        placeHolder="مثال 02144256780"
        validators={validators.wiredPhone}
        pattern="[0-9]+"
        maxLength={11}
      />
      <Input
        type="text"
        name="address"
        className="flex-grow"
        legend="آدرس"
        validators={validators.atleast3Chars("آدرس")}
        required={true}
      />

      <div className="flex w-full mt-2 gap-10 items-center text-sm md:text-base">
        <span>جنسیت</span>
        <div
          className="flex gap-2 items-center"
          onClick={() => setGender("female")}
        >
          <label htmlFor="female_radio">خانم</label>
          <input
            type="radio"
            id="female_radio"
            name="gender"
            value="female"
            onChange={(e) => e.target.checked ? setGender("male") : null}
            defaultChecked={gender === "female"}
          />
        </div>
        <div
          className="flex gap-2 items-center"
        >
          <label htmlFor="male_radio">آقا</label>
          <input
            type="radio"
            id="male_radio"
            name="gender"
            value="male"
            onChange={(e) => e.target.checked ? setGender("male") : null}
            defaultChecked={gender === "male"}
          />
        </div>
      </div>
    </Form>
  );
};

export default forwardRef(AddAddressForm);
