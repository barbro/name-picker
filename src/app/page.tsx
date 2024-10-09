"use client";

import React, { useState } from "react";
import { useParticipantsStore } from "@/store/participantsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NameEnteringView from "@/components/views/ParticipantsEnteringView";
import ParticipantsPickingView from "@/components/views/ParticipantsPickingView";
import PickingDoneView from "@/components/views/PickingDoneView";

const Home = () => {
  const getUnreadParticipants = useParticipantsStore(
    (state) => state.getUnreadParticipants
  );

  return (
    <>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>בוחר שמות</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="nameEntering" className="max-w-5xl" dir="rtl">
            <TabsList>
              <TabsTrigger value="nameEntering">הזנת שמות</TabsTrigger>
              <TabsTrigger value="nameDisplay">רשימת שמות</TabsTrigger>
            </TabsList>
            <TabsContent value="nameEntering">
              <NameEnteringView />
            </TabsContent>
            <TabsContent value="nameDisplay">
              {getUnreadParticipants().length === 0 ? (
                <ParticipantsPickingView />
              ) : (
                <PickingDoneView />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
