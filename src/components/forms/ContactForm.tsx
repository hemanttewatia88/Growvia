"use client";

import { InquiryForm, type InquiryFieldConfig } from "@/components/forms/InquiryForm";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";

const fields: InquiryFieldConfig<ContactInput>[] = [
  { name: "name", label: "Full name", type: "text", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@company.com" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "98XXXXXXXX" },
  { name: "message", label: "Message", type: "textarea", placeholder: "How can we help?" },
];

export function ContactForm() {
  return (
    <InquiryForm<ContactInput>
      schema={contactSchema}
      fields={fields}
      endpoint="/api/contact"
      submitLabel="Send Message"
      successMessage="Thanks — we'll be in touch within one business day."
      honeypotName="company"
    />
  );
}
