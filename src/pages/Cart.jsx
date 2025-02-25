import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setUpdateCart } from "../store/slices/cartSlice";
import { getMyCartRequest, removeItemToCart } from "../api/cart";
import displayCurrency from "../helpers/displayCurrency";
import { updateItemQuantityRequest } from "../api/cart";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

export default function Cart() {

  const { user, token } = useSelector((state) => state.user); 
  const cart = useSelector((state) => state.cart.cart);

  const [ data, setData ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const loadingCart = new Array(cart?.length).fill(null);
  
  const dispatch = useDispatch();

  const getMyCart = async () => {
    setLoading(true);
    const res = await getMyCartRequest(user?.id, token);
    setLoading(false);
    setData(res.items.sort((a, b) => a.id - b.id) || []);
    dispatch(setUpdateCart(res));
  }

  useEffect(() => {
    getMyCart();
  }, [])

  const handleIncreaseQuantity = async (quantity, productId) => {
    const updatedQuantity = quantity += 1;

    const res = await updateItemQuantityRequest(cart.cartId, productId, updatedQuantity, token);
    const resCart = await getMyCartRequest(user?.id, token);
    setData(resCart?.items.sort((a, b) => a.id - b.id) || []);
    dispatch(setUpdateCart(resCart));

  }

  const handleDecreaseQuantity = async (quantity, productId) => {
    const updatedQuantity = (quantity -= 1);

    const res = await updateItemQuantityRequest(
      cart.cartId,
      productId,
      updatedQuantity,
      token
    );
    const resCart = await getMyCartRequest(user?.id, token);
    setData(resCart?.items.sort((a, b) => a.id - b.id) || []);
    dispatch(setUpdateCart(resCart));
  };

  const handleRemoveItem = async (productId) => {

    const res = await removeItemToCart(cart.cartId, productId, token);

    const resCart = await getMyCartRequest(user?.id, token);
    setData(resCart?.items.sort((a, b) => a.id - b.id) || []);
    dispatch(setUpdateCart(resCart));
    toast.success("Producto eliminado del carrito")
  };

  const totalQty = data.reduce((previusValue, currentValue) => previusValue + currentValue?.quantity, 0)

  const totalPrice = data.reduce((preve, current) => preve + (current?.quantity * current?.sellingPrice), 0)

  return (
    <div className="container p-4 mx-auto">
      <div className="flex flex-col lg:flex-row gap-10 ">
        {/*Vista de productos*/}
        <div className="w-full max-w-3xl ">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    key={index + "Add to cart loading"}
                    className="w-full h-32 border border-slate-300 bg-slate-200 animate-pulse rounded"
                  ></div>
                );
              })
            : data?.map((product, index) => {
                return (
                  <div
                    key={product?.id}
                    className="w-full h-40 border my-2 border-slate-300 bg-white rounded grid grid-cols-[128px,1fr] "
                  >
                    <div className="w-24 h-24 p-1 mx-4 my-auto">
                      <img
                        src={product?.images[0]}
                        alt={product?.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      <div
                        className="absolute right-0 p-2 text-red-600 text-[17px] hover:scale-105 cursor-pointer"
                        onClick={() => handleRemoveItem(product?.id)}
                      >
                        <MdDeleteForever />
                      </div>

                      <h2 className="text-sm lg:text-[16px] text-ellipsis line-clamp-1">
                        {product?.name}
                      </h2>
                      <p>{product?.category}</p>
                      <span className="block text-[13px] text-[#4189e6b7] font-medium ">
                        Estado {product?.status}
                      </span>
                      <span className="block text-[14px] font-medium text-[#eb611f] ">
                        Stock: {product?.inventory} {""} unidades
                      </span>
                      <div className="flex items-center justify-between">
                        <p className="text-black font-medium text-[16px]">
                          {displayCurrency(product?.sellingPrice)}
                        </p>
                        <div className="flex gap-1">
                          <p className="text-sm lg:text-[16px] text-ellipsis line-clamp-1">
                            Total por cantidad:
                          </p>
                          <p className="text-black font-medium text-[16px]">
                            {displayCurrency(
                              product?.sellingPrice * product?.quantity
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            handleDecreaseQuantity(
                              product?.quantity,
                              product?.id
                            )
                          }
                          disabled={product?.quantity === 1}
                          className="text-[18px] p-1 hover:scale-105 hover:text-[#eb611f] disabled:cursor-not-allowed"
                        >
                          -
                        </button>
                        <span className="py-[1px] px-[8px] text-[16px] font-medium rounded border border-[#4189e6b7]">
                          {product?.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleIncreaseQuantity(
                              product?.quantity,
                              product?.id
                            )
                          }
                          disabled={product?.quantity >= product?.inventory}
                          className="text-[18px] p-1 hover:scale-105 hover:text-[#eb611f] disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/*Total de productos*/}
        <div className="mt-5 p-2 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border border-slate-300 rounded animate-pulse">
              Total a pagar
            </div>
          ) : (
            <div className="h-36 bg-white rounded">
              <h2 className="text-white text-[16px] font-medium bg-[#eb611f] px-4 py-1 ">
                Total a pagar
              </h2>
              <div className="flex items-center justify-between px-4 pt-1 gap-2 font-medium text-[16px]">
                <p>Total de productos</p>
                <p className="">{totalQty}</p>
              </div>
              <div className="flex items-center justify-between px-4 pt-1 gap-2">
                <p className="font-medium text-[16px]">Precio total</p>
                <p className="text-black font-medium text-[16px]">
                  {displayCurrency(totalPrice)}
                </p>
              </div>

              <div className="w-full p-4">
                <button className="px-2 py-1 min-w-full bg-[#4189e6c5] text-white font-medium rounded-sm hover:bg-[#4189e6e3] hover:scale-105 transition-all ">
                  Ir a pagar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="text-center text-[16px] my-10">
        {data.length === 0 && !loading && (
          <p className="font-medium py-5">
            No hay productos agregados al carrito...
          </p>
        )}
      </div>
    </div>
  );
}
