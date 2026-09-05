import type { Metadata } from "next";
import AuthCard from "@/components/auth/auth-card";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome Back, Mercenary"
      subtitle="Sign in to jump back into the arena — your ladder position is waiting."
    >
      <LoginForm />
    </AuthCard>
  );
}
