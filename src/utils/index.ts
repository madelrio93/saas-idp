import { SaaSInfo } from "@/types/saas-info";

export const saasDomains = ["salesforce.com", "office.com", "slack.com"];

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
 * Saves or updates the SaaS domain information in local storage.
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
  icon?: string;
}): Promise<void> => {
  console.log(icon)
  const data = await storage.getItem<SaaSInfo[]>("local:data");

  if (
    data &&
    data?.length > 0 &&
    data?.some((item) => extractDomain(item.url) === extractDomain(url))
  )
    return;

  storage.setItem("local:data", [...(data || []), { url, icon }]);
};
