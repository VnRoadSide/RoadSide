import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Signup from "./signup";

export const metadata = {
    title: "Sign Up",
    description: "Signup Page",
  };
  
  export default async function SignupPage() {
    const session = await auth();
  
    if (session) redirect("/");
  
    return <Signup />;
  }