import { useRef, useState } from "react";
import { useAppDispatch } from "../store";
import Map from "./Map";
import Button from "./Atoms/Buttons/Button";
import { ButtonTypes } from "./Atoms/types";
import { LatLngLiteral } from "leaflet";
import { IsDomElement } from "../utils";
import AddAddressForm from "./AddAddressForm";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../utils/consts";
import { CallAddAddress } from "../utils/ApiRoutes";
import { Bounce, toast } from "react-toastify";

const AddAddress = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [page, setPage] = useState<number>(0);
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [formData, setFormData] = useState<object | any>({});
  const [latlng, setLatLng] = useState<LatLngLiteral>({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(false);

  function HandleFormSubmit(
    e: Event | any,
    isValid: boolean,
    data: object | any
  ) {
    setIsFormValid(isValid);
    if (isValid) {
      setFormData(data);
      setPage(1);
    }
  }

  function SubmitForm() {
    if (page === 0) {
      if (
        IsDomElement(formRef.current) &&
        formRef.current instanceof HTMLFormElement
      ) {
        formRef.current.doSubmit();
      }
    } else {
      const data = {
        ...formData,
        ...latlng,
        region: 1,
      };
      setIsLoading(true);
      CallAddAddress(data)
        .then(() => {
          toast.success("با موفقیت ثبت شد", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
          setPage(2);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center pt-4 xss:px-[5vw] sm:px-0 2xl:px-[10vw]">
      <div className="w-full flex-grow flex flex-col pb-6 pt-2">
        <div className={`${page === 2 ? "hidden" : ""} flex justify-start items-center w-full my-2`}>
          <img
            className={`${page !== 1 ? "hidden" : ""} mx-2`}
            onClick={() => setPage(0)}
            src="/right-arrow.svg"
          />
          <h4 className="sm:text-base xss:text-base font-vazir-medium lg:opacity-75 opacity-90">
            ثبت آدرس
          </h4>
        </div>
        <div
          className={`${
            page !== 0 ? "hidden" : ""
          } card w-full min-h-48 mx-auto mt-2 p-10 pt-6`}
        >
          <h4 className="sm:text-base xss:text-sm font-vazir-bold opacity-85">
            لطفا مشخصات و آدرس خود را وارد کنید
          </h4>
          <AddAddressForm
            ref={formRef}
            className="flex flex-wrap lg:gap-3 lg:gap-y-6 mt-4 justify-between"
            HandleSubmit={HandleFormSubmit}
            inputNames={[
              "first_name",
              "last_name",
              "coordinate_phone_number",
              "coordinate_mobile",
              "address",
              "gender",
            ]}
          />
        </div>
        <div
          className={`${
            page !== 1 ? "invisible -z-10" : ""
          } card w-full flex-grow mx-auto flex flex-col`}
        >
          <h4 className="sm:text-base xss:text-sm font-vazir-bold opacity-85 m-2">
            موقعیت مورد نظر خود را روی نقشه پیدا کنید
          </h4>
          <Map setLatLng={setLatLng} />
        </div>
        <div
          className={`${
            page !== 2 ? "hidden" : ""
          } w-full h-full flex flex-col justify-center items-center`}
        >
          <img src="/check.svg" />
          <h5 className="opacity-75 mt-4">اطلاعات شما با موفقیت ثبت شد</h5>
          <Button
            className="text-primary"
            types={[ButtonTypes.round, ButtonTypes.bordered]}
            style={{ padding: "0.75rem 2.5rem" }}
            onClick={() => navigate(APP_ROUTES.addresses)}
          >
            مشاهده اطلاعات
          </Button>
        </div>
      </div>
      <div className={`${page === 2 ? "hidden" : ""} w-full h-16`}>
        <div className="flex justify-center items-center bg-white xss:px-4 sm:px-8 md:px-16 lg:px-32 h-16 absolute right-0 bottom-0 w-full">
          <Button
            types={[ButtonTypes.primary, ButtonTypes.round]}
            style={{ padding: "0.75rem 2rem" }}
            onClick={SubmitForm}
            isLoading={isLoading}
          >
            ثبت و ادامه
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
