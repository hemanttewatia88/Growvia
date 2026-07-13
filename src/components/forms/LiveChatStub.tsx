"use client";

import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getSiteInfo } from "@/lib/content";

// TODO(portal-phase): replace with real live-chat wired to the admin messaging inbox.
export function LiveChatStub() {
  const site = getSiteInfo();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon-lg"
          aria-label="Chat with us"
          className="fixed bottom-6 right-6 z-30 size-14 rounded-full shadow-lg"
        >
          <MessageCircle className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Live chat is launching soon</DialogTitle>
          <DialogDescription>
            In-app chat arrives with the member portal. Until then, reach us directly and we&rsquo;ll respond within
            one business day.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2 text-sm">
          <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-medium text-ink hover:text-gold">
            Call {site.phone}
          </a>
          <a href={`mailto:${site.email}`} className="font-medium text-ink hover:text-gold">
            Email {site.email}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
