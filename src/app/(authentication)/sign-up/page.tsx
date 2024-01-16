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
import AuthenticationForm from "@/components/Forms/AuthenticationForm";

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
      
      <AuthenticationForm
        methods={methods}
        onSubmit={onSubmit}
        title="Getting Started"
        description="Create an account to continue"
        buttonTitle="Sign Up"
      >
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
      </AuthenticationForm>

      {/* form */}
    </main>
  );
};

export default SignUp;
