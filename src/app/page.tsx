"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NameEnteringView from "@/components/views/ParticipantsEnteringView";
import PickingView from "@/components/views/pickingViews/PickingView";

const Home = () => {
  return (
    <>
      <Card className="xl mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-center">בוחר משתתפים</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="nameEntering"
            className="flex flex-col justify-center"
            dir="rtl"
          >
            <TabsList className="grid min-w-32 grid-cols-2">
              <TabsTrigger value="nameEntering">הזנת שמות</TabsTrigger>
              <TabsTrigger value="nameDisplay">הגרלת שמות</TabsTrigger>
            </TabsList>
            <TabsContent value="nameEntering">
              <NameEnteringView />
            </TabsContent>
            <TabsContent value="nameDisplay">
              <PickingView />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
