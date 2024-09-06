import { createContext, FC, PropsWithChildren, useState } from "react";
import en from "@/assets/locales/en.json";

interface IntContextProps {
  lang: string;
  t: (key: keyof typeof en) => string;
}

interface IntProviderProps extends PropsWithChildren {
  defaultLang?: string;
  languages: {
    [key: string]: {
      [key: string]: string;
    };
  };
}

export const IntContext = createContext<IntContextProps | undefined>(undefined);

export const IntProvider: FC<IntProviderProps> = ({
  defaultLang,
  languages,
  children,
}) => {
  const [lang] = useState<string>(defaultLang ?? "en");

  const t = <T extends keyof (typeof languages)[typeof lang]>(key: T) =>
    languages[lang][key] as string;

  return (
    <IntContext.Provider value={{ lang, t }}>{children}</IntContext.Provider>
  );
};
