import type { Metadata } from "next";
import AuthCard from "@/components/auth/auth-card";
import RegisterForm from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Join the Arena"
      subtitle="Create your account, claim the rookie mercenary bundle, and start climbing."
    >
      <RegisterForm />
    </AuthCard>
  );
}
