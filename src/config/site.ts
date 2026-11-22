export interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  locale: string;
  navigation: NavigationItem[];
}

export const site: SiteConfig = {
  name: "SUCEM",
  tagline: "Arte Marcial Mexicano",
  description:
    "SUCEM, arte marcial mexicano. Conoce nuestra historia, estructura, instituciones y profesores.",
  locale: "es-MX",
  navigation: [
    {
      label: "Inicio",
      href: "/",
    },
    {
      label: "¡Conocenos!",
      href: "/#conocenos",
      children: [
        {
          label: "Misión",
          href: "/#mision",
        },
        {
          label: "Visión",
          href: "/#vision",
        },
      ],
    },
    {
      label: "Videos",
      href: "/#videos",
    },
    {
      label: "Estructura",
      href: "/estructura-sucem/",
      children: [
        {
          label: "Historia",
          href: "/estructura-sucem/#historia",
        },
        {
          label: "Significado",
          href: "/estructura-sucem/#significado",
        },
        {
          label: "Beneficios",
          href: "/estructura-sucem/#beneficios",
        },
        {
          label: "Avales",
          href: "/estructura-sucem/#avales",
        },
        {
          label: "Afíliate",
          href: "/estructura-sucem/#afiliate",
        },
        {
          label: "Grados",
          href: "/estructura-sucem/#grados",
        },
        {
          label: "Credo",
          href: "/estructura-sucem/#credo",
        },
        {
          label: "Filosofía",
          href: "/estructura-sucem/#filosofia",
        },
        {
          label: "Profesores",
          href: "/estructura-sucem/#profesores",
        },
      ],
    },
    {
      label: "Instituciones",
      href: "/instituciones-sucem/",
    },
    {
      label: "Contacto",
      href: "/contacto-sucem/",
    },
  ],
};
