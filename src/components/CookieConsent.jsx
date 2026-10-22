import { useState } from "react";

function getConsent() {
  return document.cookie.split("; ").some((entry) => entry.startsWith("feeta_cookie_consent="));
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(() => !getConsent());

  const choose = (choice) => {
    document.cookie = `feeta_cookie_consent=${choice}; Max-Age=31536000; Path=/; SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;
  return (
    <aside className="cookie-banner" aria-label="Cookie preferences">
      <div>
        <p className="cookie-eyebrow">Your privacy</p>
        <h2>Cookies, kept simple.</h2>
        <p>This site uses essential storage for preferences and sign-in. No advertising or analytics cookies are set.</p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="admin-button admin-button-muted" onClick={() => choose("essential")}>
          Essential only
        </button>
        <button type="button" className="admin-button" onClick={() => choose("all")}>
          Allow all
        </button>
      </div>
    </aside>
  );
}
