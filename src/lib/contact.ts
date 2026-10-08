const whatsappNumber = "2349168258196";
const whatsappMessage = "Hello WAFFI Content Studio, I would like to make a reservation or inquiry.";

export function studioWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const studioContact = {
  phoneDisplay: "0916 825 8196",
  phoneInternational: "+234 916 825 8196",
  phoneTel: "+2349168258196",
  whatsappUrl: studioWhatsAppUrl(whatsappMessage),
  instagramUrl: "https://www.instagram.com/wafficontentstudio/",
  tiktokUrl: "https://www.tiktok.com/@wafficontentstudio",
  socialHandle: "wafficontentstudio",
  email: "support@wafficontentstudio.com",
  websiteDisplay: "www.wafficontentstudio.com",
  websiteUrl: "https://wafficontentstudio.com",
  address: "3 Ayeni Street, off Aya Road, Jakpa Road, Warri",
  addressLines: ["3 Ayeni Street, off Aya Road", "Jakpa Road, Warri"] as const,
};
