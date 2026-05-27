import { useState } from "react";
import Hero from "@/components/webinar/Hero";
import Diagnosis from "@/components/webinar/Diagnosis";
import BeliefBreak from "@/components/webinar/BeliefBreak";
import Bottlenecks from "@/components/webinar/Bottlenecks";
import WhatYoullLearn from "@/components/webinar/WhatYoullLearn";
import HowItWorks from "@/components/webinar/HowItWorks";
import ForWhom from "@/components/webinar/ForWhom";
import AboutTetra from "@/components/webinar/AboutTetra";
import CtaSection from "@/components/webinar/CtaSection";
import Faq from "@/components/webinar/Faq";
import Footer from "@/components/webinar/Footer";
import LeadFormPopup from "@/components/webinar/LeadFormPopup";

const Index = () => {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);

  const openLeadForm = () => setIsLeadFormOpen(true);

  return (
    <main className="landing-shell text-foreground">
      <h1 className="sr-only">
        Diagnóstico de Marketing Tetra Growth — Descubra o gargalo que trava o
        crescimento da sua empresa
      </h1>
      <Hero onOpenForm={openLeadForm} />
      <Diagnosis onOpenForm={openLeadForm} />
      <BeliefBreak onOpenForm={openLeadForm} />
      <Bottlenecks onOpenForm={openLeadForm} />
      <WhatYoullLearn onOpenForm={openLeadForm} />
      <HowItWorks onOpenForm={openLeadForm} />
      <ForWhom />
      <AboutTetra />
      <CtaSection onOpenForm={openLeadForm} />
      <Faq />
      <Footer />
      <LeadFormPopup open={isLeadFormOpen} onOpenChange={setIsLeadFormOpen} />
    </main>
  );
};

export default Index;
