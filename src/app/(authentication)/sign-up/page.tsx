"use client";
import React from "react";

import { useForm } from "react-hook-form";
import InputField from "@/components/Forms/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdAlternateEmail } from "react-icons/md";
import { CiFaceSmile } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import AuthenticationForm from "@/components/Forms/AuthenticationForm";
import { FaRegFaceGrin } from "react-icons/fa6";
import { useRegisterMutation } from "@/redux/features/auth/auth";
import { useRouter } from "next/navigation";
import { message } from "antd";

const SignUp = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  // create schema for validation for name,email,password with proper error message

  const schema = z.object({
    firstName: z
      .string()
      .min(3, { message: "First Name must be at least 3 characters" }),
    lastName: z
      .string()
      .min(3, { message: "Last Name must be at least 3 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  type ValidationSchemaType = z.infer<typeof schema>;

  const methods = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await register(data).unwrap();
      if (res?.success) {
        await router.push("/sign-in");
        await message.success("Registration success.Please Login");
        methods.reset();
      }
    } catch (error: any) {
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }
  };
  return (
    <main>
      <AuthenticationForm
        methods={methods}
        onSubmit={onSubmit}
        title="Getting Started"
        description="Create an account to continue"
        buttonTitle="Sign Up"
        isTerms={true}
        loading={isLoading}
      >
        {/* name */}

        <InputField
          label="First Name"
          errors={methods?.formState?.errors}
          name="firstName"
          register={methods?.register}
          placeholder="Your First Name"
          required
          type="text"
          icon={CiFaceSmile}
        />

        {/* last name */}
        <InputField
          label="Last Name"
          errors={methods?.formState?.errors}
          name="lastName"
          register={methods?.register}
          placeholder="Your Last Name"
          required
          type="text"
          icon={FaRegFaceGrin}
        />

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
      </AuthenticationForm>

      {/* form */}
    </main>
  );
};

export default SignUp;
