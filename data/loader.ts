import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

const baseURL = getStrapiURL();

async function fetchData(url: string) {
  const jwt = null;
  const headers = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  try {
    const response = await fetch(url, jwt ? headers : {});
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getHomePageData() {
  // throw new Error("Error");

  const query = qs.stringify({
    populate: {
      blocks: {
        on: {
          "layout.hero-section": {
            populate: {
              image: {
                fields: ["url", "alternativeText"],
              },
              link: {
                populate: true,
              },
            },
          },
          "layout.features-section": {
            populate: {
              feature: {
                populate: true,
              },
            },
          },
        },
      },
    },
  });
  const url = new URL("/api/home-page", baseURL);
  url.search = query;

  return await fetchData(url.href);
}

export async function getGlobalData() {
  const query = qs.stringify({
    populate: [
      "header.logo",
      "header.ctaButton",
      "footer.logo",
      "footer.social",
    ],
  });
  const url = new URL("/api/global", baseURL);
  url.search = query;

  return await fetchData(url.href);
}

export async function getGlobalMeta() {
  const query = qs.stringify({
    fields: ["title", "description"],
  });
  const url = new URL("/api/global", baseURL);
  url.search = query;

  return await fetchData(url.href);
}