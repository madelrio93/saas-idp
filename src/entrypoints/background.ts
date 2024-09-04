import { isSaaSUrl, saveStorageSaaSData } from "@/utils";
import { Tabs } from "wxt/browser";

export default defineBackground(() => {
  const handleOnUpdateTab = (
    _: number,
    changeInfo: Tabs.OnUpdatedChangeInfoType,
    { favIconUrl, url }: Tabs.Tab
  ) => {
    if (changeInfo.status === "complete") {
      if (url && isSaaSUrl(url ?? "")) {
        saveStorageSaaSData({ url, icon: favIconUrl });
      }
    }
  };

  browser.tabs.onUpdated.addListener(handleOnUpdateTab);
});
