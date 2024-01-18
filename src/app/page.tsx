import { isLoggedIn } from "@/helpers/auth.service";

export default function Home() {
  const userLoggedIn = isLoggedIn();

  // const router = useRouter();

  // if (userLoggedIn && typeof window !== "undefined") {
  //   return router.push("/dashboard");
  // } else if (!userLoggedIn) {
  //   return router.push("/sign-in");
  // }

  return <main>Home</main>;
}
