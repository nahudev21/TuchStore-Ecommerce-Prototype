import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import { setUpdateCart } from "./store/slices/cartSlice";
import { useEffect } from "react";
import { getMyCartRequest } from "./api/cart";
import { useDispatch, useSelector } from "react-redux";

export default function App() {

  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);

  const getMyCart = async () => {
    const res = await getMyCartRequest(user?.id, token);
    dispatch(setUpdateCart(res))
  }
  
  useEffect(() => {
    if (user?.id && token) {
      getMyCart();
    }
  }, [user?.id, token])

  return (
    <>
        <ToastContainer
          position= "bottom-right" 
        />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
    </>
  );
}

