type Props = {
  className: string;
  line: string;
  children: JSX.Element;
};
const ElementBar = (props: Props) => {
  return (
    <div className={`group element-bar gap-10 ${props.className}`}>
      <span className={`element-bar-line ${props.line}`}></span>
      {props.children}
    </div>
  );
};

export default ElementBar;
