import { useEffect, useRef, useState } from "react";
import { IsDomElement, IsEmpty } from ".";

export const useCustomEventListener = (
  eventName: string,
  listener: (e: any) => void,
  rootElSelector?: string
) => {
  const [rootEl, setRootEl] = useState<Element | any>(null);
  const callbackRef = useRef(listener);

  useEffect(() => {
    callbackRef.current = listener;
  }, [listener]);
  useEffect(() => {
    if (rootElSelector) {
      const rootEl = document.querySelector(rootElSelector);
      setRootEl(IsDomElement(rootEl) ? rootEl : window);
    } else {
      setRootEl(window);
    }
  }, [rootElSelector]);

  useEffect(() => {
    if ((IsDomElement(rootEl) || rootEl === window) && !IsEmpty(eventName)) {
      const handler = (e: any) => callbackRef.current(e);
      rootEl.addEventListener(eventName, handler);

      return () => rootEl.removeEventListener(eventName, handler);
    }
  }, [eventName, rootEl]);
};
