"use client";

import { InquiryForm, type InquiryFieldConfig } from "@/components/forms/InquiryForm";
import { corporateInquirySchema, type CorporateInquiryInput } from "@/lib/validations/corporate";

const fields: InquiryFieldConfig<CorporateInquiryInput>[] = [
  { name: "contactName", label: "Your name", type: "text", placeholder: "Full name" },
  { name: "workEmail", label: "Work email", type: "email", placeholder: "you@company.com" },
  { name: "phone", label: "Phone", type: "tel", placeholder: "98XXXXXXXX" },
  { name: "companyName", label: "Company name", type: "text", placeholder: "Company Pvt. Ltd." },
  {
    name: "teamSize",
    label: "Team size",
    type: "select",
    options: [
      { label: "1–10 employees", value: "1-10" },
      { label: "11–50 employees", value: "11-50" },
      { label: "51–200 employees", value: "51-200" },
      { label: "200+ employees", value: "200+" },
    ],
  },
  { name: "message", label: "What are you looking for?", type: "textarea", placeholder: "Tell us about your team's needs" },
];

export function CorporateInquiryForm() {
  return (
    <InquiryForm<CorporateInquiryInput>
      schema={corporateInquirySchema}
      fields={fields}
      endpoint="/api/corporate"
      submitLabel="Get a Quote"
      successMessage="Thanks — our corporate partnerships team will reach out within one business day."
      honeypotName="company"
    />
  );
}
