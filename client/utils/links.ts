interface HttpLink {
  url: string;
  nativeIcon: string;
  customIcon: string;
  label: string;
}

export const httpLinks: {
  [key: string]: HttpLink;
} = {
  instagram: {
    url: "https://instagram.com/",
    nativeIcon: "skill-icons:instagram",
    customIcon: "mdi:instagram",
    label: "Username",
  },
  twitter: {
    url: "https://twitter.com/",
    nativeIcon: "skill-icons:twitter",
    customIcon: "mdi:twitter",
    label: "Username",
  },
  tiktok: {
    url: "https://tiktok.com/",
    nativeIcon: "logos:tiktok-icon",
    customIcon: "simple-icons:tiktok",
    label: "Username",
  },
  linkedin: {
    url: "https://linkedin.com/",
    nativeIcon: "skill-icons:linkedin",
    customIcon: "mdi:linkedin",
    label: "Username",
  },
  facebook: {
    url: "https://facebook.com/",
    nativeIcon: "logos:facebook",
    customIcon: "mdi:facebook",
    label: "Username",
  },
  email: {
    url: "mailto: ",
    nativeIcon: "fxemoji:envelope",
    customIcon: "mdi:email",
    label: "Email",
  },
  phone: {
    url: "tel: ",
    nativeIcon: "noto:telephone-receiver",
    customIcon: "mdi:phone",
    label: "Phone Number",
  },
  whatsapp: {
    url: "https://wa.me/",
    nativeIcon: "logos:whatsapp-icon",
    customIcon: "mdi:whatsapp",
    label: "Phone Number",
  },
  discord: {
    url: "https://discord.com/",
    nativeIcon: "logos:discord-icon",
    customIcon: "ic:round-discord",
    label: "Username / Server",
  },
  telegram: {
    url: "https://t.me/",
    nativeIcon: "logos:telegram",
    customIcon: "mdi:telegram",
    label: "Username",
  },
};
