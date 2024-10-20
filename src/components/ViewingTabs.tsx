import i18next from "i18next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import PickingView from "@/features/choosingParticipants/views/PickingView";
import ParticipantEnteringView from "@/features/enteringParticipants/views/ParticipantsEnteringView";
import { useTranslation } from "react-i18next";

export default function ViewingTabs() {
  const { t } = useTranslation();

  return (
    <Tabs
      defaultValue="nameEntering"
      className="flex flex-col justify-center"
      dir={i18next.dir()}
    >
      <TabsList className="grid min-w-32 grid-cols-2">
        <TabsTrigger value="nameEntering">{t("entering")}</TabsTrigger>
        <TabsTrigger value="nameDisplay">{t("picking")}</TabsTrigger>
      </TabsList>
      <TabsContent value="nameEntering">
        <ParticipantEnteringView />
      </TabsContent>
      <TabsContent value="nameDisplay">
        <PickingView />
      </TabsContent>
    </Tabs>
  );
}
