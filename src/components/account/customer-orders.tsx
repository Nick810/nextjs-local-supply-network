type Order = {
  orderNumber: number;
  totalPrice: string;
  processedAt: string;
  lineItems: {
    edges: {
      node: {
        title: string;
        quantity: number;
      };
    }[];
  };
};

interface Props {
  orders: Order[];
}

const CustomerOrders: React.FC<Props> = ({ orders }) => {
  if (orders.length === 0) return null;

  return (
    <section className="mt-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">🧾 Recent Orders</h3>
      <ul className="space-y-6">
        {orders.map((order) => (
          <li key={order.orderNumber} className="border-b pb-4">
            <div className="flex justify-between text-sm text-gray-700">
              <span>Order #{order.orderNumber}</span>
              <span>{new Date(order.processedAt).toLocaleDateString()}</span>
            </div>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              {order.lineItems.edges.map(({ node }, idx) => (
                <li key={idx}>
                  {node.quantity} × {node.title}
                </li>
              ))}
            </ul>
            <div className="mt-2 text-right text-sm font-medium text-gray-800">
              Total: {order.totalPrice}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CustomerOrders;
