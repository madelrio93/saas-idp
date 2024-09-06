import { useInt } from "@/hook/useInt";
import { FC, PropsWithChildren } from "react";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useInt();
  
  return (
    <div className="p-4">
      <div className="text-base font-bold text-center mb-4">{t("title")}</div>

      <div className="flex-1">{children}</div>
    </div>
  );
};
