export default function Card({ className = "", children }) {
  return (
    <div
      className={
        "rounded-2xl border border-gray-100/60 bg-white/70 backdrop-blur shadow-lg " +
        "dark:bg-white/10 dark:border-white/10 " +
        className
      }
    >
      {children}
    </div>
  );
}
