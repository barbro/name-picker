"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import "@/lib/i18n/i18n";
import i18next from "@/lib/i18n/i18n";
import { LangugeButton } from "@/components/LangugeButton";
import ViewingTabs from "@/components/ViewingTabs";
import { Toaster } from "@/components/ui/sonner";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div dir={i18next.dir()}>
      <Card className="xl mx-auto max-w-2xl">
        <CardHeader className="relative">
          <LangugeButton className="absolute left-2" />
          <CardTitle className="text-center">{t("appName")}</CardTitle>
        </CardHeader>
        <CardContent>
          <ViewingTabs />
        </CardContent>
      </Card>
      <Toaster dir={i18next.dir()} />
    </div>
  );
};

export default Home;
