"use client";

import { InquiryForm, type InquiryFieldConfig } from "@/components/forms/InquiryForm";
import { meetingRoomInquirySchema, type MeetingRoomInquiryInput } from "@/lib/validations/meeting-room";

const fields: InquiryFieldConfig<MeetingRoomInquiryInput>[] = [
  { name: "name", label: "Full name", type: "text", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "98XXXXXXXX" },
  {
    name: "roomType",
    label: "Room type",
    type: "select",
    options: [
      { label: "Huddle Room (2–4 people)", value: "huddle" },
      { label: "Meeting Room (6–8 people)", value: "meeting" },
      { label: "Boardroom (10–12 people)", value: "boardroom" },
    ],
  },
  { name: "preferredDate", label: "Preferred date", type: "date" },
  { name: "message", label: "Anything else we should know?", type: "textarea", placeholder: "Optional" },
];

export function MeetingRoomBookingForm() {
  return (
    <InquiryForm<MeetingRoomInquiryInput>
      schema={meetingRoomInquirySchema}
      fields={fields}
      endpoint="/api/meeting-room-inquiry"
      submitLabel="Request Booking"
      successMessage="Thanks — we'll confirm availability within a few hours."
      honeypotName="company"
    />
  );
}
