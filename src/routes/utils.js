const TOKEN_KEY = "jwt";

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(TOKEN_KEY)) {
    return true;
  } else {
    return false;
  }
};

export const signIn = async (email, password, setError) => {
  const response = await fetch(`http://localhost:3001/users/login`, {
    method: "post",
    headers: { "content-type": "application/json" },

    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const resp = await response.json();

  const data = resp.info;
  if (data) {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(data));
    window.location.reload();
  } else setError(true);
};
