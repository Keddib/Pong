const Error = ({ message }) => {
  return (
    <p className="text-center text-red/50">
      {`${message} ! please try agian`}
    </p>
  );
}


export default Error;
