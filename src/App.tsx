import CustomCursor from './components/ui/CustomCursor';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import PartnersSection from './sections/PartnersSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Desktop Sidebar navigation */}
      <Sidebar />

      {/* Mobile Header navigation */}
      <Header />

      {/* Spacer to push content to the right of the fixed desktop sidebar */}
      <div className="hidden md:block w-[220px] flex-shrink-0" />

      {/* Main Content Areas */}
      <div className="flex-1 min-w-0">
        {/* Hero Section */}
        <HeroSection />

        <main>
          {/* Section Divider */}
          <div className="h-24 bg-gradient-to-b from-background to-navy" />

          {/* About Section */}
          <AboutSection />

          {/* Section Divider */}
          <div className="h-24 bg-gradient-to-b from-navy to-background/40" />

          {/* Partners Section */}
          <PartnersSection />

          {/* Section Divider */}
          <div className="h-24 bg-background" />

          {/* Contact Section */}
          <ContactSection />

          {/* Section Divider */}
          <div className="h-16 bg-gradient-to-b from-secondary/30 to-navy-deep" />

          {/* Footer */}
          <Footer />
        </main>
      </div>
    </div>
  );
}
