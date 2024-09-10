import React, { useState } from "react";
import CustomInput from "../components/CustomInput";
import { Link } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

function SignIn() {
  // Variables

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => console.log(data)

  return (
    <div className="SignIn px-8 text-left">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="SignIn_form flex flex-col items-center w-full gap-4"
      >
        {/* IMAGE */}
        <img src="/assets/logo192.png" alt="logo" className="h-80 pointer-events-none" />

        <div className="grid gap-4 py-4 w-full max-w-80 -mt-10">
          {/* New Property Form */}
          <div className="flex flex-col gap-4">
            <Label htmlFor="username" className="text-left">
              Username
            </Label>
            <Input
              id="title"
              placeholder="Type your email address"
              className=""
              {...register("email", { required: true })}
            />
            {errors.email && <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">* This field is required</span>}
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="password" className="text-left">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Type your password"
              className=""
              {...register("password", { required: true })}
            />
             {errors.password && <span className="text-sm text-red-700 animate-in slide-in-from-top-1 duration-500">* This field is required</span>}
          </div>
          <Button
            type="submit"       
          >
            Sign In
          </Button>
          <p className="text-gray-500 text-center">
            Don't have an account?
            <Link
              to="/signup"
              className="text-gray-900 font-semibold underline"
            >
              {" "}
              Sign Up
            </Link>
          </p>
          <p className="text-red-500 text-center text-sm underline">
            forgot password
                      </p>
        </div>

        {/* Submit Button */}
      </form>
    </div>
  );
}

export default SignIn;
