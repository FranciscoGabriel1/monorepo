
export default function StatusBar({ isOnline, productsCount }) {
  const bg = isOnline ? "bg-green-600" : "bg-red-600";
  const label = isOnline ? "Online" : "Offline";

  return (
    <div className={`${bg} text-white w-full`}>
      <div className="mx-auto max-w-6xl px-4 py-2 flex items-center justify-between text-sm">
        <span className="font-medium">Backend: {label}</span>
        <span>
          Products loaded: <strong>{productsCount}</strong>
        </span>
      </div>
    </div>
  );
}
