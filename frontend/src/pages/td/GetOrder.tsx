import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getOrdersForTD } from "../../features/user/authThunk";
import Navbar from "../../components/Navbar";

const TruckDriverOrderCard = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getOrdersForTD());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {orders?.length > 0 ? (
            orders.map((order: any) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h2 className="text-2xl font-bold text-blue-700 mb-4">
                  Order ID:{" "}
                  <span className="text-gray-800">{order.orderId}</span>
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-gray-600 font-medium">Vendor</p>
                    <p className="text-gray-800">{order.vendor.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Total Amount</p>
                    <p className="text-green-700 font-semibold">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">
                      Collected Amount
                    </p>
                    <p className="text-yellow-700 font-semibold">
                      ₹{order.collectedAmount}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Created At</p>
                    <p className="text-gray-800">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                  Products
                </h3>
                <div className="divide-y divide-gray-200">
                  {order.products.map((product: any) => (
                    <div key={product._id} className="py-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-800 font-medium">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {product.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-700">₹{product.price}</p>
                          <p className="text-sm text-gray-500">
                            Total: ₹{product.price * product.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TruckDriverOrderCard;
