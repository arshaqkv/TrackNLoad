import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getProductsForTD } from "../../features/user/authThunk";
import Navbar from "../../components/Navbar";
import { config } from "../../config/config";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const backend = config.app.BACKEND

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.auth);
  const [cart, setCart] = useState<(Product & { quantity: number })[]>([]);

  useEffect(() => {
    dispatch(getProductsForTD());
  }, []);

  const addToCart = (product: Product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (!exists) {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  const goToCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "/cart"; // You can replace with React Router navigation
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-6">
        <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
          Available Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products?.map((product) => (
            <div
              key={product?._id}
              className="bg-green-50  rounded-xl  shadow hover:shadow-lg transition duration-200 p-4 flex flex-col justify-between"
            >
              <img
                src={`${backend}/${product.image}`}
                alt={product.name}
                className="w-full h-40 object-contain mb-4"
              />
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-green-700 font-bold mt-1">
                  ₹{product.price}
                </p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div className="fixed bottom-6 left-0 right-0 flex justify-center">
            <button
              onClick={goToCart}
              className="bg-green-800 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-700 transition"
            >
              🛒 View Cart ({cart.length})
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
