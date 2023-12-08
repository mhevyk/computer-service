import { useOrders } from "@features/orders/hooks/useOrders";
import { OrderStatus } from "@features/orders/types";
import { formatDate } from "@utils/formatDate";
import { ReactElement } from "react";

const OrderStatusBadges: Record<OrderStatus, ReactElement> = {
  ACCEPTED: <span className="badge badge-outline">Прийнято</span>,
  IN_PROCESS: (
    <span className="badge badge-warning badge-outline">В процесі</span>
  ),
  SHIPPED: (
    <span className="badge badge-primary badge-outline">Доставляється</span>
  ),
  COMPLETED: (
    <span className="badge badge-success badge-outline">Виконано</span>
  ),
  CANCELED: <span className="badge badge-error badge-outline">Скасовано</span>,
};

export function OrdersPage() {
  const [orders] = useOrders();

  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID замовлення</th>
          <th>Комп'ютер</th>
          <th>Статус</th>
          <th>Кількість (шт)</th>
          <th>Ціна замовлення (грн)</th>
          <th>Дата створення</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map(order => (
          <tr key={order.order_id}>
            <td>{order.order_id}</td>
            <td>
              {order.computer.brand} {order.computer.name}
            </td>
            <td>{OrderStatusBadges[order.status]}</td>
            <td>{order.quantity}</td>
            <td>{order.price}</td>
            <td>
              {formatDate(new Date(order.createdAt), {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
