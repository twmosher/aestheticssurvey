import type {
  AdditionalLicenseAnswer,
  AdvancedTrainingAnswer,
  BenefitAnswer,
  BoardCertificationTypeAnswer,
  CommissionTypeAnswer,
  CompensationStructureAnswer,
  DeviceCertificationAnswer,
  EmployerLocationCountAnswer,
  EmployerTenureAnswer,
  EmploymentArrangementAnswer,
  ExperienceAnswer,
  FairnessScoreAnswer,
  InjectableVolumeRangeAnswer,
  JobMobilityAnswer,
  LicenseArrangementAnswer,
  MonthlyRevenueRangeAnswer,
  PrimaryLicenseAnswer,
  ReasonToLeaveAnswer,
  RegionAnswer,
  RequestedPatientPercentageRangeAnswer,
  RestrictiveAgreementAnswer,
  RoleAnswer,
  RoleTrackAnswer,
  SalesExpectationAnswer,
  ServicePerformedAnswer,
  StateAnswer,
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

const roleTrackOptions: readonly SurveyQuestionOption<RoleTrackAnswer>[] = [
  { value: "clinical", label: "Mostly clinical" },
  { value: "operational", label: "Mostly operational" },
  { value: "ownership", label: "Mostly ownership or executive" },
  { value: "hybrid", label: "Hybrid" },
] as const;

const ownershipStatusOptions = [
  { value: "employee", label: "No ownership stake" },
  { value: "minority_owner", label: "Minority owner or partner" },
  { value: "majority_owner", label: "Majority owner or lead partner" },
  { value: "sole_owner", label: "Sole owner" },
] as const;

const stateOptions: readonly SurveyQuestionOption<StateAnswer>[] = [
  { value: "massachusetts", label: "Massachusetts" },
  { value: "connecticut", label: "Connecticut" },
  { value: "rhode_island", label: "Rhode Island" },
  { value: "new_hampshire", label: "New Hampshire" },
  { value: "maine", label: "Maine" },
  { value: "vermont", label: "Vermont" },
  { value: "new_york", label: "New York" },
  { value: "new_jersey", label: "New Jersey" },
  { value: "florida", label: "Florida" },
  { value: "california", label: "California" },
  { value: "texas", label: "Texas" },
  { value: "other_us_state", label: "Other US state" },
] as const;

const regionOptions: readonly SurveyQuestionOption<RegionAnswer>[] = [
  { value: "boston", label: "Boston" },
  { value: "cambridge_somerville", label: "Cambridge and Somerville" },
  { value: "north_shore", label: "North Shore" },
  { value: "metrowest", label: "MetroWest" },
  { value: "south_shore", label: "South Shore" },
  { value: "central_massachusetts", label: "Central Massachusetts" },
  { value: "western_massachusetts", label: "Western Massachusetts" },
  { value: "cape_cod_and_islands", label: "Cape Cod and Islands" },
  { value: "other_massachusetts", label: "Other Massachusetts" },
] as const;

const experienceOptions: readonly SurveyQuestionOption<ExperienceAnswer>[] = [
  { value: "under_1_year", label: "Less than 1 year" },
  { value: "one_to_two_years", label: "1 to 2 years" },
  { value: "three_to_five_years", label: "3 to 5 years" },
  { value: "six_to_ten_years", label: "6 to 10 years" },
  { value: "more_than_ten_years", label: "More than 10 years" },
] as const;

const workplaceTypeOptions: readonly SurveyQuestionOption<WorkplaceTypeAnswer>[] = [
  { value: "independent_med_spa", label: "Independent med spa" },
  { value: "multi_location_med_spa_group", label: "Multi-location med-spa group" },
  { value: "dermatology_practice", label: "Dermatology practice" },
  { value: "plastic_surgery_practice", label: "Plastic-surgery practice" },
  { value: "hospital_or_health_system", label: "Hospital or health system" },
  { value: "wellness_or_longevity_clinic", label: "Wellness or longevity clinic" },
  { value: "self_employed", label: "Self-employed" },
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

const primaryLicenseOptions: readonly SurveyQuestionOption<PrimaryLicenseAnswer>[] = [
  { value: "rn", label: "Registered nurse" },
  { value: "np", label: "Nurse practitioner" },
  { value: "pa", label: "Physician assistant" },
  { value: "md_do", label: "Physician (MD/DO)" },
  { value: "licensed_aesthetician", label: "Licensed aesthetician" },
  { value: "laser_certified_technician", label: "Laser-certified technician" },
  { value: "practice_administrator", label: "Administrative or managerial role" },
  { value: "none_nonclinical", label: "No clinical license" },
  { value: "other", label: "Other" },
] as const;

const additionalLicenseOptions: readonly SurveyQuestionOption<AdditionalLicenseAnswer>[] = [
  { value: "rn", label: "Registered nurse" },
  { value: "np", label: "Nurse practitioner" },
  { value: "pa", label: "Physician assistant" },
  { value: "md_do", label: "Physician (MD/DO)" },
  { value: "licensed_aesthetician", label: "Licensed aesthetician" },
  { value: "laser_certified_technician", label: "Laser-certified technician" },
  { value: "prescriber", label: "Separate prescriber credential" },
  { value: "managerial", label: "Administrative or managerial credential" },
  { value: "other", label: "Other" },
] as const;

const yesNoOptions: readonly SurveyQuestionOption<YesNoAnswer>[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

const boardCertificationTypeOptions: readonly SurveyQuestionOption<BoardCertificationTypeAnswer>[] =
  [
    { value: "dermatology", label: "Dermatology" },
    { value: "plastic_surgery", label: "Plastic surgery" },
    { value: "family_medicine", label: "Family medicine" },
    { value: "internal_medicine", label: "Internal medicine" },
    { value: "emergency_medicine", label: "Emergency medicine" },
    { value: "nurse_practitioner", label: "Nurse practitioner board certification" },
    { value: "physician_assistant", label: "Physician assistant certification" },
    { value: "aesthetic_or_laser", label: "Aesthetic or laser certification" },
    { value: "other", label: "Other" },
  ] as const;

const licenseArrangementOptions: readonly SurveyQuestionOption<LicenseArrangementAnswer>[] = [
  { value: "under_my_own_license", label: "Under my own license" },
  { value: "under_another_clinicians_license", label: "Under another clinician's license" },
  { value: "delegated_arrangement", label: "Delegated or supervisory arrangement" },
  { value: "not_applicable", label: "Not applicable" },
] as const;

const advancedTrainingOptions: readonly SurveyQuestionOption<AdvancedTrainingAnswer>[] = [
  { value: "manufacturer_training", label: "Manufacturer training" },
  { value: "cadaver_training", label: "Cadaver training" },
  { value: "advanced_injector_coursework", label: "Advanced injector coursework" },
  { value: "laser_safety_training", label: "Laser safety training" },
  { value: "business_or_management_training", label: "Business or management training" },
  { value: "formal_fellowship_or_preceptorship", label: "Formal fellowship or preceptorship" },
  { value: "none", label: "None of the above" },
  { value: "other", label: "Other" },
] as const;

const deviceCertificationOptions: readonly SurveyQuestionOption<DeviceCertificationAnswer>[] = [
  { value: "laser_safety_officer", label: "Laser safety officer" },
  { value: "manufacturer_device_certification", label: "Manufacturer device certification" },
  { value: "coolsculpting_or_body_contouring", label: "Body contouring certification" },
  { value: "radiofrequency_or_ultrasound", label: "RF or ultrasound device certification" },
  { value: "ipl_or_photofacial", label: "IPL or photofacial certification" },
  { value: "none", label: "None of the above" },
  { value: "other", label: "Other" },
] as const;

const employmentArrangementOptions: readonly SurveyQuestionOption<EmploymentArrangementAnswer>[] = [
  { value: "full_time_employee", label: "Full-time employee" },
  { value: "part_time_employee", label: "Part-time employee" },
  { value: "independent_contractor", label: "Independent contractor" },
  { value: "per_diem", label: "Per diem" },
  { value: "owner", label: "Owner" },
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
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

const compensationStructureOptions: readonly SurveyQuestionOption<CompensationStructureAnswer>[] =
  [
    { value: "hourly", label: "Hourly" },
    { value: "salary", label: "Salary" },
    { value: "commission_only", label: "Commission only" },
    { value: "hourly_plus_commission", label: "Hourly plus commission" },
    { value: "salary_plus_commission", label: "Salary plus commission" },
    { value: "production_bonus", label: "Production bonus" },
    { value: "other", label: "Other" },
  ] as const;

function compensationStructureIncludesCommission(value: CompensationStructureAnswer | "") {
  return (
    value === "commission_only" ||
    value === "hourly_plus_commission" ||
    value === "salary_plus_commission" ||
    value === "production_bonus"
  );
}

const commissionTypeOptions: readonly SurveyQuestionOption<CommissionTypeAnswer>[] = [
  { value: "percentage_of_personal_revenue", label: "Percentage of personal revenue" },
  { value: "percentage_of_collected_revenue", label: "Percentage of collected revenue" },
  { value: "percentage_of_profit", label: "Percentage of profit" },
  { value: "per_treatment_bonus", label: "Per-treatment bonus" },
  { value: "tiered_production_bonus", label: "Tiered production bonus" },
  { value: "retail_commission", label: "Retail commission" },
  { value: "tips", label: "Tips" },
  { value: "other", label: "Other" },
] as const;

const totalAnnualEarningsRangeOptions: readonly SurveyQuestionOption<TotalAnnualEarningsRangeAnswer>[] =
  [
    { value: "under_50000", label: "Under $50,000" },
    { value: "50000_to_74999", label: "$50,000 to $74,999" },
    { value: "75000_to_99999", label: "$75,000 to $99,999" },
    { value: "100000_to_124999", label: "$100,000 to $124,999" },
    { value: "125000_to_149999", label: "$125,000 to $149,999" },
    { value: "150000_to_199999", label: "$150,000 to $199,999" },
    { value: "200000_to_249999", label: "$200,000 to $249,999" },
    { value: "250000_or_more", label: "$250,000 or more" },
    { value: "prefer_not_to_say", label: "Prefer not to say" },
  ] as const;

const benefitOptions: readonly SurveyQuestionOption<BenefitAnswer>[] = [
  { value: "health_insurance", label: "Health insurance" },
  { value: "dental_insurance", label: "Dental insurance" },
  { value: "retirement_contribution", label: "Retirement contribution" },
  { value: "paid_time_off", label: "Paid time off" },
  { value: "paid_training", label: "Paid training" },
  { value: "free_or_discounted_treatments", label: "Free or discounted treatments" },
  { value: "product_discounts", label: "Product discounts" },
  { value: "malpractice_coverage", label: "Malpractice coverage" },
  { value: "continuing_education_allowance", label: "Continuing education allowance" },
  { value: "none", label: "None" },
  { value: "other", label: "Other" },
] as const;

const servicePerformedOptions: readonly SurveyQuestionOption<ServicePerformedAnswer>[] = [
  { value: "neuromodulators", label: "Neuromodulators" },
  { value: "dermal_filler", label: "Dermal filler" },
  { value: "biostimulators", label: "Biostimulators" },
  { value: "prp_or_prf", label: "PRP or PRF" },
  { value: "laser_treatments", label: "Laser treatments" },
  { value: "ipl", label: "IPL" },
  { value: "microneedling", label: "Microneedling" },
  { value: "radiofrequency_treatments", label: "Radiofrequency treatments" },
  { value: "body_contouring", label: "Body contouring" },
  { value: "facials_and_skin_treatments", label: "Facials and skin treatments" },
  { value: "weight_management_services", label: "Weight-management services" },
  {
    value: "consultations_and_treatment_planning",
    label: "Consultations and treatment planning",
  },
  { value: "other", label: "Other" },
] as const;

const injectableVolumeRangeOptions: readonly SurveyQuestionOption<InjectableVolumeRangeAnswer>[] =
  [
    { value: "none", label: "None" },
    { value: "1_to_10", label: "1 to 10" },
    { value: "11_to_25", label: "11 to 25" },
    { value: "26_to_50", label: "26 to 50" },
    { value: "51_to_100", label: "51 to 100" },
    { value: "more_than_100", label: "More than 100" },
  ] as const;

const monthlyRevenueRangeOptions: readonly SurveyQuestionOption<MonthlyRevenueRangeAnswer>[] = [
  { value: "do_not_know", label: "I do not know" },
  { value: "under_10000", label: "Under $10,000" },
  { value: "10000_to_24999", label: "$10,000 to $24,999" },
  { value: "25000_to_49999", label: "$25,000 to $49,999" },
  { value: "50000_to_74999", label: "$50,000 to $74,999" },
  { value: "75000_to_99999", label: "$75,000 to $99,999" },
  { value: "100000_or_more", label: "$100,000 or more" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
] as const;

const requestedPatientPercentageRangeOptions: readonly SurveyQuestionOption<RequestedPatientPercentageRangeAnswer>[] =
  [
    { value: "under_10_percent", label: "Under 10%" },
    { value: "10_to_24_percent", label: "10% to 24%" },
    { value: "25_to_49_percent", label: "25% to 49%" },
    { value: "50_to_74_percent", label: "50% to 74%" },
    { value: "75_percent_or_more", label: "75% or more" },
    { value: "not_sure", label: "Not sure" },
  ] as const;

const salesExpectationOptions: readonly SurveyQuestionOption<SalesExpectationAnswer>[] = [
  { value: "yes_formally_measured", label: "Yes, formally measured" },
  { value: "yes_informally_expected", label: "Yes, informally expected" },
  { value: "no", label: "No" },
  { value: "not_sure", label: "Not sure" },
] as const;

const fairnessScoreOptions: readonly SurveyQuestionOption<FairnessScoreAnswer>[] = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
] as const;

const jobMobilityOptions: readonly SurveyQuestionOption<JobMobilityAnswer>[] = [
  { value: "very_unlikely", label: "Very unlikely" },
  { value: "unlikely", label: "Unlikely" },
  { value: "open_to_hearing", label: "Open to hearing about opportunities" },
  { value: "likely", label: "Likely" },
  { value: "actively_looking", label: "Actively looking" },
] as const;

const reasonToLeaveOptions: readonly SurveyQuestionOption<ReasonToLeaveAnswer>[] = [
  { value: "higher_compensation", label: "Higher compensation" },
  { value: "better_schedule", label: "Better schedule" },
  { value: "stronger_leadership", label: "Stronger leadership" },
  { value: "more_training", label: "More training" },
  { value: "more_autonomy", label: "More autonomy" },
  { value: "better_benefits", label: "Better benefits" },
  { value: "more_advanced_treatments", label: "More advanced treatments" },
  { value: "better_workplace_culture", label: "Better workplace culture" },
  { value: "ownership_opportunity", label: "Ownership opportunity" },
  { value: "less_pressure_to_sell", label: "Less pressure to sell" },
  { value: "other", label: "Other" },
] as const;

export const SURVEY_QUESTIONS: readonly SurveyQuestion[] = [
  {
    id: "role",
    databaseField: "role",
    section: "Professional profile",
    label: "Which role best describes your current work in medical aesthetics?",
    input: "single_select",
    options: roleOptions,
  },
  {
    id: "roleTrack",
    databaseField: "role_track",
    section: "Professional profile",
    label: "Which description best fits your current role mix?",
    input: "single_select",
    options: roleTrackOptions,
  },
  {
    id: "personallyPerformsProcedures",
    databaseField: "personally_performs_procedures",
    section: "Professional profile",
    label: "Do you personally perform aesthetic procedures in your current role?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "supervisesClinicians",
    databaseField: "supervises_clinicians",
    section: "Professional profile",
    label: "Do you supervise other clinicians or treatment providers?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "ownershipStatus",
    databaseField: "ownership_status",
    section: "Professional profile",
    label: "Which ownership statement best describes you today?",
    input: "single_select",
    options: ownershipStatusOptions,
  },
  {
    id: "primaryState",
    databaseField: "primary_state",
    section: "Professional profile",
    label: "What is your primary state of practice?",
    input: "single_select",
    options: stateOptions,
  },
  {
    id: "practicesInMassachusetts",
    databaseField: "practices_in_massachusetts",
    section: "Professional profile",
    label: "Do you currently practice in Massachusetts?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "practicesInMultipleStates",
    databaseField: "practices_in_multiple_states",
    section: "Professional profile",
    label: "Do you currently practice or hold active work across more than one state?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "activeStates",
    databaseField: "active_states",
    section: "Professional profile",
    label: "Which states are active parts of your current practice footprint?",
    description: "Select every state where you actively practice, work, or maintain a meaningful patient base.",
    input: "multi_select",
    options: stateOptions,
    visibleWhen: (answers) => answers.practicesInMultipleStates === "yes",
  },
  {
    id: "region",
    databaseField: "region",
    section: "Professional profile",
    label: "Which part of Massachusetts do you primarily work in?",
    input: "single_select",
    options: regionOptions,
    visibleWhen: (answers) => answers.practicesInMassachusetts === "yes",
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
    label: "How many total years have you worked in healthcare overall?",
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
    section: "Professional profile",
    label: "How many locations does your employer operate?",
    input: "single_select",
    options: employerLocationCountOptions,
  },
  {
    id: "primaryLicense",
    databaseField: "primary_license",
    section: "Credentials and scope",
    label: "What is your primary professional license or credential?",
    input: "single_select",
    options: primaryLicenseOptions,
  },
  {
    id: "additionalLicenses",
    databaseField: "additional_licenses",
    section: "Credentials and scope",
    label: "Do you hold additional licenses or credentials that matter to your role?",
    description: "Select all that apply.",
    required: false,
    input: "multi_select",
    options: additionalLicenseOptions,
  },
  {
    id: "massachusettsLicenseActive",
    databaseField: "massachusetts_license_active",
    section: "Credentials and scope",
    label: "Do you currently hold an active Massachusetts license relevant to this role?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "prescriptiveAuthority",
    databaseField: "prescriptive_authority",
    section: "Credentials and scope",
    label: "Do you hold prescriptive authority within your current role?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "boardCertified",
    databaseField: "board_certified",
    section: "Credentials and scope",
    label: "Are you board certified in a way that is relevant to your current work?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "boardCertificationType",
    databaseField: "board_certification_type",
    section: "Credentials and scope",
    label: "Which board certification category is most relevant?",
    input: "single_select",
    options: boardCertificationTypeOptions,
    visibleWhen: (answers) => answers.boardCertified === "yes",
  },
  {
    id: "independentAssessment",
    databaseField: "independent_assessment",
    section: "Credentials and scope",
    label: "Do you independently assess and treatment-plan patients?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "independentPrescribing",
    databaseField: "independent_prescribing",
    section: "Credentials and scope",
    label: "Do you independently prescribe within your role?",
    input: "single_select",
    options: yesNoOptions,
    visibleWhen: (answers) => answers.prescriptiveAuthority === "yes",
  },
  {
    id: "treatmentPlanSignoffRequired",
    databaseField: "treatment_plan_signoff_required",
    section: "Credentials and scope",
    label: "Do you require physician sign-off for treatment planning?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "prescribingSignoffRequired",
    databaseField: "prescribing_signoff_required",
    section: "Credentials and scope",
    label: "Do you require physician sign-off for prescribing?",
    input: "single_select",
    options: yesNoOptions,
    visibleWhen: (answers) => answers.prescriptiveAuthority === "yes",
  },
  {
    id: "worksUnderMedicalDirector",
    databaseField: "works_under_medical_director",
    section: "Credentials and scope",
    label: "Do you work under a medical director?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "isMedicalDirector",
    databaseField: "is_medical_director",
    section: "Credentials and scope",
    label: "Are you yourself the medical director for any location or practice?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "injectorStatus",
    databaseField: "injector_status",
    section: "Credentials and scope",
    label: "Do you currently perform injectable treatments?",
    input: "single_select",
    options: yesNoOptions,
    visibleWhen: (answers) => answers.personallyPerformsProcedures === "yes",
  },
  {
    id: "laserUnderOwnLicense",
    databaseField: "laser_under_own_license",
    section: "Credentials and scope",
    label: "Do you perform laser or energy-device treatments under your own license?",
    input: "single_select",
    options: yesNoOptions,
    visibleWhen: (answers) => answers.personallyPerformsProcedures === "yes",
  },
  {
    id: "licenseArrangement",
    databaseField: "license_arrangement",
    section: "Credentials and scope",
    label: "How is your work typically authorized from a licensure standpoint?",
    input: "single_select",
    options: licenseArrangementOptions,
  },
  {
    id: "advancedTraining",
    databaseField: "advanced_training",
    section: "Credentials and scope",
    label: "Which advanced training pathways have materially shaped your current scope?",
    input: "multi_select",
    options: advancedTrainingOptions,
  },
  {
    id: "deviceCertifications",
    databaseField: "device_certifications",
    section: "Credentials and scope",
    label: "Which device or treatment certifications do you currently hold?",
    input: "multi_select",
    options: deviceCertificationOptions,
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
    label: "Are you subject to a noncompete, nonsolicit, or similar restrictive agreement?",
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
      answers.compensationStructure === "hourly_plus_commission",
  },
  {
    id: "annualSalary",
    databaseField: "annual_salary",
    section: "Compensation",
    label: "What is your annual base salary?",
    description: "Use gross base salary before bonuses or commissions.",
    input: "currency",
    visibleWhen: (answers) =>
      answers.compensationStructure === "salary" ||
      answers.compensationStructure === "salary_plus_commission",
  },
  {
    id: "receivesCommission",
    databaseField: "receives_commission",
    section: "Compensation",
    label: "Do you receive commission or production-based upside in this role?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "commissionType",
    databaseField: "commission_type",
    section: "Compensation",
    label: "What kind of commission or production structure do you receive?",
    input: "single_select",
    options: commissionTypeOptions,
    visibleWhen: (answers) =>
      answers.receivesCommission === "yes" ||
      compensationStructureIncludesCommission(answers.compensationStructure),
  },
  {
    id: "commissionValue",
    databaseField: "commission_value",
    section: "Compensation",
    label: "What is the commission percentage or approximate annual bonus amount?",
    description: "A rough answer is fine if the formula is complicated.",
    input: "text",
    visibleWhen: (answers) =>
      answers.receivesCommission === "yes" ||
      compensationStructureIncludesCommission(answers.compensationStructure),
  },
  {
    id: "totalAnnualEarningsRange",
    databaseField: "total_annual_earnings_range",
    section: "Compensation",
    label: "About how much did you earn from this role during the previous 12 months?",
    input: "single_select",
    options: totalAnnualEarningsRangeOptions,
  },
  {
    id: "benefits",
    databaseField: "benefits",
    section: "Compensation",
    label: "Which benefits are part of your current package?",
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
    visibleWhen: (answers) => answers.personallyPerformsProcedures === "yes",
  },
  {
    id: "injectableVolumeRange",
    databaseField: "injectable_volume_range",
    section: "Skills and production",
    label: "Approximately how many injectable treatments do you perform per month?",
    input: "single_select",
    options: injectableVolumeRangeOptions,
    visibleWhen: (answers) => answers.injectorStatus === "yes",
  },
  {
    id: "monthlyRevenueRange",
    databaseField: "monthly_revenue_range",
    section: "Skills and production",
    label: "About how much monthly revenue do you personally generate?",
    input: "single_select",
    options: monthlyRevenueRangeOptions,
  },
  {
    id: "bringsPatientFollowing",
    databaseField: "brings_patient_following",
    section: "Skills and production",
    label: "Do you bring an existing patient following?",
    input: "single_select",
    options: yesNoOptions,
  },
  {
    id: "requestedPatientPercentageRange",
    databaseField: "requested_patient_percentage_range",
    section: "Skills and production",
    label: "What percentage of your patients request you specifically?",
    input: "single_select",
    options: requestedPatientPercentageRangeOptions,
    visibleWhen: (answers) => answers.bringsPatientFollowing === "yes",
  },
  {
    id: "salesExpectation",
    databaseField: "sales_expectation",
    section: "Skills and production",
    label: "Are you expected to sell products or additional treatments?",
    input: "single_select",
    options: salesExpectationOptions,
  },
  {
    id: "compensationFairnessScore",
    databaseField: "compensation_fairness_score",
    section: "Satisfaction and mobility",
    label: "On a scale from 1 to 10, how fairly do you believe you are compensated?",
    input: "rating",
    options: fairnessScoreOptions,
  },
  {
    id: "jobMobility",
    databaseField: "job_mobility",
    section: "Satisfaction and mobility",
    label: "How likely are you to consider a new opportunity during the next 12 months?",
    input: "single_select",
    options: jobMobilityOptions,
  },
  {
    id: "reasonsToLeave",
    databaseField: "reasons_to_leave",
    section: "Satisfaction and mobility",
    label: "What would be most likely to persuade you to change employers?",
    description: "Choose up to three that matter most.",
    input: "multi_select",
    options: reasonToLeaveOptions,
  },
  {
    id: "compensationFrustration",
    databaseField: "compensation_frustration",
    section: "Satisfaction and mobility",
    label: "What is the most frustrating part of compensation in medical aesthetics?",
    description: "Optional.",
    required: false,
    input: "textarea",
  },
  {
    id: "employerRetentionFeedback",
    databaseField: "employer_retention_feedback",
    section: "Satisfaction and mobility",
    label: "What do you wish clinic owners better understood about retaining aesthetic professionals?",
    description: "Optional.",
    required: false,
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
] as const;
