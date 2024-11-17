import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UsePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { locale = "en" } = router;

  // Redirect authenticated users to the dashboard if they access the login page
  useEffect(() => {
    if (status === "authenticated") {
      router.push(`/${locale}/dashboard`);
    }
  }, [status, locale, router]);

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error); // Set error if login fails
    } else {
      router.push(`/${locale}/dashboard`);
    }
  };

  return {
    session,
    status,
    email,
    password,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  };
};

export default UsePage;
