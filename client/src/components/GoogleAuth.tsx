import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

// google auth
const GoogleAuth = () => {
  const auth = getAuth(app);

  const handleGoogleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const responseFromGoogle = await signInWithPopup(auth, provider);
    const res = await fetch("http://localhost:5000/api/users/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: responseFromGoogle.user.displayName,
        email: responseFromGoogle.user.email,
      }),
      credentials: "include",
    });

    if (res.ok) {
      alert("Login successful!");
    }
    alert("login failed");
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-5 w-full"
      onClick={handleGoogleAuth}
    >
      <button className="flex items-center justify-center gap-3 border border-gray-300 w-full py-2 rounded-full">
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          className="w-4 h-4"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
