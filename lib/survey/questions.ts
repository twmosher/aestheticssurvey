import type {
  BenefitAnswer,
  CommissionTypeAnswer,
  CompensationStructureAnswer,
  EmployerLocationCountAnswer,
  EmployerTenureAnswer,
  EmploymentArrangementAnswer,
  ExperienceAnswer,
  FairnessScoreAnswer,
  InjectableVolumeRangeAnswer,
  JobMobilityAnswer,
  MonthlyRevenueRangeAnswer,
  ReasonToLeaveAnswer,
  RegionAnswer,
  RequestedPatientPercentageRangeAnswer,
  RestrictiveAgreementAnswer,
  RoleAnswer,
  SalesExpectationAnswer,
  ServicePerformedAnswer,
  SurveyQuestion,
  SurveyQuestionOption,
  TotalAnnualEarningsRangeAnswer,
  WeeklyHoursAnswer,
  WorkplaceTypeAnswer,
  YesNoAnswer,
} from "@/lib/survey/types";

const roleOptions: readonly SurveyQuestionOption<RoleAnswer>[] = [
  { value: "nurse_injector", label: "Nurse injector" },
  { value: "registered_nurse", label: "Registered nurse" },
  { value: "nurse_practitioner", label: "Nurse practitioner" },
  { value: "physician_assistant", label: "Physician assistant" },
  { value: "physician", label: "Physician" },
  { value: "licensed_aesthetician", label: "Licensed aesthetician" },
  { value: "laser_technician", label: "Laser technician" },
  { value: "patient_coordinator", label: "Patient coordinator" },
  { value: "practice_manager", label: "Practice manager" },
  { value: "medical_director", label: "Medical director" },
  { value: "other", label: "Other" },
] as const;

const regionOptions: readonly SurveyQuestionOption<RegionAnswer>[] = [
  { value: "greater_boston", label: "Greater Boston" },
  { value: "north_shore", label: "North Shore" },
  { value: "south_shore", label: "South Shore" },
  { value: "cape_and_islands", label: "Cape and Islands" },
  { value: "central_massachusetts", label: "Central Massachusetts" },
  { value: "western_massachusetts", label: "Western Massachusetts" },
  { value: "statewide_multi_region", label: "Statewide or multi-region" },
] as const;

const experienceOptions: readonly SurveyQuestionOption<ExperienceAnswer>[] = [
  { value: "under_1_year", label: "Under 1 year" },
  { value: "one_to_two_years", label: "1 to 2 years" },
  { value: "three_to_five_years", label: "3 to 5 years" },
  { value: "six_to_ten_years", label: "6 to 10 years" },
  { value: "more_than_ten_years", label: "More than 10 years" },
] as const;

const workplaceTypeOptions: readonly SurveyQuestionOption<WorkplaceTypeAnswer>[] = [
  { value: "med_spa", label: "Med spa or aesthetic clinic" },
  { value: "dermatology_practice", label: "Dermatology practice" },
  { value: "plastic_surgery_practice", label: "Plastic surgery practice" },
  { value: "physician_owned_aesthetic_office", label: "Independent physician-owned office" },
  { value: "multi_location_group", label: "Multi-location cosmetic group" },
  { value: "specialty_clinic", label: "Specialty clinic with aesthetic services" },
  { value: "other", label: "Other" },
] as const;

const employerLocationCountOptions: readonly SurveyQuestionOption<EmployerLocationCountAnswer>[] =
  [
    { value: "one_location", label: "1 location" },
    { value: "two_to_three_locations", label: "2 to 3 locations" },
    { value: "four_to_ten_locations", label: "4 to 10 locations" },
    { value: "more_than_ten_locations", label: "More than 10 locations" },
    { value: "not_sure", label: "Not sure" },
  ] as const;

const employmentArrangementOptions: readonly SurveyQuestionOption<EmploymentArrangementAnswer>[] = [
  { value: "full_time_employee", label: "Full-time employee" },
  { value: "part_time_employee", label: "Part-time employee" },
  { value: "independent_contractor", label: "Independent contractor" },
  { value: "per_diem", label: "Per diem" },
  { value: "owner_partner", label: "Owner or partner" },
  { value: "other", label: "Other" },
] as const;

const weeklyHoursOptions: readonly SurveyQuestionOption<WeeklyHoursAnswer>[] = [
  { value: "under_20", label: "Under 20 hours" },
  { value: "20_to_29", label: "20 to 29 hours" },
  { value: "30_to_39", label: "30 to 39 hours" },
  { value: "40_to_49", label: "40 to 49 hours" },
  { value: "50_or_more", label: "50 or more hours" },
] as const;

