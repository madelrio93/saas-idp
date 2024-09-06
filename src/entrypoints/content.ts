import { MessageType } from "@/utils/constants";
import { Runtime } from "wxt/browser";

export default defineContentScript({
  matches: ["<all_urls>"],
  main() {
    const handleOnMessageListener = (
      request: { messageType: string },
      _: Runtime.MessageSender,
      sendResponse: (data: any) => void
    ) => {
      if (request.messageType === MessageType.GET_LOGO) {
        let icon: string = "";
        const linkElements = document.querySelectorAll('link[rel~="icon"]');

        if (linkElements.length > 0) {
          icon = (linkElements[0] as any).href;
        }

        sendResponse({ icon });
      }
    };
    browser.runtime.onMessage.addListener(handleOnMessageListener);
  },
});
