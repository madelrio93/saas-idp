import { isSaaSUrl, saveStorageSaaSData } from "@/utils";
import { MessageType } from "@/utils/constants";
import { Tabs } from "wxt/browser";

export default defineBackground(() => {
  const handleOnUpdateTab = async (
    tabId: number,
    changeInfo: Tabs.OnUpdatedChangeInfoType,
    { url }: Tabs.Tab
  ) => {
    if (changeInfo.status === "complete" && url) {
      if (url && isSaaSUrl(url)) {
        const { icon } = await browser.tabs.sendMessage(tabId, {
          messageType: MessageType.GET_LOGO,
        });

        saveStorageSaaSData({ url, icon });
      } else {
        const idp = identifyIDPPattern(url);

        if (!idp) return;
        saveStorageIDPData(url, idp);
      }
    }
  };

  browser.tabs.onUpdated.addListener(handleOnUpdateTab);
});
