/* ============================================================
   Etihad Town Phase 4 - Bin Suleman Real Estate & Builders
   JavaScript bundle (extracted from new.html)

   Contents:
     1) Tailwind Play CDN configuration
     2) Google Analytics 4 (gtag) setup
     3) Meta Pixel setup
     4) Mobile menu toggle
     5) Booking form -> WhatsApp + conversion tracking
   ============================================================ */
/* 1) Tailwind configuration (before the CDN processes) */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            surface: "#041329",
            "surface-low": "#030d1c",
            "surface-card": "#081b35",
            "brand-emerald": "#22c55e",
            "brand-lime": "#4ae176",
            "emerald-glow": "#34d399",
            "border-subtle": "rgba(74, 225, 118, 0.22)"
          },
          fontFamily: {
            editorial: ["Cinzel", "Montserrat", "serif"],
            sans: ["Manrope", "sans-serif"],
            heading: ["Montserrat", "sans-serif"],
            mono: ["Space Grotesk", "monospace"]
          }
        }
      }
    };

/* 2) Google Analytics 4 */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');

/* 3) Meta Pixel */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID_HERE');
fbq('track', 'PageView');

/* 4 + 5) Interactive behaviour (runs once the DOM is ready) */
document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile menu toggle --- */
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuLinks = document.querySelectorAll('.menu-link');
  
  if (menuToggleBtn && mobileMenu) {
  menuToggleBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
  mobileMenu.classList.toggle('flex');
  });
  
  menuLinks.forEach(link => {
  link.addEventListener('click', () => {
  mobileMenu.classList.add('hidden');
  mobileMenu.classList.remove('flex');
  });
  });
  }

  /* --- Booking scroll / selection + WhatsApp + analytics --- */
  const bookButtons = document.querySelectorAll('.book-btn');
  const plotSelect = document.getElementById('plot-size');
  const bookingForm = document.getElementById('booking-form');
  const whatsappLinks = document.querySelectorAll('.whatsapp-btn, a[href*="wa.me"]');
  
  // Track WhatsApp link clicks
  whatsappLinks.forEach(link => {
  link.addEventListener('click', () => {
  if (typeof fbq === 'function') {
  fbq('track', 'Contact', { content_name: 'WhatsApp Click' });
  }
  if (typeof gtag === 'function') {
  gtag('event', 'whatsapp_inquiry', {
  event_category: 'Leads',
  event_label: 'WhatsApp Contact'
  });
  }
  });
  });
  
  bookButtons.forEach(btn => {
  btn.addEventListener('click', () => {
  const plotValue = btn.getAttribute('data-plot');
  if (plotValue && plotSelect) {
  plotSelect.value = plotValue;
  }
  if (bookingForm) {
  bookingForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  });
  });
  
  if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('full-name')?.value || '';
  const phone = document.getElementById('phone-number')?.value || '';
  const plotElem = document.getElementById('plot-size');
  const plotValue = plotElem ? plotElem.value : 'unspecified';
  const plotText = plotElem ? plotElem.options[plotElem.selectedIndex]?.text : '';
  const inquiries = document.getElementById('query-message')?.value || 'None';
  
  // Fire Meta Pixel and GA4 conversion tracking events
  if (typeof fbq === 'function') {
  fbq('track', 'Lead', {
  content_category: 'Plot Reservation',
  content_name: plotValue
  });
  }
  if (typeof gtag === 'function') {
  gtag('event', 'generate_lead', {
  event_category: 'Inquiry Form',
  event_label: plotValue
  });
  }
  
  const message = `New Priority Booking Inquiry - Bin Suleman Etihad Town Phase 4:\nName: ${name}\nPhone: ${phone}\nPlot Interest: ${plotText}\nInquiry Notes: ${inquiries}`;
  const waUrl = `https://wa.me/923014736155?text=${encodeURIComponent(message)}`;
  window.open(waUrl, '_blank');
  });
  }
});
