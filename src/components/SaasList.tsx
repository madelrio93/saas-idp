import { FC } from "react";
import { SaasItem } from "@/components/SaasItem";
import { SaaSInfo } from "@/types/saas-info";
import { useInt } from "@/hook/useInt";

interface SaasListProps {
  data: SaaSInfo[];
}

export const SaasList: FC<SaasListProps> = ({ data }) => {
  const { t } = useInt();

  if (!data.length)
    return (
      <div className="h-full absolute inset-0 m-auto flex items-center justify-center">
        {t("noDataMessage")}
      </div>
    );

  return data.map((item) => <SaasItem key={item.url} {...item} />);
};
