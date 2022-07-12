import axios from "axios";

const URL = "http://localhost:3500";

export default axios.create({
  baseURL: URL
})

export const axiosImage = axios.create({
  baseURL: "http://localhost:3500/upload/d0c2f198012d0e25049a49eec79ad3db.jpg"
})

const axiosAuth = axios.create({
  baseURL: URL
})

export const authAPI = async (code, setError) => {
  try {
    // auth route "/"  get
    // displayed name = username
    // 200
    // 201
    // const response = await axiosAuth.get("/auth",
    //   {
    //     headers: { 'Content-Type': 'application/json' },
    //     params: { 'code': code },
    //     withCredentials: true
    //   }
    // );
    console.log("checking auth status")
    const response = await axiosAuth.get("http://localhost:3000/auth/status",
    {
      // headers: { 'Content-Type': 'application/json' },
      // params: { 'code': code },
      withCredentials: true
    }
  );
    return [response?.data, response?.status];

  } catch (err) {
    console.log(err)
    if(code)
{      if (!err?.response) {
        setError('No Server Response');
      } else if (err.response?.status === 401) {
        setError('Unauthorized');
      } else {
        setError('Login Failed');
      }}
    return [null, -1];
  }
}
