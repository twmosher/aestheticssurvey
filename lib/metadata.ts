import type { Metadata } from "next";

import { REPORT_NAME, SITE_NAME } from "@/lib/constants";

const DEFAULT_DESCRIPTION =
  "An anonymous compensation benchmark for injectors, aesthetic nurses, NPs, PAs, aestheticians and medical-aesthetic professionals across Massachusetts.";

const DEFAULT_URL = "https://aesthetic-career-club.vercel.app";

export const siteMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_URL),
  title: {
    default: `${REPORT_NAME} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: `${REPORT_NAME} | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${REPORT_NAME} | ${SITE_NAME}`,
    description: DEFAULT_DESCRIPTION,
  },
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
