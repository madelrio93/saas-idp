import { SaaSInfo } from "@/types/saas-info";

export const saasDomains = [
  "office.com",
  "slack.com",
  "microsoft.com",
  "salesforce.com",
  "dropbox.com",
];
export const idpPatterns = {
  google: "accounts.google.com",
  microsoft: "login.microsoftonline.com",
  okta: "okta.com",
};

export const extractDomain = (url: string) => {
  const hostname = new URL(url).hostname;

  return hostname.startsWith("www.") ? hostname.slice(4) : hostname;
};
/**
 * Checks if the provided URL corresponds to a recognized SaaS domain.
 *
 * @param {string} url - The URL to be checked.
 * @returns {boolean} - Returns true if the URL belongs to a SaaS domain, otherwise false.
 */
export const isSaaSUrl = (url: string) => {
  const domain = extractDomain(url);

  return saasDomains.includes(domain);
};

/**
 * Saves  the SaaS domain information in local storage.
 *
 * @param {string} [params.url] - The URL of the SaaS domain.
 * @param {string} [params.icon=""] - The icon associated with the SaaS domain (optional).
 *
 * @returns {Promise<void>} - A promise that resolves when the save operation is complete.
 */
export const saveStorageSaaSData = async ({
  url,
  icon,
}: {
  url: string;
  icon: string;
}): Promise<void> => {
  const data = await storage.getItem<SaaSInfo[]>("local:data");

  if (
    data &&
    data?.length > 0 &&
    data?.some((item) => extractDomain(item.url) === extractDomain(url))
  )
    return;

  storage.setItem("local:data", [...(data || []), { url, icon }]);
};

/**
 * Identify IDP
 *
 * @param {url} [params.url] - IDP url.
 */
export const identifyIDPPattern = (url: string) => {
  for (const [idp, pattern] of Object.entries(idpPatterns)) {
    if (url.includes(pattern)) {
      console.log(`IDP detected: ${idp}`);
      return idp;
    }
  }

  return null;
};

/**
 * Saves the IDP identified in local storage.
 *
 * @param {string} [url] - The url.
 * @param {string} [idp] - The idp.
 *
 * @returns {Promise<void>} - A promise that resolves when the save operation is complete.
 */
export const saveStorageIDPData = async (
  url: string,
  idp: string
): Promise<void> => {
  const data = await storage.getItem<SaaSInfo[]>("local:data");

  if (!data) return;

  const saasIdentifiedIndex = data?.findIndex((item) =>
    url.includes(extractDomain(item.url))
  );
  if (saasIdentifiedIndex === -1) return;

  data[saasIdentifiedIndex] = {
    ...data[saasIdentifiedIndex],
    idp,
  };

  await storage.setItem("local:data", data);
};
