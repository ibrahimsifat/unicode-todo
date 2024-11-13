"use client";
import AuthInput from "@/components/AuthInput";
import Button from "@/components/Button";

import DashboardSkeleton from "@/components/DashboardSkeleton";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect to dashboard if the user is already logged in
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/dashboard"); // Redirect to dashboard after successful login
    }
  };

  // Show loading or redirecting message if the user is already authenticated
  if (status === "authenticated") {
    return <DashboardSkeleton />;
  }
  return (
    // <!-- Login Page -->
    <div class="flex items-center justify-center min-h-screen bg-white px-4">
      <div class="w-full max-w-md">
        {/* <!-- Header Text --> */}
        <h2 class="lg:text-4xl text-2xl font-semibold text-[#2f2b43] mb-2">
          Log in
        </h2>
        <p class="text-gray-500 mb-5">Log in and start using app</p>

        {/* <!-- Login Form --> */}
        <form class="space-y-6">
          {/* <!-- Email Input Group --> */}

          <AuthInput
            id="email"
            label="Email"
            placeholder="cameron@gmail.com"
            required
            type="email"
          />
          {/* <!-- Password Input Group --> */}

          <AuthInput
            id="password"
            label="Password"
            placeholder="****************"
            required
            type="password"
          />
          {/* <!-- Submit Button --> */}
          <Button children={"Log in"} />
        </form>

        {/* <!-- Forgot Password Link --> */}
        <p class="mt-4  text-md text-gray-500">
          <a href="#" class="text-[#2f2b43] hover:underline">
            Forgot your password?
          </a>
        </p>
      </div>
    </div>
  );
}
