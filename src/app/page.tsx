"use client";

import React, { useState } from "react";
import { useListsStore } from "@/store/listsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NameEnteringView from "@/components/views/NameEnteringView";
import NamePickingView from "@/components/views/NamePickingView";
import PickingDoneView from "@/components/views/PickingDoneView";

const Home = () => {
  const [newName, setNewName] = useState("");
  const {
    nameList,
    orderedNames,
    enterName,
    updateOrder,
    readName,
    getUnreadNames,
    getReadNames,
    getCurrentName,
  } = useListsStore();

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
              {getUnreadNames().length === 0 ? (
                <NamePickingView />
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
