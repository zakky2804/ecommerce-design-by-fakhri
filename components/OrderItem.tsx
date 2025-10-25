import { Package } from "lucide-react";
import { Order } from "@/interfaces/interface";
import { formatDate } from "@/utils/formatDate";
import OrderActionMenu from "./OrderActionMenu";

interface OrderItemProps {
  order: Order;
  onRemoveOrder: (id: string) => void;
}

const OrderItem = ({ order, onRemoveOrder }: OrderItemProps) => {
  return (
    <div className="flex items-center justify-between border-b border-border py-2">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-secondary rounded-md">
          <Package size={40} className="text-primary" />
        </div>
        <div className="">
          <p className="">{order.id}</p>
          <p className="">items: {order.products?.length}</p>
        </div>
      </div>

      <div className=" hidden sm:block text-sm">
        <p className=""> {order.fullName} </p>
        <p className="">
          {order.state}, {order.city}
        </p>
        <p className=""> {order.country} </p>
        <p className=""> {order.phone} </p>
      </div>
      <div className="hidden sm:block">${order.total}</div>
      <div className="hidden sm:block text-sm">
        <p className="">Method : {order.method}</p>
        <p className="">Date : {formatDate("2025-10-01T14:35:00Z")}</p>
        <p className="">Status : {order.status}</p>
      </div>
      <OrderActionMenu id={order.id} onRemoveOrder={onRemoveOrder} />
    </div>
  );
};

export default OrderItem;
