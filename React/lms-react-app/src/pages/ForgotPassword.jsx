import React, { useState } from "react";
import ToastMsg from "../components/ToastMsg.jsx";

export default function ForgotPassword() {
  // This flow is UI simulation only:
  // Step1: Email, Step2: OTP, Step3: Change Password

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("danger");

  const generateOtp = () => {
    return String(Math.floor(100000 + Math.random() * 900000));
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setType("danger");
      setMsg("Email is required.");
      return;
    }
    const otpNow = generateOtp();
    setGeneratedOtp(otpNow);
    setType("success");
    setMsg(`OTP sent successfully! (Demo OTP: ${otpNow})`);
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.trim() !== generatedOtp) {
      setType("danger");
      setMsg("Invalid OTP.");
      return;
    }
    setType("success");
    setMsg("OTP verified successfully. Please set new password.");
    setStep(3);
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    if (!newPass || !confirmPass) {
      setType("danger");
      setMsg("Both fields are required.");
      return;
    }
    if (newPass !== confirmPass) {
      setType("danger");
      setMsg("Passwords do not match.");
      return;
    }
    setType("success");
    setMsg("Password changed successfully (demo). You may login now.");
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="fw-bold mb-3">Forgot Password</h3>

              {step === 1 && (
                <form onSubmit={handleEmailSubmit}>
                  <label className="form-label">Enter Email</label>
                  <input
                    className="form-control mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                  />
                  <button className="btn btn-primary w-100">Send OTP</button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handleOtpSubmit}>
                  <label className="form-label">Enter OTP</label>
                  <input
                    className="form-control mb-3"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="6-digit OTP"
                  />
                  <button className="btn btn-success w-100">Verify OTP</button>
                </form>
              )}

              {step === 3 && (
                <form onSubmit={handleChangePass}>
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-control mb-3"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />

                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control mb-3"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />

                  <button className="btn btn-dark w-100">
                    Change Password
                  </button>
                </form>
              )}

              <ToastMsg type={type} message={msg} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
