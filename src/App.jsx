import { useState } from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import errorIcon from "./assets/images/icon-error.svg";
import revealPassword from "./assets/images/Icon.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const revealPass = () => {
    setShowPassword(!showPassword);
  };
  // post request to the BE tomorrow
  // const onSubmit = async (data) => {
  //  try {
  //   setLoading(true)
  //   console.log(data);
  //   const res = await axios.post(
  //     "https://form-handling.onrender.com/api/v1/auth/register",
  //     data
  //   );
  //   setLoading(false)
  //   if(res.status == 201){
  //     reset()
  //     toast.success(" Thanks for registering")
  //   }
  //   console.log(res);
  //  } catch (error) {
  //   setLoading(false)
  //   console.log(error);
  //  }
  // };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      console.log(data);
      const res = await axios.post(
        "https://form-handling.onrender.com/api/v1/auth/register",
        data
      );
      console.log(res);
      if (res.status == 201) {
        setLoading(false);
        reset();
        toast.success("Registration successful");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("something went wrong");
      setFormError(error.response.data.message)
    }
  };
console.log(formError);
  return (
    <div className=" w-11/12 lg:w-[70%] mx-auto my-12 items-center grid grid-cols-1 lg:grid-cols-2 gap-20">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 8000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <div>
        <h1 className="text-white text-2xl font-bold lg:text-5xl text-center lg:text-left py-6">
          Learn to code by watching others
        </h1>
        <p className="text-center lg:text-left text-white">
          See how experienced developers solve problems in real-time. Watching
          scripted tutorials is great, but understanding how developers think is
          invaluable.{" "}
        </p>
      </div>
      <div>
        <p className="text-white text-center bg-blue-900 rounded-md my-5 p-8 shadow-lg">
          {" "}
          Try it free 7 days then $20/mo. thereafter
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col gap-4 bg-white p-9 rounded-md shadow-lg"
        >
          {formError && <p className="text-red-500 font-bold"> {formError}</p>}
          <div className="relative">
            <input
              {...register("firstname", { required: " Firstname is required" })}
              className={`border w-full relative outline-0 border-1 border-gray-500 px-3 py-3 rounded-md ${
                errors.firstname ? "border-red-500" : ""
              }`}
              placeholder={`${errors.firstname ? " " : " First Name "}`}
              type="text"
            />
            {errors.firstname && (
              <img
                className="  w-5 h-5 -translate-y-8 absolute right-5"
                src={errorIcon}
                alt=""
              />
            )}
          </div>
          {errors.firstname && (
            <p className="text-red-500 text-end">{errors.firstname.message}</p>
          )}
          <div className="relative">
            <input
              {...register("lastname", { required: "Lastname is required" })}
              className={`border w-full relative outline-0 border-1 border-gray-500 px-3 py-3 rounded-md ${
                errors.lastname ? "border-red-500" : ""
              }`}
              placeholder={`${errors.lastname ? " " : " lastname "}`}
              type="text"
            />
            {errors.lastname && (
              <img
                className=" w-5 h-5 -translate-y-8 absolute right-5 "
                src={errorIcon}
                alt=""
              />
            )}
          </div>
          {errors.lastname && (
            <p className="text-red-500 text-end">{errors.lastname.message}</p>
          )}

          <div className="relative">
            <input
              {...register("email", {
                required: " Email Address is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className={`border ${
                errors.email ? " placeholder:text-red-500" : ""
              } w-full relative outline-0 border-1 border-gray-500 px-3 py-3 rounded-md ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder={`${errors.email ? " example@gmail.com" : " email "}`}
              type="email"
            />
            {errors.email && (
              <img
                className=" w-5 h-5 -translate-y-8 absolute right-5 "
                src={errorIcon}
                alt=""
              />
            )}
          </div>
          {errors.email && (
            <p className="text-red-500 text-end">{errors.email.message}</p>
          )}
          <div className="relative">
            <input
              {...register("password", { required: " Password is required" })}
              className={`border w-full relative outline-0 border-1 border-gray-500 px-3 py-3 rounded-md ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder={`${errors.password ? " " : " password "}`}
              type={showPassword ? "text" : "password"}
            />
            <img
              onClick={revealPass}
              className="w-5 h-5 -translate-y-8 absolute right-5"
              src={revealPassword}
              alt=""
            />
            {errors.password && (
              <img
                className=" w-5 h-5 -translate-y-8 absolute right-5 "
                src={errorIcon}
                alt=""
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 text-end">{errors.password.message}</p>
          )}
          <button
            type="submit"
            className="px-3 outline-0 py-3 rounded-md hover:bg-green-600 bg-[#38CC8C] text-white"
          >
            {loading ? "loading..." : "CLAIM YOUR FREE TRIAL"}
          </button>
          <p className="text-center">
            {" "}
            By clicking the button, you are agreeing to our{" "}
            <span className="text-red-500 font-bold">Terms and Services</span>
          </p>
        </form>
      </div>
    </div>

    //   <div className=" w-11/12 mx-auto py-28 lg:w-9/12 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
    //    <div>
    //     <h1 className="text-2xl lg:text-5xl text-white mb-8 text-center font-bold lg:text-left"> Learn to code by watching others</h1>
    //     <p className="text-white text-center lg:text-left">
    // See how experienced developers solve problems in real-time. Watching scripted tutorials is great,
    // but understanding how developers think is invaluable. </p>
    // </div>
    // <div>
    //   <p className="p-11 bg-blue-600 text-white font-medium rounded-lg mb-7 "> Try it free 7 days then $20/mo. thereafter</p>
    //   <form onSubmit={handleSubmit(onSubmit)} className="bg-white flex flex-col  gap-6 p-6 rounded-lg" >
    //   <div className="relative">
    //   <input {...register("firstname", {required: "Firstname is required"})}

    //   className={`w-full outline-none border ${errors.firstname ? "border-red-500" : "border-gray-500"} rounded-lg py-3 px-3`}

    //   type="text" placeholder="firstname" />
    //     {errors.firstname && <img className="w-5 h-5 absolute -translate-y-8 right-5 " src={errorIcon} / >}
    //   </div>
    //     {errors.firstname && <p className="text-red-500 text-end">{errors.firstname.message}</p>}
    //     <input {...register("lastname", {required: "Lastname is required"})} className="border border-gray-500 rounded-lg py-3 px-3" type="text" placeholder="lastname" />

    //     <input {...register("email", {required: "Email is required"})} className="border border-gray-500 rounded-lg py-3 px-3" type="email" placeholder="email" />

    //     <input {...register("password", {required: "Password is required"})}  className="border border-gray-500 rounded-lg py-3 px-3" type="password" placeholder="password" />

    //     <button type="submit"  className="py-3 px-3 text-white bg-green-600 rounded-lg hover:bg-green-900">Claim your free trial </button>
    //     <p className="text-black text-center"> By clicking the button, you are agreeing to our <span className="text-red-500 font-semibold">
    //     Terms and Services
    //     </span>
    // </p>
    //   </form>
    // </div>

    //   </div>
  );
}

export default App;
