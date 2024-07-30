import { useLocation, useNavigate } from "react-router-dom";
import LinkButton from "./Atoms/Buttons/LinkButton";
import { APP_ROUTES } from "../utils/consts";

const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation();

  function HandleNavigation (e : MouseEvent | Event | any, route : string){
    e.preventDefault()
    if(route) navigate(route)
  }

  return (
    <div className="top-header flex justify-between items-center bg-white h-16 xss:px-4 sm:px-8 md:px-16 lg:px-32">
      <img
        className="h-full py-3"
        src="/logo.svg"
        alt="Achare Logo, لوگو اچاره"
      />
      <div className="gap-3">
        <LinkButton 
          onClick={e => HandleNavigation(e, APP_ROUTES.addAddress)}
          isActive={pathname == APP_ROUTES.addAddress}>ثبت آدرس</LinkButton>
        <LinkButton 
          onClick={e => HandleNavigation(e, APP_ROUTES.addresses)}
          isActive={pathname == APP_ROUTES.addresses}>مشاهده آدرس ها</LinkButton>
      </div>
    </div>
  );
};

export default Header;
