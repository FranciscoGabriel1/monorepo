
function Checkbox({ children, className = '', ...props }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        className={
          `form-checkbox h-5 w-5 rounded-md border-2 ` +
          `border-[#E6EBF2] text-[#5865F2] accent-[#5865F2] ` +
          `focus:ring-2 focus:ring-[#a073fa] focus:ring-offset-1 ` +
          `disabled:opacity-50 disabled:cursor-not-allowed ` +
          className
        }
        {...props}
      />
      <span className="text-sm leading-5 text-[#313B45]">{children}</span>
    </label>
  );
}

export default Checkbox;
