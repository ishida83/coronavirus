import * as React from "react";
import Button from "@material-ui/core/Button";
import { useLocale, useSetLocale } from "react-admin";

const LocaleSwitcher = () => {
  const locale = useLocale();
  const setLocale = useSetLocale();
  return (
    <div>
      <Button disabled={locale === "en"} onClick={() => setLocale("en")}>
        English
      </Button>
      <Button disabled={locale === "zh"} onClick={() => setLocale("zh")}>
        中文
      </Button>
      <Button disabled={locale === "zh-tw"} onClick={() => setLocale("zh-tw")}>
        正體中文
      </Button>
      <Button disabled={locale === "ja"} onClick={() => setLocale("ja")}>
        日本語
      </Button>
    </div>
  );
};

export default LocaleSwitcher;
