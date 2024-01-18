"use client";
import React from "react";
import Logo from "../Logo/Logo";
import FormSelectField from "@/components/Forms/FormSelectField";
import { FormProvider, useForm } from "react-hook-form";
import { isLoggedIn } from "@/helpers/auth.service";
import Link from "next/link";

const NavbarData = [
  {
    label: "English-(UK)",
    value: "English-(UK)",
  },
  {
    label: "Bangla-(BD)",
    value: "Bangla-(BD)",
  },
];

const Navbar = () => {
  const isUserLogin = isLoggedIn();

  const methods = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <main className="commonNavbar flex items-center justify-between border-b">
      {/* Logo */}
      <Logo />

      {isUserLogin && (
        <Link href="/dashboard">
          <span className="text-primary font-semibold">Dashboard</span>
        </Link>
      )}

      {/* dashboard redirect button */}

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormSelectField
            name="select"
            options={NavbarData}
            defaultValue={NavbarData[0]}
            size="large"
          />
        </form>
      </FormProvider>
    </main>
  );
};

export default Navbar;
