"use client";
import AuthenticationForm from "@/components/Forms/AuthenticationForm";
import InputField from "@/components/Forms/InputField";
import React from "react";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginMutation } from "@/redux/features/auth/auth";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/helpers/auth.service";
import { message } from "antd";

const SignUp = () => {
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  // create schema for validation for name,email,password with proper error message

  const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });

  type ValidationSchemaType = z.infer<typeof schema>;

  const methods = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const res = await login(data).unwrap();

      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/dashboard");
        message.success("User logged in successfully!");
      }
    } catch (error: any) {
      console.error(error?.data?.message);
      message.error(error?.data?.message);
    }
  };
  return (
    <AuthenticationForm
      methods={methods}
      onSubmit={onSubmit}
      title="Sign In"
      description="Welcome back, you’ve been missed!"
      buttonTitle="Sign In"
      isTerms={false}
      loading={isLoading}
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
  );
};

export default SignUp;
