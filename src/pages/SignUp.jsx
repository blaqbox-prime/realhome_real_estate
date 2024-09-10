import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { useForm } from "react-hook-form"



function SignUp() {
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
    } = useForm()
  // Variables



  // functions
  function handleSignIn(data) {
    console.log(data)

  }

  return (
    <div className="SignUp p-8">
      <form
        action=""
        className="SignUp_form flex flex-col items-center w-full gap-4"
      >
        {/* IMAGE */}
        <img src="/assets/logo.png" alt="logo" className="h-80" />
        <h1 className="text-3xl font-bold">Create new account</h1>
        {/* Username */}
        <CustomInput
          title="Username"
          placeholder={"Enter username"}
          required={true}
          error={errors.username}
          reactForm={{...register("username", {required: true})}}
        />
        {errors.username && <p className="text-red-500 text-sm">This is required</p>}
        {/* Password */}
        <CustomInput
          title="Password"
          placeholder={"Enter password"}
          isPassword
          required
          error={errors.password}
        />

        {/* Submit Button */}
        <button
          onClick={handleSignIn}
          className="bg-black text-white w-80 p-2 mt-4 rounded-lg"
        >
          Sign In
        </button>
        <p className="text-gray-500">Don't have an account? 
          <a href="#" className="text-black font-semibold underline">Sign Up</a>
        </p>

        {/* Already have an account */}
      </form>
    </div>
  );
}

export default SignUp;
