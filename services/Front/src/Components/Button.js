export default function Button({ text, className = "", children }) {
  return (
    <button className={`button flex justify-center ${className}`}>
      {children}
      <span className={children ? "ml-2" : ""}>{text}</span>
    </button>
  );
}
