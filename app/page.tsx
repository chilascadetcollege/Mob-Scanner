import { getSettings } from '@/lib/data/settings';
import { getActiveAnnouncements } from '@/lib/data/announcements';
import { getPrincipalMessage } from '@/lib/data/principal-message';
import { getApprovedTestimonials } from '@/lib/data/testimonials';

import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Departments from '@/components/Departments';
import PrincipalMessage from '@/components/PrincipalMessage';
import Testimonials from '@/components/Testimonials';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AiAgentWidget from '@/components/AiAgentWidget';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const settings = await getSettings();
  const announcements = await getActiveAnnouncements();
  const principalMessage = await getPrincipalMessage();
  const testimonials = await getApprovedTestimonials();

  return (
    <>
      <AnnouncementBar announcements={announcements} />
      <Header settings={settings} />
      <Hero />
      <About />
      <Departments />
      <PrincipalMessage message={principalMessage.message} />
      <Testimonials testimonials={testimonials} />
      <FAQ settings={settings} />
      <ContactForm settings={settings} />
      <Footer settings={settings} />
      <WhatsAppButton settings={settings} />
      <AiAgentWidget settings={settings} />
    </>
  );
}
