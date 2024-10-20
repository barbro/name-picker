import React from "react";
import { Globe } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import i18next from "@/features/localisation/i18n";
import { cn } from "@/lib/utils";
export function LangugeButton(props: any) {
  return (
    <Menubar className={cn("", props.className)}>
      <MenubarMenu>
        <MenubarTrigger>
          <Globe className="h-4 w-4" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem key="he" onClick={() => i18next.changeLanguage("he")}>
            עברית
          </MenubarItem>
          <MenubarItem key="en" onClick={() => i18next.changeLanguage("en")}>
            English
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
