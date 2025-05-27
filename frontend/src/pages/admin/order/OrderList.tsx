import React, { useEffect } from "react";
import Table, { Column } from "../../../components/common/Table";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getAllOrders } from "../../../features/admin/adminThunk";

type Product = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  truckDriver: string;
  vendor: string;
  products: Product[];
  totalAmount: number;
  collectedAmount: number;
  createdAt: Date;
};

const OrderList: React.FC = () => {
  // Mock data (replace with actual API or props)
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);
  const columns: Column<Order>[] = [
    {
      key: "orderId",
      label: "Order ID",
    },
    {
      key: "truckDriver",
      label: "Truck Driver",
      render: (order) => (order.truckDriver as any)?.name || "N/A",
    },
    {
      key: "vendor",
      label: "Vendor",
      render: (order) => (order.vendor as any)?.name || "N/A",
    },
    {
      key: "products",
      label: "Products",
      render: (order) => (
        <ul className="space-y-1">
          {order.products.map((product, idx) => (
            <li key={idx} className="text-sm">
              {product.name} - {product.quantity} × ₹{product.price}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "totalAmount",
      label: "Total (₹)",
      render: (order) => `₹${order.totalAmount}`,
    },
    {
      key: "collectedAmount",
      label: "Collected (₹)",
      render: (order) => `₹${order.collectedAmount}`,
    },
    {
      key: "createdAt",
      label: "Ordered Date",
      render: (order) => new Date(order.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">
        📦 Order List
      </h2>
      <Table columns={columns} data={orders} />
    </div>
  );
};

export default OrderList;
