"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Edit2 } from "lucide-react";
import { sendOtp, signIn } from "@/lib/api";
import Cookies from "js-cookie";

type Step = "PHONE" | "OTP" | "NAME";

export default function AuthFlow() {
  const [step, setStep] = useState<Step>("PHONE");
  const [phone, setPhone] = useState("");
  const [secretCode, setSecretCode] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const router = useRouter();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) return setError("Please enter a valid phone number");
    setLoading(true);
    setError("");

    try {
      setStep("NAME");
      const res = await sendOtp({ phone_number: phone });
      if (res.user && res.token?.access) {
        Cookies.set("auth_token", res.token.access, { expires: 365 });
        localStorage.setItem("auth_token", res.token.access);
      }
      setSecretCode(res.otp);
      setStep("OTP");
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.message ?? "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 4) return setError("Please enter complete OTP");

    if (fullOtp === secretCode) {
      setStep("NAME");
    } else {
      setError("Invalid OTP");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return setError("Name is required");

    setLoading(true);
    try {
      const res = await signIn({
        phone_number: phone,
        name,
        unique_id: new Date().toISOString(),
      });

      const token = res.token.access;

      const user = {
        _id: res.user_id,
        user_id: res.user_id,
        name,
        phone_number: phone,
      };

      login(token, user);
      router.push("/products");
    } catch (err) {
      console.error(err);
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white w-full h-full">
      {step === "PHONE" && (
        <form onSubmit={handlePhoneSubmit} className="space-y-6">
          <h1 className="text-3xl font-bold text-center mb-8">Log In</h1>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone"
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-lg p-4 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-bold py-4 rounded-full hover:bg-gray-200 transition-all active:scale-95"
          >
            Continue
          </button>
        </form>
      )}

      {step === "OTP" && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right duration-300">
          <h1 className="text-3xl font-bold text-center mb-4">Verify phone</h1>
          <p className="text-center text-gray-400 text-sm mb-8">
            Enter the OTP sent to {phone}
            <button
              onClick={() => setStep("PHONE")}
              className="ml-2 inline-block"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </p>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Enter OTP</label>
            <div className="flex justify-between gap-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-16 h-16 bg-[#1A1A1A] border border-gray-800 rounded-xl text-center text-2xl font-bold text-white focus:outline-none focus:border-white transition-colors"
                />
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500 mt-2">
            Resend OTP in <span className="text-white font-bold">34s</span>
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-full mt-8 hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      )}

      {step === "NAME" && (
        <form
          onSubmit={handleRegister}
          className="space-y-6 animate-in fade-in slide-in-from-right duration-300"
        >
          <h1 className="text-3xl font-bold text-center mb-8">
            Welcome, You are?
          </h1>

          <div className="space-y-2">
            <label className="text-sm text-gray-400">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Eg: John Matthew"
              className="w-full bg-[#1A1A1A] border border-gray-800 rounded-lg p-4 text-white focus:outline-none focus:border-white transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-full hover:bg-gray-200 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Continue"}
          </button>
        </form>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-800 text-red-200 rounded-lg text-sm text-center">
          {error}
        </div>
      )}
    </div>
  );
}
