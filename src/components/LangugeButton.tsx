import React from "react";
import { Globe } from "lucide-react";
import i18next from "@/features/localisation/i18n";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
export function LangugeButton(props: any) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-8 p-0", props.className)}
          >
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => i18next.changeLanguage("he")}>
            עברית
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => i18next.changeLanguage("en")}>
            English
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
