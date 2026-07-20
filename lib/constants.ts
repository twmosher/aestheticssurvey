export const SITE_NAME = "Aesthetic Career Club";
export const REPORT_NAME = "Massachusetts Aesthetic Compensation Report";
export const CONTACT_EMAIL = "hello@aestheticcareerclub.com";
export const SURVEY_PATH = "/survey";

export const HERO_CONTENT = {
  headline: "Are Massachusetts aesthetic professionals being paid fairly?",
  subheadline:
    "The first independent compensation benchmark for injectors, aesthetic nurses, NPs, PAs, aestheticians and other medical-aesthetic professionals across Massachusetts.",
  supportingCopy:
    "Share your compensation anonymously. See how your pay compares. Help make the industry more transparent.",
  primaryCta: "Compare My Compensation",
  trustLine:
    "Anonymous • Approximately 4 minutes • Individual responses are never published",
} as const;

export const HOME_QUESTIONS = [
  "What should an experienced aesthetic RN actually earn in Boston?",
  "How much of injector pay should come from base compensation versus commission?",
  "Which Massachusetts practice settings are offering the strongest benefits, support, and long-term upside?",
  "Are experienced injectors, NPs, PAs, and aestheticians being paid in line with the revenue they help generate?",
] as const;

export const HOME_QUESTIONS_SUPPORTING_COPY =
  "Most professionals still piece together compensation expectations from private group chats, recruiter anecdotes, and one-off offers. This report is designed to replace guesswork with a clearer Massachusetts benchmark.";

export const HOME_QUESTIONS_CTA = "Add My Anonymous Data";

export const BENEFIT_CARDS = [
  {
    title: "See Where You Stand",
    description:
      "Contribute one anonymous response and help build a benchmark grounded in real Massachusetts compensation data.",
  },
  {
    title: "Benchmark More Than Salary",
    description:
      "Compare structure, commission, benefits, hours, and mobility factors that shape the real economics of aesthetic work.",
  },
  {
    title: "Support Better Negotiation",
    description:
      "Reliable market context helps professionals evaluate offers, advocate for fairer packages, and ask sharper questions.",
  },
  {
    title: "Strengthen Industry Transparency",
    description:
      "A clearer compensation picture benefits clinicians, operators, and the long-term health of the Massachusetts aesthetics market.",
  },
] as const;

export const PARTICIPANT_ROLES = [
  "Nurse injectors",
  "Registered nurses",
  "Nurse practitioners",
  "Physician assistants",
  "Physicians",
  "Licensed aestheticians",
  "Laser technicians",
  "Patient coordinators",
  "Practice managers",
  "Medical directors",
] as const;

export const PARTICIPANT_WORKPLACES = [
  "Med spas and aesthetic clinics",
  "Dermatology practices",
  "Plastic surgery and facial plastic surgery practices",
  "Independent physician-owned aesthetic offices",
  "Multi-location cosmetic groups",
  "Specialty clinics offering medical-aesthetic services",
] as const;

export const WHY_THIS_MATTERS_HEADLINE =
  "Compensation opacity makes it harder to build durable careers in aesthetics.";

export const WHY_THIS_MATTERS_BODY = [
  "When compensation is negotiated behind closed doors, strong professionals have less context for evaluating offers, less leverage to negotiate fairly, and less visibility into how their work is valued across the market.",
  "Practices also lose. Opaque compensation norms make it harder to recruit, retain, and structure roles thoughtfully, especially in a field where production, patient relationships, and revenue contribution can vary widely.",
  "A credible benchmark will not solve every pay question. It can, however, create a more informed starting point for careers, compensation conversations, and long-term workforce planning across Massachusetts aesthetics.",
] as const;

export const PRIVACY_TRUST_STATEMENTS = [
  "Names are not required to participate.",
  "Individual responses are never published.",
  "Results are reported only in aggregate, and very small groups may be suppressed.",
  "Employers are not notified when someone participates.",
  "Optional subscriber email information, when collected, is stored separately from anonymous survey answers.",
  "Participants can request deletion of their submitted information.",
] as const;

export const PRIVACY_CTA = "Start the Anonymous Survey";

export const ABOUT_PAGE_SECTIONS = [
  {
    title: "What Aesthetic Career Club is building",
    body: "Aesthetic Career Club is building compensation and career intelligence for medical-aesthetic professionals. The 2026 Massachusetts Aesthetic Compensation Report is the current flagship benchmark and the first public product in that broader platform.",
  },
  {
    title: "Who the report is for",
    body: "The launch report is intended for injectors, aesthetic nurses, nurse practitioners, physician assistants, aestheticians, practice leaders, and other professionals working inside Massachusetts aesthetics. It is designed for people evaluating offers, comparing structures, and understanding how compensation changes by role, credentials, autonomy, setting, and experience.",
  },
  {
    title: "How the benchmark will work",
    body: "Participants share compensation information anonymously. Responses are reviewed and ultimately reported only in aggregate. The public launch is Massachusetts-first, but the survey and reporting model are being structured now for broader long-term workforce analysis without sacrificing launch focus.",
  },
] as const;

export const PRIVACY_PAGE_SECTIONS = [
  {
    title: "What information is collected",
    body: "The survey asks about professional role, geography, licenses, scope of practice, workplace context, compensation structure, and related career factors needed to build a useful benchmark. Names are not required for the anonymous compensation survey.",
  },
  {
    title: "How the information is used",
    body: "Submitted responses are used to prepare aggregate compensation reporting for medical-aesthetic professionals, beginning with Massachusetts. Individual responses are not published, and comparison groups may be withheld when the sample size is too small to protect anonymity.",
  },
  {
    title: "How anonymity is protected",
    body: "Email capture, if offered for benchmark updates, is stored separately from anonymous survey data. Employers are not notified about participation, and participants may request deletion of submitted information.",
  },
  {
    title: "Important limitations",
    body: "The report is informational only. It is not legal, tax, employment, or compensation advice, and it should not be treated as a guarantee of what any specific employer should pay.",
  },
] as const;

export const TERMS_PAGE_SECTIONS = [
  {
    title: "Service scope",
    body: "Aesthetic Career Club provides an informational website, anonymous survey, and compensation-reporting product focused initially on the Massachusetts medical-aesthetic market. Access to the site does not create an employment, legal, or advisory relationship.",
  },
  {
    title: "Participant expectations",
    body: "Participants should provide truthful information to the best of their knowledge and should only submit information they are comfortable sharing anonymously. The service may limit, reject, or remove submissions that appear intentionally false, abusive, or duplicative.",
  },
  {
    title: "Report use",
    body: "Any published benchmark or report is provided for general informational use only. It should be considered one input among many when evaluating compensation, hiring, staffing, or business decisions.",
  },
  {
    title: "Contact",
    body: `Questions about these terms can be sent to ${CONTACT_EMAIL}.`,
  },
] as const;
