import { useState } from "react";

import { StateInterface, useGlobalStateValue } from "@/app/stateProvider";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";

const LoginForm = () => {
  // const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorButtonText, setErrorButtonText] = useState("");

  const { setGlobalState } = useGlobalStateValue();

  const authenticateUser = (uname: string, psw: string) => {
    setIsLoading(true);

    authenticateUserWithToken(uname, psw)
      .then(({ user, accessToken, refreshToken }: Partial<StateInterface>) => {
        setIsLoading(false);

        // ---- Error Handler ---- //
        if (!user) {
          setError(true);
          setErrorMessage("Δεν είναι σωστά τα στοιχεία εισόδου");
          setErrorButtonText("Προσπαθήστε ξανά!!!");
          throw new Error("Δεν είναι σωστά τα στοιχεία εισόδου");
        }
        localStorage.setItem("accessToken", accessToken || "");
        localStorage.setItem("refreshToken", refreshToken || "");
        setGlobalState({
          user: user,
          authenticated: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
        router.push("/");
      })
      .catch((err: Error) => {
        console.log(err);
        setError(true);
        setErrorMessage("Υπάρχει πρόβλημα κατά την σύνδεση. Δοκιμάστε ξανά σε λίγο!");
        setErrorButtonText("Προσπαθήστε ξανά!!!");
        setIsLoading(false);
      });
  };

  const loginFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);
    if (username === "") setUsernameError(true);
    if (password === "") setPasswordError(true);
    if (username !== "" && password !== "") {
      authenticateUser(username, password);
    }
  };

  const usernameInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (usernameError) setUsernameError(false);
    setUsername(e.target.value);
  };

  const passwordInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (passwordError) setPasswordError(false);
    setPassword(e.target.value);
  };

  return (
    <>
      {/* {error && <ErrorComponent errorMessage={errorMessage} errorButtonText={errorButtonText} onClick={() => setError(false)} />} */}
      <div className="flex justify-center items-center h-[83vh] px-20">
        <form method="post" onSubmit={(e) => loginFormSubmitHandler(e)} className="flex justify-center flex-col p-8 mx-16 h-[80%] shadow-xl rounded">
          <div className="form-header">
            <h2 className="text-[28px]">Είσοδος</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12">
            <div className="sm:col-span-12">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Όνομα χρήστη
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  required
                  onChange={usernameInputHandler}
                />
              </div>
            </div>

            <div className="sm:col-span-12">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Κωδικός
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                  onChange={passwordInputHandler}
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-12">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Σύνδεση
              </Button>
            </div>
          </div>
        </form>
        <img src="/login-page.jpg" alt="login" width="50%" />
      </div>
    </>
  );
};

const authenticateUserWithToken = async (username: string, password: string) => {
  const data = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const userWithToken = await data.json();
  return userWithToken;
};

export default LoginForm;
