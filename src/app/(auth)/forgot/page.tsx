import type { Metadata } from "next";
import AuthCard from "@/components/auth/auth-card";
import ForgotForm from "@/components/auth/forgot-form";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPage() {
  return (
    <AuthCard
      title="Forgot Password"
      subtitle="Enter your account email and we will send you a reset link."
    >
      <ForgotForm />
    </AuthCard>
  );
}
