"use client";

import { Button } from "@iroy/ui/components/button";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@iroy/ui/components/collapsible";
import { ChevronsUpDown } from "@iroy/ui/icons";
import * as React from "react";

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full flex-col gap-2 md:w-[350px]">
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="line-clamp-1 text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="shadow-xs rounded-md border px-4 py-2 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="shadow-xs rounded-md border px-4 py-2 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="shadow-xs rounded-md border px-4 py-2 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
