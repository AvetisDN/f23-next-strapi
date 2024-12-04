import { LoginProps, RegisterProps } from "@/lib/interfaces";
import { getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

export async function registerService(userData: RegisterProps) {
  const url = new URL("/api/auth/local/register", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function loginService(userData: LoginProps) {
  const url = new URL("/api/auth/local", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
