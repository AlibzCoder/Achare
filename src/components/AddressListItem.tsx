import { Address } from "../utils/ApiRoutes/types";

const AddressListItem = (props: Address | any) => {
  const {
    first_name,
    last_name,
    address,
    gender,
    coordinate_mobile,
    coordinate_phone_number
  } = props;

  return (
    <div className="card w-full mx-auto p-10 pt-6 flex flex-wrap lg:gap-3 lg:gap-y-6 mt-4 justify-start">
      <div className="w-full hidden lg:flex lg:w-[30%] lg:flex-col flex-row mb-6 lg:mb-0">
        <span className="opacity-65">نام</span>
        <span className="lg:mt-4 font-vazir-medium">{first_name || "-"}</span>
      </div>
      <div className="w-full hidden lg:flex lg:w-[30%] lg:flex-col flex-row mb-6 lg:mb-0">
        <span className="opacity-65">نام خانوادگی</span>
        <span className="lg:mt-4 font-vazir-medium">{last_name || "-"}</span>
      </div>

      <div className="w-full lg:hidden flex justify-between flex-row mb-6">
        <span className="opacity-65">نام و نام خانوادگی</span>
        <span className="font-vazir-medium">{`${first_name} ${last_name}`}</span>
      </div>

      <div className="w-full lg:w-[30%] flex lg:flex-col justify-between lg:justify-start flex-row mb-6 lg:mb-0">
        <span className="opacity-65">شماره تلفن همراه</span>
        <span className="lg:mt-4 font-vazir-medium">{coordinate_mobile}</span>
      </div>
      <div className="w-full lg:w-[30%] flex lg:flex-col justify-between lg:justify-start flex-row mb-6 lg:mb-0">
        <span className="opacity-65">شماره تلفن ثابت</span>
        <span className="lg:mt-4 font-vazir-medium">
          {coordinate_phone_number}
        </span>
      </div>
      <div className="w-full lg:w-[30%] flex lg:flex-col justify-between lg:justify-start flex-row mb-6 lg:mb-0">
        <span className="opacity-65">جنسیت</span>
        <span className="lg:mt-4 font-vazir-medium">
          {["male", "female"].includes(gender || "")
            ? gender === "male"
              ? "آقا"
              : "خانم"
            : gender || "-"}
        </span>
      </div>
      <div
        className="w-full lg:w-[30%] flex lg:flex-col justify-between lg:justify-start flex-row mb-6 lg:mb-0 border-graySecondary pt-4 lg:border-none"
        style={{
          borderTopWidth: "1px",
        }}
      >
        <span className="opacity-65">آدرس</span>
        <span className="lg:mt-4 font-vazir-medium">{address}</span>
      </div>
    </div>
  );
};

export default AddressListItem;
