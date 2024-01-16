"use client"
import AuthenticationForm from '@/components/Forms/AuthenticationForm';
import InputField from '@/components/Forms/InputField';
import React from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const SignUp = () => {
  // create schema for validation for name,email,password with proper error message

  const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
  });

  type ValidationSchemaType = z.infer<typeof schema>;

  const methods = useForm<ValidationSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: { email: string; password: string }) =>
    console.log(data);






  return (
    <AuthenticationForm
      methods={methods}
      onSubmit={onSubmit}
      title="Sign In"
      description="Welcome back, you’ve been missed!"
      buttonTitle="Sign In"
      isTerms={false}
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