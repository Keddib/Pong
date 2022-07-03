import useImage from "/src/Hooks/useFetchImage";


function Image({ imageUrl, alt, className }) {
  let image = useImage(imageUrl);
  return (
    image ?
      <img src={image} alt={alt} className={className} />
      :
      <div className="h-full rounded-full bg-lotion/50 animate-pulse"></div>
  );
}

export default Image;
