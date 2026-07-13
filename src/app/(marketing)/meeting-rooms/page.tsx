import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/layout/Section";
import { MeetingRoomBookingForm } from "@/components/forms/MeetingRoomBookingForm";
import { CTABand } from "@/components/sections/CTABand";
import { buildMetadata } from "@/lib/seo";
import { getRooms, getRoomBookingNotes, getImage } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "Meeting & Conference Rooms",
  description:
    "Soundproofed meeting and conference rooms with video-conferencing AV, from a 4-person huddle room to a 12-person boardroom — book by the hour or the day.",
  path: "/meeting-rooms",
  imageKey: "vertical-meeting-rooms",
});

export default function MeetingRoomsPage() {
  const rooms = getRooms();
  const notes = getRoomBookingNotes();

  return (
    <>
      <PageHero
        eyebrow="Meeting Rooms"
        title="Client-ready rooms, booked in minutes"
        subtitle="Soundproofed meeting and conference rooms with video-conferencing AV, sized from a 4-person huddle room to a 12-person boardroom."
        imageKey="vertical-meeting-rooms"
        video={{
          src: "/videos/hero-meeting.mp4",
          poster: "/videos/hero-meeting-poster.jpg",
          alt: "A team collaborating around the table in a meeting room",
        }}
        primaryCta={{ label: "Request a Booking", href: "#booking" }}
      />

      <Section tone="paper">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Room types</span>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Sized for the meeting you&apos;re having</h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {rooms.map((room) => {
            const image = getImage(room.imageKey);
            return (
              <div key={room.id} className="overflow-hidden rounded-2xl border border-border-brand bg-surface">
                <div className="relative h-40 w-full">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="font-display text-lg font-semibold text-ink">{room.name}</p>
                  <p className="text-sm font-medium text-bronze">{room.capacity}</p>
                  <p className="mt-2 text-sm text-ink-secondary">{room.description}</p>
                  <p className="mt-3 text-sm font-semibold text-ink">{room.hourlyRateLabel}</p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {room.amenities.map((a) => (
                      <li key={a} className="text-sm text-ink-secondary before:mr-2 before:text-gold before:content-['—']">
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <ul className="mt-8 flex flex-col gap-2 text-sm text-ink-muted">
          {notes.map((note) => (
            <li key={note} className="before:mr-2 before:text-gold before:content-['—']">
              {note}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" id="booking">
        <div className="mx-auto max-w-lg">
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-bronze">Booking inquiry</span>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">Check availability</h2>
            <p className="mt-3 text-sm text-ink-secondary">
              Tell us what you need and we&apos;ll confirm availability — members can also book instantly from the
              member app.
            </p>
          </div>
          <div className="mt-8">
            <MeetingRoomBookingForm />
          </div>
        </div>
      </Section>

      <CTABand
        title="Need rooms regularly for your team?"
        body="Corporate Team plans include bundled meeting-room hours across all your bookings."
        primaryCta={{ label: "Explore Corporate Plans", href: "/corporate" }}
        secondaryCta={{ label: "See Membership Tiers", href: "/membership" }}
      />
    </>
  );
}
