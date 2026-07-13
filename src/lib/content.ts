// Thin accessor layer — every page reads content through these functions rather than
// importing src/content/* directly, so a future CMS can replace the implementations
// below without touching any page component.
//
// getTestimonials/getAggregateRating/getEvents are DB-backed (Phase 3 CMS) and live in
// ./content-cms.ts instead of here — this file must stay safe to import from Client
// Components (e.g. LiveChatStub calls getSiteInfo()), and pulling in src/lib/db.ts's
// better-sqlite3 dependency would break the client bundle.
import { site } from "@/content/site";
import { verticals } from "@/content/verticals";
import { tiers, featureMatrix } from "@/content/tiers";
import { faqs } from "@/content/faq";
import { leadership, trainers } from "@/content/team";
import { menu, cafeHours } from "@/content/menu";
import { rooms, roomBookingNotes } from "@/content/rooms";
import { workspaceTypes, coworkingAmenities } from "@/content/coworking";
import { classes, fitnessAssessment, personalTraining } from "@/content/classes";
import { openRoles, cultureStatement } from "@/content/careers";
import { images, getImage } from "@/content/images";
import { getAllPosts as getAllPostsFromContent, getPostBySlug as getPostBySlugFromContent } from "@/content/blog/posts";

export function getSiteInfo() {
  return site;
}

export function getVerticals() {
  return verticals;
}

export function getTiers() {
  return tiers;
}

export function getFeatureMatrix() {
  return featureMatrix;
}

export function getFaqs() {
  return faqs;
}

export function getFaqsByCategory() {
  const byCategory = new Map<string, typeof faqs>();
  for (const item of faqs) {
    const existing = byCategory.get(item.category);
    if (existing) {
      existing.push(item);
    } else {
      byCategory.set(item.category, [item]);
    }
  }
  return Array.from(byCategory.entries()).map(([category, items]) => ({ category, items }));
}

export function getLeadership() {
  return leadership;
}

export function getTrainers() {
  return trainers;
}

export function getMenu() {
  return menu;
}

export function getCafeHours() {
  return cafeHours;
}

export function getRooms() {
  return rooms;
}

export function getRoomBookingNotes() {
  return roomBookingNotes;
}

export function getWorkspaceTypes() {
  return workspaceTypes;
}

export function getCoworkingAmenities() {
  return coworkingAmenities;
}

export function getClasses() {
  return classes;
}

export function getFitnessAssessment() {
  return fitnessAssessment;
}

export function getPersonalTraining() {
  return personalTraining;
}

export function getOpenRoles() {
  return openRoles;
}

export function getCultureStatement() {
  return cultureStatement;
}

export function getAllImages() {
  return images;
}

export { getImage };

export function getAllPosts() {
  return getAllPostsFromContent();
}

export function getPostBySlug(slug: string) {
  return getPostBySlugFromContent(slug);
}
