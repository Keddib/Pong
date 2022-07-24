type Props = {
  className: string;
  children: JSX.Element;
};

const Dropdown = ({ className, children }: Props) => {
  return <div className={`dropdown ${className}`}>{children}</div>;
};
export default Dropdown;
