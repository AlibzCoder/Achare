import { useEffect, useRef, useState } from "react";
import { CreateApiInstance } from "./Api";
import { BASE_URL } from "./consts";
import { Bounce, toast } from "react-toastify";

export const IsArray = (o: any): boolean =>
  o && {}.toString.call(o) === "[object Array]";
export const IsFunction = (o: any): boolean =>
  o && {}.toString.call(o) === "[object Function]";
export const IsObj = (o: any): boolean =>
  o !== null && typeof o === "object" && !(o instanceof Array);
export const IsNumber = (o: any): boolean =>
  typeof o == "number" || (typeof o == "object" && o.constructor === Number);
export const IsDomElement = (el: any): boolean =>
  el ? el instanceof Element || el instanceof HTMLElement : false;

export function IsEmpty(obj: any): boolean {
  if (
    ["undefined", "null"].includes(typeof obj) ||
    obj === undefined ||
    obj === null ||
    (IsArray(obj) && obj.length == 0)
  )
    return true;

  if (IsObj(obj)) {
    let r = true;
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        r = false;
        break;
      }
    }
    return r;
  }

  if ((typeof obj == "string" && obj != "") || typeof obj == "number")
    return false;

  return true;
}

export const DispatchEventOnEl = (
  evName: string,
  detail: object | any,
  selector?: string
) => {
  const rootEl = !IsEmpty(selector) ? document.querySelector(evName) : window;
  if (
    rootEl &&
    (IsDomElement(rootEl) || rootEl === window) &&
    !IsEmpty(evName)
  ) {
    rootEl.dispatchEvent(
      new CustomEvent(evName, {
        detail: detail,
      })
    );
  }
};

export const Api = CreateApiInstance(BASE_URL, 5, (data) => {
    toast.error(data.title || data.description || "خطا در برقراری ارتباط", {
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
});
