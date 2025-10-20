interface Props {
  points: number;
}

const CustomerPoints: React.FC<Props> = ({ points }) => {
  return (
    <section className="mt-10 max-w-2xl mx-auto bg-yellow-50 p-6 rounded-xl shadow-sm border border-yellow-200">
      <h3 className="text-xl font-semibold text-yellow-800 mb-2!">⭐ Loyalty Points</h3>
      <p className="text-3xl font-bold text-yellow-900">{points} points</p>
      <p className="text-sm text-yellow-700 mt-1">Earned from completed orders</p>
    </section>
  );
};

export default CustomerPoints;
