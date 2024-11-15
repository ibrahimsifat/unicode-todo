"use client";

import AuthInput from "@/components/AuthInput";
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";
import UsePage from "./UsePage";

export default function Home() {
  const t = useTranslations("login");

  // Use the custom hook
  const {
    email,
    password,
    error,
    setEmail,
    setPassword,
    handleSubmit,
    status,
  } = UsePage();

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-white px-4">
        <div className="w-full max-w-md">
          {/* Display error message */}
          {error && <span className="error text-red-500">{error}</span>}
          <h2 className="lg:text-4xl text-2xl font-semibold text-[#2f2b43] mb-2">
            {t("login")}
          </h2>
          <span className="text-gray-500 mb-5">{t("loginAndStart")}</span>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Email Input */}
            <AuthInput
              label={t("email")}
              placeholder="cameron@gmail.com"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Input */}
            <AuthInput
              id="password"
              label={t("password")}
              placeholder="****************"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            {/* Submit Button */}
            <Button children={t("login")} disabled={status === "loading"} />
            {status === "loading" && <span>Loading...</span>}
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-md text-gray-500">
            <a href="#" className="text-[#2f2b43] hover:underline">
              {t("forgotPassword")}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
