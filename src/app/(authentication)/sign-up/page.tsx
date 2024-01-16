"use client";
import React from "react";

import FormSelectField from "@/components/Forms/FormSelectField";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "@/components/Forms/InputField";
import { Button } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdAlternateEmail } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import Link from "next/link";

const SignUp = () => {
  // create schema for validation for name,email,password with proper error message

  const schema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  type ValidationSchemaType = z.infer<typeof schema>;

  const methods = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: { name: string; email: string; password: string }) =>
    console.log(data);
  return (
    <main>
      <section className="mx-auto my-10 max-w-xl rounded-xl  px-4 py-10 text-gray-700 shadow sm:px-8">
        {/* title */}
        <div className="text-center mb-[20px]">
          <h1 className="text-[20px] font-bold text-[#323B4B] ">
            Getting Started
          </h1>
          <p className="text-[14px] font-medium text-[#8A94A6]">
            Create an account to continue
          </p>
        </div>

        {/* google and apple sign-up button with logo */}
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <button className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg text-[14px] w-full justify-center text-primary hover:bg-transparent border border-transparent hover:border-secondary ">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.7141 10.4599H21.875V10.4167H12.5V14.5833H18.387C17.5281 17.0089 15.2203 18.75 12.5 18.75C9.04845 18.75 6.25001 15.9516 6.25001 12.5C6.25001 9.04843 9.04845 6.25 12.5 6.25C14.0932 6.25 15.5427 6.85104 16.6464 7.83281L19.5927 4.88645C17.7323 3.1526 15.2438 2.08333 12.5 2.08333C6.74741 2.08333 2.08334 6.74739 2.08334 12.5C2.08334 18.2526 6.74741 22.9167 12.5 22.9167C18.2526 22.9167 22.9167 18.2526 22.9167 12.5C22.9167 11.8016 22.8448 11.1198 22.7141 10.4599Z"
                fill="#FFC107"
              />
              <path
                d="M3.28436 7.65156L6.70676 10.1615C7.6328 7.86874 9.87551 6.24999 12.5 6.24999C14.0932 6.24999 15.5427 6.85104 16.6463 7.83281L19.5927 4.88645C17.7323 3.1526 15.2437 2.08333 12.5 2.08333C8.49895 2.08333 5.02915 4.34218 3.28436 7.65156Z"
                fill="#FF3D00"
              />
              <path
                d="M12.5 22.9167C15.1906 22.9167 17.6354 21.887 19.4839 20.2125L16.2599 17.4844C15.2141 18.2766 13.9141 18.75 12.5 18.75C9.79062 18.75 7.4901 17.0224 6.62344 14.6115L3.22656 17.2287C4.95052 20.6021 8.45156 22.9167 12.5 22.9167Z"
                fill="#4CAF50"
              />
              <path
                d="M22.7141 10.4599H21.875V10.4167H12.5V14.5833H18.387C17.9745 15.7484 17.225 16.7531 16.2583 17.4849L16.2599 17.4839L19.4839 20.212C19.2557 20.4193 22.9167 17.7083 22.9167 12.5C22.9167 11.8016 22.8448 11.1198 22.7141 10.4599Z"
                fill="#1976D2"
              />
            </svg>
            Sign Up with Google
          </button>
          <button className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-lg text-[14px] w-full justify-center text-primary hover:bg-transparent border border-transparent  hover:border-secondary ">
            <svg
              width="20"
              height="24"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6_21)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.256 3.89624C14.0196 2.88584 14.5985 1.45774 14.3891 0C13.141 0.088904 11.6822 0.907396 10.831 1.97424C10.055 2.9409 9.41729 4.37889 9.66636 5.77454C11.0308 5.81828 12.439 4.98002 13.256 3.89624ZM20 17.6086C19.454 18.8561 19.1912 19.4135 18.4878 20.5185C17.5066 22.0609 16.123 23.9815 14.4069 23.9956C12.8837 24.0125 12.491 22.9725 10.4231 22.9852C8.35532 22.9965 7.92424 24.0153 6.39835 23.9998C4.6836 23.9843 3.37257 22.2514 2.39135 20.709C-0.353892 16.3992 -0.642649 11.3402 1.0502 8.64908C2.25449 6.73835 4.15399 5.6207 5.93853 5.6207C7.75455 5.6207 8.89726 6.64804 10.4013 6.64804C11.8601 6.64804 12.7483 5.61789 14.8489 5.61789C16.4391 5.61789 18.1238 6.51115 19.3226 8.05215C15.3922 10.2733 16.0286 16.0606 20 17.6086Z"
                  fill="#C1C7D0"
                />
              </g>
              <defs>
                <clipPath id="clip0_6_21">
                  <rect width="20" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            Sign Up with Apple ID
          </button>
        </div>

        {/* or */}
        <div className="flex items-center justify-center my-5">
          <div className="w-full h-[1px] bg-[#E4E7EB]"></div>
          <p className="mx-3 text-[14px] font-medium text-[#8A94A6]">OR</p>
          <div className="w-full h-[1px] bg-[#E4E7EB]"></div>
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* email */}
          <InputField
            label="Email"
            errors={methods?.formState?.errors}
            name="email"
            register={methods?.register}
            placeholder="Your Email"
            required
            type="email"
            icon={MdAlternateEmail}
          />

          {/* name */}

          <InputField
            label="Name"
            errors={methods?.formState?.errors}
            name="name"
            register={methods?.register}
            placeholder="Your Name"
            required
            type="text"
            icon={CiFaceSmile}
          />

          {/* password */}

          <InputField
            label="Password"
            errors={methods?.formState?.errors}
            name="password"
            register={methods?.register}
            placeholder="Your Password"
            required
            type="password"
            icon={RiLockPasswordLine}
          />

          {/* checkout with I agree to the Terms & Conditions */}
          <div className="flex items-center gap-2 my-2">
            <input
              type="checkbox"
              className="w-4 h-4  rounded-lg transition-all duration-500 ease-in-out"
            />
            <p className="text-[12px] font-medium text-[#8A94A6]">
              I agree to the Terms & Conditions
            </p>
          </div>

          {/* Sign up Button */}

          <Button
            htmlType="submit"
            className="bg-[#377DFF] border border-transparent hover:border-[#377DFF] hover:bg-transparent hover:text-[#377DFF] text-white rounded-lg w-full my-[20px] text-[14px] font-medium transition-all duration-500 ease-in-out  "
          >
            Sign Up
          </Button>
        </form>

        {/* form */}

        {/* 
        already have an account? Sign in 
        */}

        <p className="text-center text-[12px] font-medium text-primary">
          Already have an account?{" "}
          <Link href={"/register"} className="text-[#377DFF] cursor-pointer hover:underline  transition-all duration-500 ease-in-out">
            Sign In
          </Link>
        </p>
      </section>
    </main>
  );
};

export default SignUp;
