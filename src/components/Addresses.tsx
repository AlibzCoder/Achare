import { useAppDispatch, useAppSelector } from "../store";
import { addressesSelector, setAddresses } from "../store/addressReducer";
import { useEffect, useState } from "react";
import { GetAddresses } from "../utils/ApiRoutes";
import AddressListItem from "./AddressListItem";
import { Address } from "../utils/ApiRoutes/types";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import Loader from "./Atoms/Loader";

const Addresses = () => {
  const dispatch = useAppDispatch();
  const Addresses: Array<Address> = useAppSelector(addressesSelector);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Addresses.length === 0) {
      setIsLoading(true);
      GetAddresses()
        .then((addresses) => {
          dispatch(setAddresses(addresses));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    console.log(Addresses);
  }, [Addresses]);

  const Row = ({ index, style }: { index: number; style: object }) => (
    <div style={style}>
      <AddressListItem {...Addresses[index]} />
    </div>
  );

  return (
    <div className="h-full flex flex-col items-center pt-4 sm:px-[5vw] xss:px-[5vw] md:px-[15vw] lg:px-[15vw]">
      <div className="text-start w-full">
        <h4 className="sm:text-base xss:text-base font-vazir-medium lg:opacity-75 opacity-90">
          آدرس ها و مشخصات
        </h4>
      </div>
      <div
        className={`${
          isLoading ? "hidden" : ""
        } my-2 w-full h-full flex justify-start`}
      >
        <AutoSizer>
          {({ height, width }) => (
            <List
              className="address-list"
              height={height}
              itemCount={Addresses.length}
              itemSize={width < 1024 ? 360 : 260}
              width={width}
              direction="rtl"
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </div>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loader className="text-primary" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Addresses;
