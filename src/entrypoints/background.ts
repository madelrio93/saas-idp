import { isSaaSUrl, saveStorageSaaSData } from "@/utils";
import { Tabs } from "wxt/browser";

export default defineBackground(async () => {
  const handleOnUpdateTab = (
    _: number,
    changeInfo: Tabs.OnUpdatedChangeInfoType,
    { favIconUrl, url }: Tabs.Tab
  ) => {
    if (changeInfo.status === "complete" && url) {
      if (url && isSaaSUrl(url)) {
        saveStorageSaaSData({ url, icon: favIconUrl });
      } else {
        const idp = identifyIDPPattern(url);

        if (!idp) return;
        saveStorageIDPData(url, idp);
      }
    }
  };

  browser.tabs.onUpdated.addListener(handleOnUpdateTab);
});
