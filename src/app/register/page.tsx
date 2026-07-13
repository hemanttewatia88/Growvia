import type { Metadata } from "next";
import { RegisterForm } from "@/app/register/RegisterForm";

export const metadata: Metadata = {
  title: "Create an Account",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
