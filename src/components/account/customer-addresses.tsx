type Address = {
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  zip: string;
  country: string;
};

interface Props {
  addresses: Address[];
}

const CustomerAddresses: React.FC<Props> = ({ addresses }) => {
  if (addresses?.length === 0) return <></>;

  return (
    <section className="mt-10 max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">📍 Saved Addresses</h3>
      <ul className="space-y-4">
        {addresses?.map((addr, idx) => (
          <li key={idx} className="text-sm text-gray-700">
            <div>{addr.address1}{addr.address2 && `, ${addr.address2}`}</div>
            <div>{addr.city}, {addr.province} {addr.zip}</div>
            <div>{addr.country}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CustomerAddresses;