const employerTenureOptions: readonly SurveyQuestionOption<EmployerTenureAnswer>[] = [
  { value: "under_6_months", label: "Under 6 months" },
  { value: "6_to_12_months", label: "6 to 12 months" },
  { value: "1_to_2_years", label: "1 to 2 years" },
  { value: "3_to_5_years", label: "3 to 5 years" },
  { value: "more_than_5_years", label: "More than 5 years" },
] as const;

const restrictiveAgreementOptions: readonly SurveyQuestionOption<RestrictiveAgreementAnswer>[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not_sure", label: "Not sure" },
] as const;

const compensationStructureOptions: readonly SurveyQuestionOption<CompensationStructureAnswer>[] = [
  { value: "hourly", label: "Hourly only" },
  { value: "salary", label: "Salary only" },
  { value: "salary_plus_hourly", label: "Salary plus hourly" },
  { value: "salary_plus_commission", label: "Salary plus commission" },
  { value: "hourly_plus_commission", label: "Hourly plus commission" },
  { value: "commission_only", label: "Commission only" },
  { value: "other", label: "Other" },
] as const;

function compensationStructureIncludesCommission(value: CompensationStructureAnswer | "") {
  return (
    value === "salary_plus_commission" ||
    value === "hourly_plus_commission" ||
    value === "commission_only"
  );
}

