"use client"
import { signup } from '@/actions/auth-actions';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormState } from 'react-dom';

export default function AuthForm({ mode }) {
  const router = useRouter();

  async function loginAction(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      return {
        error: "Please enter valid email and password"
      };
    }
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    if (result?.error) {
      return {
        error: "Could not authenticate user, please check your credentials."
      };
    }
    router.push("/training");
    router.refresh();
    return {};
  }

  const activeAction = mode === "login" ? loginAction : signup;
  const [formState, formAction] = useFormState(activeAction, {});

  return (
    <form action={formAction} id="auth-form">
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </p>
      {formState?.error && <p id="form-errors">{formState.error}</p>}
      <p>
        <button>
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>
      <p>
        {mode === "login" && <Link href="/login?mode=signup">Create an account.</Link>}
        {mode === "signup" && <Link href="/login?mode=login">Login with existing account.</Link>}
      </p>
    </form>
  );
}

