function ElementBar(props) {
  return (
    <div className={`group element-bar gap-10 ${props.className}`} >
      <span className={`element-bar-line ${props.line}`}></span>
      {props.children}
    </div>
  );
}

export default ElementBar;
