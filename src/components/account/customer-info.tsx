type Customer = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

interface Props {
  customer: Customer;
}

const CustomerInfo: React.FC<Props> = ({ customer }) => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4! tracking-tight">
        Welcome back, {customer.firstName} 👋
      </h2>
      <div className="space-y-3">
        <InfoRow label="Full Name" value={`${customer.firstName} ${customer.lastName}`} />
        <InfoRow label="Email" value={customer.email} />
        {customer.phone && <InfoRow label="Phone" value={customer.phone} />}
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center border-b pb-2">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-800">{value}</span>
  </div>
);

export default CustomerInfo;
