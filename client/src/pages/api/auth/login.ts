import type { NextApiRequest, NextApiResponse } from "next";
const base_url = process.env.NEXT_APP_SERVER_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password } = req.body;

    const response = await fetch(base_url + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((data) => data.json())
      .then((userWithToken) => {
        // document.cookie = `token=${userWithToken.accessToken};max-age=10;`;
        // document.cookie = `refresh-token=${userWithToken.refreshToken};max-age=60;`;
        return userWithToken;
      })
      .catch((err) => err);

    res.status(200).json(response);
  } catch (error) {
    // if (error.type === "CredentialsSignin") {
    //   res.status(401).json({ error: "Invalid credentials." });
    // } else {
    //   res.status(500).json({ error: "Something went wrong." });
    // }
  }
}
