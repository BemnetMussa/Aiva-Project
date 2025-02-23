import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginFailed, loginSuccess } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

// google auth
const GoogleAuth = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);

  const handleGoogleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    const responseFromGoogle = await signInWithPopup(auth, provider);
    if (responseFromGoogle) {
      navigator("http://localhost:5173/");
    }

    const firebaseToken = await responseFromGoogle.user.getIdToken(); //firebase token

    const response = await fetch("http://localhost:5000/api/users/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${firebaseToken}`, // 🔹 Send Firebase Token
      },
      body: JSON.stringify({
        name: responseFromGoogle.user.displayName,
        email: responseFromGoogle.user.email,
      }),
      credentials: "include",
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(loginSuccess({ user: data.user, token: data.token }));
    }
    dispatch(loginFailed({ error: data.error }));
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-5 w-full"
      onClick={handleGoogleAuth}
    >
      <button className="flex cursor-pointer items-center justify-center gap-3 border border-gray-300 w-full py-2 rounded-full">
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
