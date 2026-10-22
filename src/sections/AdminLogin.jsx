import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";

/**
 * Reusable Password Field with built-in Show/Hide toggle.
 */
function PasswordInput({
  label = "Password",
  name = "password",
  placeholder = "Enter your password",
  value,
  onChange,
  show,
  onToggleShow,
  autoComplete = "current-password",
  required = true,
}) {
  return (
    <label>
      {label}
      <div style={{ position: "relative" }}>
        <input
          autoComplete={autoComplete}
          name={name}
          required={required}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ width: "100%", paddingRight: "44px" }}
        />
        <button
          type="button"
          onClick={onToggleShow}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#64748b",
            fontSize: "11px",
            fontWeight: 600,
          }}
        >
          {show ? "HIDE" : "SHOW"}
        </button>
      </div>
    </label>
  );
}

/**
 * Reusable New Password & Confirm Password input pair.
 */
function NewPasswordInputs({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  show,
  onToggleShow,
}) {
  return (
    <>
      <PasswordInput
        label="New Password"
        name="newPassword"
        placeholder="At least 8 characters"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        show={show}
        onToggleShow={onToggleShow}
        autoComplete="new-password"
      />
      <label>
        Confirm New Password
        <input
          type={show ? "text" : "password"}
          name="confirmPassword"
          required
          placeholder="Re-enter new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />
      </label>
    </>
  );
}