const yesNoOptions: readonly SurveyQuestionOption<YesNoAnswer>[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

const commissionTypeOptions: readonly SurveyQuestionOption<CommissionTypeAnswer>[] = [
  { value: "percentage_of_services", label: "Straight percentage of services or production" },
  { value: "tiered_percentage", label: "Tiered percentage" },
  { value: "flat_bonus", label: "Flat bonus or per-treatment bonus" },
  { value: "draw_against_commission", label: "Draw against commission" },
  { value: "hybrid", label: "Hybrid or mixed formula" },
  { value: "other", label: "Other" },
] as const;

const totalAnnualEarningsRangeOptions: readonly SurveyQuestionOption<TotalAnnualEarningsRangeAnswer>[] =
  [
    { value: "under_75000", label: "Under $75,000" },
    { value: "75000_to_99999", label: "$75,000 to $99,999" },
    { value: "100000_to_124999", label: "$100,000 to $124,999" },
    { value: "125000_to_149999", label: "$125,000 to $149,999" },
    { value: "150000_to_199999", label: "$150,000 to $199,999" },
    { value: "200000_to_249999", label: "$200,000 to $249,999" },
    { value: "250000_or_more", label: "$250,000 or more" },
  ] as const;

const benefitOptions: readonly SurveyQuestionOption<BenefitAnswer>[] = [
  { value: "health_insurance", label: "Health insurance" },
  { value: "dental_or_vision", label: "Dental or vision coverage" },
  { value: "paid_time_off", label: "Paid time off" },
  { value: "retirement_plan", label: "Retirement plan" },
  { value: "continuing_education", label: "Continuing education support" },
  { value: "free_or_discounted_treatments", label: "Free or discounted treatments" },
  { value: "parental_leave", label: "Parental leave" },
  { value: "bonus_program", label: "Bonus program" },
  { value: "none", label: "None of the above" },
] as const;

const servicePerformedOptions: readonly SurveyQuestionOption<ServicePerformedAnswer>[] = [
  { value: "neuromodulators", label: "Neuromodulators" },
  { value: "dermal_fillers", label: "Dermal fillers" },
  { value: "biostimulators", label: "Biostimulators" },
  { value: "laser_treatments", label: "Laser treatments" },
  { value: "energy_devices", label: "Energy-based devices" },
  { value: "body_contouring", label: "Body contouring" },
  { value: "facials_or_peels", label: "Facials or peels" },
  { value: "consultations_only", label: "Consultations only" },
  { value: "other", label: "Other" },
] as const;

const injectableVolumeRangeOptions: readonly SurveyQuestionOption<InjectableVolumeRangeAnswer>[] =
  [
    { value: "none", label: "None" },
    { value: "1_to_20", label: "1 to 20" },
    { value: "21_to_40", label: "21 to 40" },
    { value: "41_to_60", label: "41 to 60" },
    { value: "61_to_100", label: "61 to 100" },
    { value: "more_than_100", label: "More than 100" },
  ] as const;

const monthlyRevenueRangeOptions: readonly SurveyQuestionOption<MonthlyRevenueRangeAnswer>[] = [
  { value: "under_25000", label: "Under $25,000" },
  { value: "25000_to_49999", label: "$25,000 to $49,999" },
  { value: "50000_to_74999", label: "$50,000 to $74,999" },
  { value: "75000_to_99999", label: "$75,000 to $99,999" },
  { value: "100000_to_149999", label: "$100,000 to $149,999" },
  { value: "150000_or_more", label: "$150,000 or more" },
  { value: "not_tracked", label: "Not tracked or not sure" },
] as const;

const requestedPatientPercentageRangeOptions: readonly SurveyQuestionOption<RequestedPatientPercentageRangeAnswer>[] =
  [
    { value: "under_10", label: "Under 10%" },
    { value: "10_to_24", label: "10% to 24%" },
    { value: "25_to_49", label: "25% to 49%" },
    { value: "50_to_74", label: "50% to 74%" },
    { value: "75_or_more", label: "75% or more" },
    { value: "not_sure", label: "Not sure" },
  ] as const;

const salesExpectationOptions: readonly SurveyQuestionOption<SalesExpectationAnswer>[] = [
  { value: "minimal", label: "Minimal" },
  { value: "moderate", label: "Moderate" },
  { value: "high", label: "High" },
  { value: "very_high", label: "Very high" },
] as const;

const fairnessScoreOptions: readonly SurveyQuestionOption<FairnessScoreAnswer>[] = [
  { value: "1", label: "1 - Very unfair" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5 - Very fair" },
] as const;

const jobMobilityOptions: readonly SurveyQuestionOption<JobMobilityAnswer>[] = [
  { value: "not_open", label: "Not open to moving" },
  { value: "somewhat_open", label: "Somewhat open" },
  { value: "actively_exploring", label: "Actively exploring" },
  { value: "ready_to_move_for_the_right_offer", label: "Ready to move for the right offer" },
] as const;

const reasonToLeaveOptions: readonly SurveyQuestionOption<ReasonToLeaveAnswer>[] = [
  { value: "higher_pay", label: "Higher pay" },
  { value: "better_schedule", label: "Better schedule" },
  { value: "better_benefits", label: "Better benefits" },
  { value: "more_support", label: "More support or training" },
  { value: "clearer_growth_path", label: "Clearer growth path" },
  { value: "less_sales_pressure", label: "Less sales pressure" },
  { value: "leadership_issues", label: "Leadership issues" },
  { value: "want_to_start_or_join_a_practice", label: "Want to start or join a practice" },
] as const;

export const SURVEY_QUESTIONS = [
  {
    id: "role",
    databaseField: "role",
    section: "Professional profile",
    label: "Which role best describes your current work in medical aesthetics?",
    input: "single_select",
    options: roleOptions,
  },
  {
    id: "region",
    databaseField: "region",
    section: "Professional profile",
    label: "Which part of Massachusetts do you primarily work in?",
    input: "single_select",
    options: regionOptions,
  },
  {
    id: "aestheticsExperience",
    databaseField: "aesthetics_experience",
    section: "Professional profile",
    label: "How many years have you worked in medical aesthetics?",
    input: "single_select",
    options: experienceOptions,
  },
  {
    id: "healthcareExperience",
    databaseField: "healthcare_experience",
    section: "Professional profile",
    label: "How many total years have you worked in healthcare?",
    input: "single_select",
    options: experienceOptions,
  },
  {
    id: "workplaceType",
    databaseField: "workplace_type",
    section: "Professional profile",
    label: "What type of workplace do you primarily work in?",
    input: "single_select",
    options: workplaceTypeOptions,
  },
  {
    id: "employerLocationCount",
    databaseField: "employer_location_count",
    section: "Work structure",
    label: "How many locations does your employer operate?",
    input: "single_select",
    options: employerLocationCountOptions,
  },
  {
    id: "employmentArrangement",
    databaseField: "employment_arrangement",
    section: "Work structure",
    label: "What is your employment arrangement?",
    input: "single_select",
    options: employmentArrangementOptions,
  },
  {
    id: "weeklyHours",
    databaseField: "weekly_hours",
    section: "Work structure",
    label: "About how many hours do you work in a typical week?",
    input: "single_select",
    options: weeklyHoursOptions,
  },
  {
    id: "employerTenure",
    databaseField: "employer_tenure",
    section: "Work structure",
    label: "How long have you been with your current employer?",
    input: "single_select",
    options: employerTenureOptions,
  },
  {
    id: "restrictiveAgreement",
    databaseField: "restrictive_agreement",
    section: "Work structure",
    label: "Are you subject to a non-compete, non-solicit, or similar restrictive agreement?",
    input: "single_select",
    options: restrictiveAgreementOptions,
  },
  {
    id: "compensationStructure",
    databaseField: "compensation_structure",
    section: "Compensation",
    label: "How are you primarily compensated in your current role?",
    input: "single_select",
    options: compensationStructureOptions,
  },
  {
    id: "hourlyRate",
    databaseField: "hourly_rate",
    section: "Compensation",
    label: "What is your hourly rate?",
    description: "Use base hourly pay before bonuses or commissions.",
    input: "currency",
    visibleWhen: (answers) =>
      answers.compensationStructure === "hourly" ||
      answers.compensationStructure === "hourly_plus_commission" ||
      answers.compensationStructure === "salary_plus_hourly",
  },
  {
    id: "annualSalary",
    databaseField: "annual_salary",
    section: "Compensation",
    label: "What is your annual salary?",
    description: "Use gross base salary before bonuses or commissions.",
    input: "currency",
    visibleWhen: (answers) =>
      answers.compensationStructure === "salary" ||
      answers.compensationStructure === "salary_plus_commission" ||
      answers.compensationStructure === "salary_plus_hourly",
  },
  {
    id: "receivesCommission",
    databaseField: "receives_commission",
    section: "Compensation",
    label: "Do you receive commission in addition to your base compensation?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "commissionType",
    databaseField: "commission_type",
    section: "Compensation",
    label: "What kind of commission structure do you receive?",
    input: "single_select",
    options: commissionTypeOptions,
    visibleWhen: (answers) =>
      compensationStructureIncludesCommission(answers.compensationStructure) ||
      answers.receivesCommission === "yes",
  },
  {
    id: "commissionValue",
    databaseField: "commission_value",
    section: "Compensation",
    label: "What is your commission rate or amount?",
    description: "Enter the percentage or flat amount that best matches your arrangement.",
    input: "text",
    visibleWhen: (answers) =>
      compensationStructureIncludesCommission(answers.compensationStructure) ||
      answers.receivesCommission === "yes",
  },
  {
    id: "totalAnnualEarningsRange",
    databaseField: "total_annual_earnings_range",
    section: "Compensation",
    label: "What were your approximate total annual earnings over the last 12 months?",
    input: "single_select",
    options: totalAnnualEarningsRangeOptions,
  },
  {
    id: "benefits",
    databaseField: "benefits",
    section: "Skills and production",
    label: "Which benefits do you currently receive?",
    input: "multi_select",
    options: benefitOptions,
  },
  {
    id: "servicesPerformed",
    databaseField: "services_performed",
    section: "Skills and production",
    label: "Which services do you personally perform?",
    input: "multi_select",
    options: servicePerformedOptions,
  },
  {
    id: "injectableVolumeRange",
    databaseField: "injectable_volume_range",
    section: "Skills and production",
    label: "About how many injectable patients or treatment appointments do you handle in a typical month?",
    input: "single_select",
    options: injectableVolumeRangeOptions,
  },
  {
    id: "monthlyRevenueRange",
    databaseField: "monthly_revenue_range",
    section: "Skills and production",
    label: "What monthly revenue range do you directly produce or strongly influence?",
    input: "single_select",
    options: monthlyRevenueRangeOptions,
  },
  {
    id: "bringsPatientFollowing",
    databaseField: "brings_patient_following",
    section: "Skills and production",
    label: "Did you bring an existing patient following into this role?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "requestedPatientPercentageRange",
    databaseField: "requested_patient_percentage_range",
    section: "Skills and production",
    label: "Roughly what percentage of your patients specifically request you?",
    input: "single_select",
    options: requestedPatientPercentageRangeOptions,
  },
  {
    id: "salesExpectation",
    databaseField: "sales_expectation",
    section: "Skills and production",
    label: "How strong are the sales or upsell expectations in your role?",
    input: "single_select",
    options: salesExpectationOptions,
  },
  {
    id: "compensationFairnessScore",
    databaseField: "compensation_fairness_score",
    section: "Satisfaction and mobility",
    label: "How fair does your compensation feel relative to the value you create?",
    input: "rating",
    options: fairnessScoreOptions,
  },
  {
    id: "jobMobility",
    databaseField: "job_mobility",
    section: "Satisfaction and mobility",
    label: "How open are you to changing jobs in the next 12 months if the right opportunity appears?",
    input: "single_select",
    options: jobMobilityOptions,
  },
  {
    id: "reasonsToLeave",
    databaseField: "reasons_to_leave",
    section: "Satisfaction and mobility",
    label: "What would make you most likely to leave your current role?",
    input: "multi_select",
    options: reasonToLeaveOptions,
  },
  {
    id: "compensationFrustration",
    databaseField: "compensation_frustration",
    section: "Satisfaction and mobility",
    label: "What is the biggest frustration you have with compensation in your market?",
    input: "textarea",
  },
  {
    id: "employerRetentionFeedback",
    databaseField: "employer_retention_feedback",
    section: "Satisfaction and mobility",
    label: "What do employers most often get wrong when trying to retain strong aesthetic talent?",
    input: "textarea",
  },
  {
    id: "consented",
    databaseField: "consented",
    section: "Consent",
    label:
      "I understand that my responses will be analyzed in aggregate for workforce research and compensation benchmarking.",
    input: "consent",
  },
] as const satisfies readonly SurveyQuestion[];
