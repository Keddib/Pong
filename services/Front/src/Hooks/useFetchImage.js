import { useEffect, useState } from "react";
import { axiosImage } from "/src/Services/api/axios";



export default function App(imageUrl) {

  const [img, setImg] = useState();

  useEffect(() => {

    if (!imageUrl) {
      return null;
    }

    const controller = new AbortController();
    const fetchImage = async () => {
      let imageBlob;
      try {
        imageBlob = await axiosImage.get("", {
          responseType: "blob",
          signal: controller.signal
        }).then((res) => (res.data));

        if (imageBlob) {
          let imageObjectURL = URL.createObjectURL(imageBlob);
          setImg(imageObjectURL);
        }
      } catch (err) {
        console.log(err.message);
        return null
      }
    };

    setTimeout(fetchImage, 500);

    return (() => {
      controller.abort();
    });

  }, [imageUrl]);

  return img;
}