export default function AdminLogin({ initialMode }) {
  const [authMode, setAuthMode] = useState(initialMode || "password"); // 'password' | 'magic-link' | 'forgot-password' | 'set-new-password'
  const [forgotStep, setForgotStep] = useState("request"); // 'request' | 'verify'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle URL detection for recovery redirects (e.g. email link clicks)
  useEffect(() => {
    const isRecovery =
      window.location.hash.includes("type=recovery") ||
      window.location.search.includes("type=recovery") ||
      location.pathname.includes("reset-password");

    if (isRecovery) {
      setAuthMode("set-new-password");
      setMessage("Email verified! Please enter your new password below.");
      return;
    }

    // If already logged in normally, redirect to dashboard
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !isRecovery && authMode !== "set-new-password") {
        navigate("/admin", { replace: true });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setAuthMode("set-new-password");
        setMessage("Email verified! Please choose your new password.");
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate, location, authMode]);

  // Resend cooldown countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const getNormalizedEmail = (inputEmail) => {
    const trimmed = (inputEmail || email).trim();
    if (!trimmed) return "";
    return trimmed.includes("@") ? trimmed : `${trimmed}@etcforum.com`;
  };

  const validatePasswordMatch = (pwd, confirmPwd) => {
    if (pwd.length < 8) {
      return "New password must be at least 8 characters long.";
    }
    if (pwd !== confirmPwd) {
      return "New password and confirm password do not match.";
    }
    return null;
  };

  const handlePasswordSuccess = () => {
    setMessage("Password successfully changed! Redirecting to dashboard…");
    setTimeout(() => {
      navigate("/admin", { replace: true });
    }, 1500);
  };

  const handleBackToSignIn = () => {
    setAuthMode("password");
    setError("");
    setMessage("");
  };

  // 1. Password or Magic Link Login
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const normalizedEmail = getNormalizedEmail(email);
    if (!normalizedEmail) {
      setError("Please enter your email or username.");
      setSubmitting(false);
      return;
    }

    try {
      if (authMode === "password") {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: normalizedEmail,
          password,
        });

        if (signInError) throw signInError;

        if (data.user) {
          navigate("/admin", { replace: true });
        }
      } else if (authMode === "magic-link") {
        const { error: otpError } = await supabase.auth.signInWithOtp({
          email: normalizedEmail,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          },
        });

        if (otpError) throw otpError;

        setMessage(
          `A secure single-use login link has been sent to ${normalizedEmail}. Please check your inbox or Gmail!`
        );
      }
    } catch (err) {
      setError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  // 2. Request Password Reset (Sends Email / Verification code)
  const handleSendResetEmail = async (event) => {
    if (event) event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const normalizedEmail = getNormalizedEmail(email);
    if (!normalizedEmail) {
      setError("Please enter your email address.");
      setSubmitting(false);
      return;
    }

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/admin/reset-password`,
      });

      if (resetError) throw resetError;

      setForgotStep("verify");
      setResendCooldown(60);
      setMessage(
        `Verification email sent to ${normalizedEmail}! Enter the code below or click the reset link in your email.`
      );
    } catch (err) {
      setError(err.message || "Could not send verification email. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Verify OTP Code and Change Password
  const handleVerifyOtpAndChangePassword = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const normalizedEmail = getNormalizedEmail(email);

    if (!otpCode.trim()) {
      setError("Please enter the verification code sent to your email.");
      setSubmitting(false);
      return;
    }

    const validationError = validatePasswordMatch(newPassword, confirmPassword);
    if (validationError) {
      setError(validationError);
      setSubmitting(false);
      return;
    }

    try {
      const { error: otpError } = await supabase.auth.verifyOtp({
        email: normalizedEmail,
        token: otpCode.trim(),
        type: "recovery",
      });

      if (otpError) throw otpError;

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      handlePasswordSuccess();
    } catch (err) {
      setError(err.message || "Invalid or expired verification code. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // 4. Update Password (from direct email link redirect)
  const handleSetNewPasswordDirect = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    const validationError = validatePasswordMatch(newPassword, confirmPassword);
    if (validationError) {
      setError(validationError);
      setSubmitting(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) throw updateError;

      handlePasswordSuccess();
    } catch (err) {
      setError(
        err.message ||
          "Session expired or invalid. Please request a new password reset email."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-login-page">
      <section className="admin-login-panel">
        <Link className="admin-back-link" to="/" aria-label="Return to FEETA website">
          ← Back to the website
        </Link>

        <div className="admin-mark">
          <img src="/forumlogo.png" alt="ETC Department logo" />
        </div>

        {/* Dynamic Headers based on authMode */}
        {authMode === "set-new-password" ? (
          <>
            <p className="admin-kicker">Account Security</p>
            <h1>Set New Password</h1>
            <p className="admin-description">
              Your email has been verified. Choose a secure new password of at least 8 characters.
            </p>
          </>
        ) : authMode === "forgot-password" ? (
          <>
            <p className="admin-kicker">Password Recovery</p>
            <h1>Forgot Password</h1>
            <p className="admin-description">
              {forgotStep === "request"
                ? "Enter your verified administrator email or username. We will send a verification code and reset link to your email."
                : "Enter the verification code sent to your email and your new password."}
            </p>
          </>
        ) : (
          <>
            <p className="admin-kicker">ETC Forum Portal</p>
            <h1>Sign In</h1>
            <p className="admin-description">
              Connected to production Supabase cloud database with encrypted session tokens and Row Level Security.
            </p>
          </>
        )}

        {/* Mode Selector (Login vs Magic Link) */}
        {(authMode === "password" || authMode === "magic-link") && (
          <div
            style={{
              display: "flex",
              gap: "8px",
              margin: "16px 0",
              background: "rgba(0,0,0,0.04)",
              padding: "4px",
              borderRadius: "10px",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setAuthMode("password");
                setError("");
                setMessage("");
              }}
              style={{
                flex: 1,
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                background: authMode === "password" ? "#fff" : "transparent",
                color: authMode === "password" ? "#0f172a" : "#64748b",
                boxShadow: authMode === "password" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode("magic-link");
                setError("");
                setMessage("");
              }}
              style={{
                flex: 1,
                padding: "8px 14px",
                borderRadius: "8px",
                border: "none",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                background: authMode === "magic-link" ? "#fff" : "transparent",
                color: authMode === "magic-link" ? "#0f172a" : "#64748b",
                boxShadow: authMode === "magic-link" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              Magic Link
            </button>
          </div>
        )}

        {/* Alerts / Error & Message */}
        {error && (
          <p className="admin-error" role="alert" style={{ marginTop: "12px" }}>
            {error}
          </p>
        )}
        {message && (
          <p
            style={{
              color: "#059669",
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              margin: "12px 0",
              lineHeight: 1.5,
            }}
          >
            {message}
          </p>
        )}

        {/* -------------------- FORM 1: Password / Magic Link Login -------------------- */}
        {(authMode === "password" || authMode === "magic-link") && (
          <form className="admin-form" onSubmit={handleLoginSubmit}>
            <label>
              Email / Username
              <input
                type="text"
                autoComplete="username"
                name="email"
                required
                placeholder="Enter Email / Username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            {authMode === "password" && (
              <div>
                <PasswordInput
                  label="Password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  show={showPassword}
                  onToggleShow={() => setShowPassword((prev) => !prev)}
                  autoComplete="current-password"
                />

                {/* Forgot Password Link */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "6px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("forgot-password");
                      setForgotStep("request");
                      setError("");
                      setMessage("");
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#1c684d",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      padding: 0,
                      textDecoration: "underline",
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>
            )}

            <button className="admin-button admin-button-wide" type="submit" disabled={submitting}>
              {submitting
                ? "Verifying with Supabase…"
                : authMode === "password"
                  ? "Sign In with Password"
                  : "Send Magic Link"}
            </button>
          </form>
        )}

        {/* -------------------- FORM 2: Forgot Password - Step 1: Request Email -------------------- */}
        {authMode === "forgot-password" && forgotStep === "request" && (
          <form className="admin-form" onSubmit={handleSendResetEmail}>
            <label>
              Registered Email / Username
              <input
                type="text"
                autoComplete="email"
                name="email"
                required
                placeholder="Enter Email / Username (e.g. Gmail)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <button className="admin-button admin-button-wide" type="submit" disabled={submitting}>
              {submitting ? "Sending Verification Email…" : "Send Verification Email / Code"}
            </button>

            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button
                type="button"
                onClick={handleBackToSignIn}
                style={{
                  background: "none",
                  border: "none",
                  color: "#64748b",
                  fontSize: "13px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* -------------------- FORM 3: Forgot Password - Step 2: Verify Code & Change Password -------------------- */}
        {authMode === "forgot-password" && forgotStep === "verify" && (
          <form className="admin-form" onSubmit={handleVerifyOtpAndChangePassword}>
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                padding: "10px 12px",
                fontSize: "12px",
                color: "#475569",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>
                Sent to: <strong>{getNormalizedEmail(email)}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setForgotStep("request");
                  setError("");
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#1c684d",
                  fontSize: "11px",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Change
              </button>
            </div>

            <label>
              Verification Code (from email)
              <input
                type="text"
                name="otpCode"
                required
                placeholder="Enter 6-digit code or token"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                maxLength={10}
                style={{ letterSpacing: "1px", fontWeight: 600 }}
              />
            </label>

            <NewPasswordInputs
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              show={showNewPassword}
              onToggleShow={() => setShowNewPassword((prev) => !prev)}
            />

            <button className="admin-button admin-button-wide" type="submit" disabled={submitting}>
              {submitting ? "Verifying & Updating…" : "Verify Code & Change Password"}
            </button>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "10px",
                fontSize: "12px",
              }}
            >
              <button
                type="button"
                disabled={resendCooldown > 0 || submitting}
                onClick={handleSendResetEmail}
                style={{
                  background: "none",
                  border: "none",
                  color: resendCooldown > 0 ? "#94a3b8" : "#1c684d",
                  fontWeight: 600,
                  cursor: resendCooldown > 0 ? "default" : "pointer",
                  padding: 0,
                }}
              >
                {resendCooldown > 0 ? `Resend code in ${resendCooldown}s` : "Resend code"}
              </button>

              <button
                type="button"
                onClick={handleBackToSignIn}
                style={{
                  background: "none",
                  border: "none",
                  color: "#64748b",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* -------------------- FORM 4: Set New Password Direct (from Email Link) -------------------- */}
        {authMode === "set-new-password" && (
          <form className="admin-form" onSubmit={handleSetNewPasswordDirect}>
            <NewPasswordInputs
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              show={showNewPassword}
              onToggleShow={() => setShowNewPassword((prev) => !prev)}
            />

            <button className="admin-button admin-button-wide" type="submit" disabled={submitting}>
              {submitting ? "Updating Password…" : "Update Password & Sign In"}
            </button>

            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button
                type="button"
                onClick={handleBackToSignIn}
                style={{
                  background: "none",
                  border: "none",
                  color: "#64748b",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
