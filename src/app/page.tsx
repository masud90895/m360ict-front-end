"use client";

import { isLoggedIn } from "@/helpers/auth.service";
import { useRouter } from "next/navigation";

export default function Home() {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  if (userLoggedIn || typeof window === "undefined") {
    router.push("/dashboard");
  } else {
    router.push("/sign-in");
  }

  return <main>Home</main>;
}
