

export default function Dropdown(props) {
  return (
    <div
      className={`dropdown ${props.className}`}>
      {props.children}
    </div>
  );
}
