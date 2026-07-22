import { z } from "zod";

const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function isValidResendSender(value: string) {
  const trimmedValue = value.trim();
  if (emailPattern.test(trimmedValue)) {
    return true;
  }

  const namedSenderMatch = trimmedValue.match(/^([^<>]+?)\s*<([^<>]+)>$/);
  const senderEmail = namedSenderMatch?.[2]?.trim();
  if (!senderEmail) {
    return false;
  }

  return emailPattern.test(senderEmail);
}

export const envSchema = z
  .object({
    NEXT_PUBLIC_SITE_URL: z.string().trim().url(),
    NEXT_PUBLIC_SUPABASE_URL: z.string().trim().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().trim().min(1),
    SUPABASE_SERVICE_ROLE_KEY: z.string().trim().min(1),
    ADMIN_EMAIL_DOMAIN: z
      .string()
      .trim()
      .regex(/^[a-z0-9.-]+\.[a-z]{2,}$/i, "Expected a bare email domain"),
    RESEND_API_KEY: z.string().trim().optional().default(""),
    RESEND_FROM_EMAIL: z.string().trim().optional().default(""),
    CONTACT_EMAIL: z.string().trim().email(),
  })
  .superRefine((value, context) => {
    if (value.RESEND_API_KEY && !value.RESEND_FROM_EMAIL) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "RESEND_FROM_EMAIL is required when RESEND_API_KEY is set",
        path: ["RESEND_FROM_EMAIL"],
      });
    } else if (value.RESEND_API_KEY && !isValidResendSender(value.RESEND_FROM_EMAIL)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Expected a sender email like hello@example.com or Name <hello@example.com>",
        path: ["RESEND_FROM_EMAIL"],
      });
    }
  });

export type Env = z.infer<typeof envSchema>;

export function parseEnv(source: Record<string, string | undefined> = process.env): Env {
  return envSchema.parse(source);
}
