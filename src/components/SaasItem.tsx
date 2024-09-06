import { SaaSInfo } from "@/types/saas-info";
import { FC } from "react";
import noImage from "/no-img.png";
import { useInt } from "@/hook/useInt";

export const SaasItem: FC<SaaSInfo> = ({ url, icon, idp, email }) => {
  const { t } = useInt();

  return (
    <div className="flex bg-primary rounded h-14">
      <div className="w-1/5 flex items-center justify-center p-4">
        <img
          className="w-full h-full object-contain"
          src={icon ?? noImage}
          alt={url}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="text-sm">{url}</div>
        <div className="text-accent flex gap-2">
          <div>{email ?? t("noAccountFound")}</div>
          <>
            {idp && (
              <>
                <div className="text-zinc-400">|</div>
                <div>{idp}</div>
              </>
            )}
          </>
        </div>
      </div>
    </div>
  );
};
