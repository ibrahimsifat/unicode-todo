"use client";
import AuthInput from "@/components/AuthInput";
import Button from "@/components/Button";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const t = useTranslations("index");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect authenticated users to the dashboard if they access the login page
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  // handle submit
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

  return (
    // <!-- Login Page -->
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md">
        {/* <!-- Header Text --> */}
        <span className="error">{error}</span>
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
        <h2 className="lg:text-4xl text-2xl font-semibold text-[#2f2b43] mb-2">
          Log in
        </h2>
        <sp className="text-gray-500 mb-5">Log in and start using app</sp>
        {/* <!-- Login Form --> */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <!-- Email Input Group --> */}

          <AuthInput
            label="Email"
            placeholder="cameron@gmail.com"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* <!-- Password Input Group --> */}

          <AuthInput
            id="password"
            label="Password"
            placeholder="****************"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          {/* <!-- Submit Button --> */}
          <Button children={"Log in"} />
        </form>
        {/* <!-- Forgot Password Link --> */}
        <div className="mt-4  text-md text-gray-500">
          <a href="#" className="text-[#2f2b43] hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
}
