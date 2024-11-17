"use client";

import AuthInput from "@/components/AuthInput";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
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

  // Function to copy credentials to input fields
  const handleCopyCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex items-center justify-center min-h-screen bg-white px-4"
      >
        <motion.div
          className="w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Display error message */}
          {error && (
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="error text-red-500"
            >
              {error}
            </motion.span>
          )}
          <h2 className="lg:text-4xl text-2xl font-semibold text-[#2f2b43] mb-2">
            {t("login")}
          </h2>
          <span className="text-gray-500 mb-5">{t("loginAndStart")}</span>

          {/* Login Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
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
              placeholder="***********"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />

            {/* Submit Button */}
            {/* <Button children={t("login")} disabled={status === "loading"} /> */}
            <Button
              loading={status === "loading"}
              disabled={status === "loading"}
            >
              {t("login")}
            </Button>
          </motion.form>

          {/* Forgot Password Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 text-md text-gray-500"
          >
            <a href="#" className="text-[#2f2b43] hover:underline">
              {t("forgotPassword")}
            </a>
          </motion.div>

          {/* Demo Users */}
          <LoginDemoUsers
            demoUsers={demoUsers}
            handleCopyCredentials={handleCopyCredentials}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

// Demo login credentials
const demoUsers = [
  {
    email: "johndoe@example.com",
    password: "pass123",
  },
  {
    email: "ibrahim@gmail.com",
    password: "pass123",
  },
  {
    email: "sifat@gmail.com",
    password: "pass123",
  },
  {
    email: "ibsifat@gmail.com",
    password: "pass123",
  },
  {
    email: "ibsifa00t@gmail.com",
    password: "pass123",
  },
  {
    email: "ibsifa900t@gmail.com",
    password: "pass123",
  },
];

const LoginDemoUsers = ({ handleCopyCredentials }) => {
  const t = useTranslations("login");

  return (
    <motion.div
      className="space-y-2 mb-4 mt-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <h3 className="text-lg font-semibold">{t("demoUsers")}</h3>
      {demoUsers.map((user, index) => (
        <motion.div
          key={index}
          className="flex justify-between items-center border p-2 rounded bg-gray-100"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <span className="text-sm text-gray-600">
            {user.email} / {user.password}
          </span>
          <button
            onClick={() => handleCopyCredentials(user.email, user.password)}
            className="text-xs text-blue-500 underline hover:text-blue-700"
          >
            {t("copyCredentials")}
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
};

function Button({ children, loading, disabled, ...props }) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`w-full bg-[#2f2b43] text-white py-2 px-4 rounded focus:outline-none focus:ring ${
        disabled || loading
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-[#393451]"
      }`}
    >
      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center"
        >
          <svg
            className="w-5 h-5 mr-2 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </motion.div>
      ) : (
        children
      )}
    </button>
  );
}
