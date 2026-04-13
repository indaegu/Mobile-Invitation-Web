"use client";

import { invitationData as data } from "@/data/invitationData";
import InvitationAboutSection from "@/components/sections/InvitationAboutSection";
import InvitationAccountSection from "@/components/sections/InvitationAccountSection";
import InvitationCalendarSection from "@/components/sections/InvitationCalendarSection";
import InvitationContactSection from "@/components/sections/InvitationContactSection";
import InvitationFlowerSection from "@/components/sections/InvitationFlowerSection";
import InvitationGallerySection from "@/components/sections/InvitationGallerySection";
import InvitationHeroSection from "@/components/sections/InvitationHeroSection";
import InvitationLocationSection from "@/components/sections/InvitationLocationSection";
import InvitationStorySection from "@/components/sections/InvitationStorySection";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function InvitationDesignPage() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />

      <main className="px-3 py-3 sm:px-6">
        <div className="invitation-shell mx-auto max-w-[430px] overflow-hidden rounded-[2rem]">
          <InvitationHeroSection
            groomName={data.groomName}
            brideName={data.brideName}
            weddingDate={data.weddingDate}
            weddingTime={data.weddingTime}
            locationName={data.location.name}
            heroMessage={data.heroMessage}
            heroImage={data.heroImage}
          />

          <InvitationStorySection
            groomName={data.groomName}
            brideName={data.brideName}
            groomParents={data.groomParents}
            brideParents={data.brideParents}
            invitationTitle={data.invitationTitle}
            invitationBody={data.invitationBody}
            storyImages={data.storyImages}
          />

          <InvitationContactSection contacts={data.contacts} />

          <InvitationCalendarSection
            weddingDate={data.weddingDate}
            weddingTime={data.weddingTime}
            groomName={data.groomName}
            brideName={data.brideName}
            locationName={data.location.name}
          />

          <InvitationLocationSection location={data.location} />

          <InvitationAccountSection accountGroups={data.accountGroups} />

          <InvitationFlowerSection
            flowerMessage={data.flowerMessage}
            flowerOptions={data.flowerOptions}
          />

          <InvitationAboutSection
            coupleSince={data.coupleSince}
            profiles={data.profiles}
            interviews={data.interviews}
          />

          <InvitationGallerySection images={data.images} />

          <footer className="bg-white px-6 pb-14 pt-8 text-center">
            <div className="section-divider mx-auto mb-4 w-20" />
            <p className="font-display text-[1.15rem] text-[rgba(23,20,18,0.56)]">
              together, always
            </p>
            <p className="font-serif mt-2 text-sm leading-[1.8] text-[rgba(23,20,18,0.6)]">
              {data.groomName} · {data.brideName}
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
