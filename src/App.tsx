import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import AddAddress from "./components/AddAddress";
import Addresses from "./components/Addresses";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app flex flex-col h-full w-full">
      <Header />
      <div className="layout-gray h-full w-full lg:px-20 xl:px-36 sm:px-8 md:px-16 overflow-y-scroll">
        <Routes>
          <Route path="/add" element={<AddAddress />} />
          <Route path="/" element={<Addresses />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
