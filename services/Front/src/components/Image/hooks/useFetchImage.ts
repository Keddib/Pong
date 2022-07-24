import { useEffect, useState } from "react";
import { axiosImage } from "services/axios";

export default function App(imageUrl: string): string {
  const [img, setImg] = useState<string>("");

  useEffect(() => {
    if (!imageUrl) {
      return;
    }

    const controller = new AbortController();
    const fetchImage = async () => {
      let imageBlob;
      try {
        imageBlob = await axiosImage
          .get("", {
            responseType: "blob",
            signal: controller.signal,
          })
          .then((res) => res.data);

        if (imageBlob) {
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImg(imageObjectURL);
        }
      } catch (error) {
        console.log(error);
        return;
      }
    };

    setTimeout(fetchImage, 500);

    return () => {
      controller.abort();
    };
  }, [imageUrl]);

  return img;
}
