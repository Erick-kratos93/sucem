import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pages = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/pages" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      heroTitle: z.string(),
      heroSubtitle: z.string(),
      heroImage: image(),
      background: image().optional(),
      intro: z
        .object({
          title: z.string(),
          image: image(),
        })
        .optional(),
    }),
});

const home = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/home" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroVideoId: z.string(),
    intro: z.string(),
    mission: z.object({
      title: z.string(),
      body: z.string(),
    }),
    vision: z.object({
      title: z.string(),
      body: z.string(),
    }),
    about: z.string(),
    highlights: z.object({
      title: z.string(),
      paragraphs: z.array(z.string()),
    }),
    videosTitle: z.string(),
  }),
});

const structureTabs = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/structure-tabs" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      group: z.number().int().min(1).max(3),
      order: z.number().int().min(1),
      align: z.enum(["left", "center"]).default("left"),
      gallery: z.array(image()).optional(),
      sections: z
        .array(
          z.object({
            title: z.string(),
            image: image(),
            rows: z.array(z.array(z.string()).length(4)),
          }),
        )
        .optional(),
    }),
});

const institutions = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/institutions" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      group: z.enum(["CDMX", "Estado de México"]),
      description: z.string(),
      logo: image(),
      order: z.number().int().min(1),
      popup: z.string().optional(),
      socialLinks: z.object({
        whatsapp: z.string().optional(),
        facebook: z.string().optional(),
      }),
      map: z.object({
        address: z.string(),
        zoom: z.number().optional(),
      }),
    }),
});

const instructors = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/instructors" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      register: z.string(),
      grade: z.string(),
      active: z.boolean(),
      order: z.number().int().min(1),
      profile: z
        .object({
          image: image(),
          biography: z.string(),
          gallery: z.array(
            z.object({
              name: z.string(),
              video: z.string(),
            }),
          ),
        })
        .optional(),
    }),
});

const videos = defineCollection({
  loader: glob({ pattern: "*.json", base: "./src/content/videos" }),
  schema: z.object({
    title: z.string(),
    youtubeId: z.string(),
    order: z.number().int().min(1),
  }),
});

export const collections = {
  pages,
  home,
  structureTabs,
  institutions,
  instructors,
  videos,
};
