import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { createOrder } from "../../features/user/authThunk";
import { config } from "../../config/config";

const backend = config.app.BACKEND

const Cart: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [collectedAmount, setCollectedAmount] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) {
      toast.error("Minimum quantity is 1");
      return;
    }
    const updated = [...cart];
    updated[index].quantity = quantity;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (index: number) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.success("Item removed from cart");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleOrder = async () => {
    const vendor = localStorage.getItem("selectedVendor");

    if (!collectedAmount) {
      toast.error("Please enter collected amount");
      return;
    }

    if (Number(collectedAmount) > total) {
      toast.error("Collected amount cannot exceed total");
      return;
    }

    if (Number(collectedAmount) < 0) {
      toast.error("Collected amount cannot be negative");
      return;
    }

    if (!cart.length) {
      toast.error("Cart is empty");
      return;
    }

    let productsData = cart.map((product) => ({
      productId: product?._id,
      name: product?.name,
      price: product?.price,
      quantity: product?.quantity,
    }));

    const orderData = {
      vendor,
      products: productsData,
      totalAmount: total,
      collectedAmount: Number(collectedAmount),
    };

    const result = await dispatch(createOrder(orderData));
    if (createOrder.fulfilled.match(result)) {
      toast.success(result.payload.message);
      localStorage.removeItem("cart");
      localStorage.removeItem("selectedVendor");
      setCollectedAmount("");
      navigate("/");
    } else if (createOrder.rejected.match(result)) {
      toast.error(result.payload as string);
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">
          🛒 Cart Summary
        </h2>

        {cart.length === 0 ? (
          <div className="text-center ">
            <p className="text-gray-500">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="bg-green-900 p-2 rounded mt-2 text-white hover:cursor-pointer hover:bg-green-800"
            >
              Place new Order
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border rounded-lg p-4 shadow-sm"
                >
                  <div>
                    <img
                      src={`${backend}/${item.image}`}
                      alt={item.name}
                      className="w-full h-20 rounded-md object-contain mb-4"
                    />
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm text-gray-500">₹{item.price} each</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={item.quantity}
                      min={1}
                      onChange={(e) =>
                        updateQuantity(index, Number(e.target.value))
                      }
                      className="w-16 p-1 border rounded text-center"
                    />
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <div className="font-bold text-lg">Total Amount: ₹{total}</div>

              <input
                type="number"
                className="p-2 border rounded w-full"
                placeholder="Collected Amount"
                value={collectedAmount}
                onChange={(e) => setCollectedAmount(e.target.value)}
              />

              <button
                className="mt-4 bg-green-800 text-white py-2 px-6 rounded hover:bg-green-700 transition"
                onClick={handleOrder}
              >
                Place Order
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
