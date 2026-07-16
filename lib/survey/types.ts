export type YesNoAnswer = "yes" | "no";

export type SurveySection =
  | "Professional profile"
  | "Work structure"
  | "Compensation"
  | "Skills and production"
  | "Satisfaction and mobility"
  | "Consent";

export type SurveyInputKind =
  | "single_select"
  | "multi_select"
  | "currency"
  | "text"
  | "textarea"
  | "rating"
  | "consent";

export type SurveyDatabaseField =
  | "role"
  | "region"
  | "aesthetics_experience"
  | "healthcare_experience"
  | "workplace_type"
  | "employer_location_count"
  | "employment_arrangement"
  | "weekly_hours"
  | "employer_tenure"
  | "restrictive_agreement"
  | "compensation_structure"
  | "hourly_rate"
  | "annual_salary"
  | "receives_commission"
  | "commission_type"
  | "commission_value"
  | "total_annual_earnings_range"
  | "benefits"
  | "services_performed"
  | "injectable_volume_range"
  | "monthly_revenue_range"
  | "brings_patient_following"
  | "requested_patient_percentage_range"
  | "sales_expectation"
  | "compensation_fairness_score"
  | "job_mobility"
  | "reasons_to_leave"
  | "compensation_frustration"
  | "employer_retention_feedback"
  | "consented";

export type RoleAnswer =
  | "nurse_injector"
  | "registered_nurse"
  | "nurse_practitioner"
  | "physician_assistant"
  | "physician"
  | "licensed_aesthetician"
  | "laser_technician"
  | "patient_coordinator"
  | "practice_manager"
  | "medical_director"
  | "other";

export type RegionAnswer =
  | "greater_boston"
  | "north_shore"
  | "south_shore"
  | "cape_and_islands"
  | "central_massachusetts"
  | "western_massachusetts"
  | "statewide_multi_region";

export type ExperienceAnswer =
  | "under_1_year"
  | "one_to_two_years"
  | "three_to_five_years"
  | "six_to_ten_years"
  | "more_than_ten_years";

export type WorkplaceTypeAnswer =
  | "med_spa"
  | "dermatology_practice"
  | "plastic_surgery_practice"
  | "physician_owned_aesthetic_office"
  | "multi_location_group"
  | "specialty_clinic"
  | "other";

export type EmployerLocationCountAnswer =
  | "one_location"
  | "two_to_three_locations"
  | "four_to_ten_locations"
  | "more_than_ten_locations"
  | "not_sure";

export type EmploymentArrangementAnswer =
  | "full_time_employee"
  | "part_time_employee"
  | "independent_contractor"
  | "per_diem"
  | "owner_partner"
  | "other";

export type WeeklyHoursAnswer =
  | "under_20"
  | "20_to_29"
  | "30_to_39"
  | "40_to_49"
  | "50_or_more";

export type EmployerTenureAnswer =
  | "under_6_months"
  | "6_to_12_months"
  | "1_to_2_years"
  | "3_to_5_years"
  | "more_than_5_years";

export type RestrictiveAgreementAnswer = YesNoAnswer | "not_sure";

export type CompensationStructureAnswer =
  | "hourly"
  | "salary"
  | "salary_plus_hourly"
  | "salary_plus_commission"
  | "hourly_plus_commission"
  | "commission_only"
  | "other";

export type CommissionTypeAnswer =
  | "percentage_of_services"
  | "tiered_percentage"
  | "flat_bonus"
  | "draw_against_commission"
  | "hybrid"
  | "other";

export type TotalAnnualEarningsRangeAnswer =
  | "under_75000"
  | "75000_to_99999"
  | "100000_to_124999"
  | "125000_to_149999"
  | "150000_to_199999"
  | "200000_to_249999"
  | "250000_or_more";

export type BenefitAnswer =
  | "health_insurance"
  | "dental_or_vision"
  | "paid_time_off"
  | "retirement_plan"
  | "continuing_education"
  | "free_or_discounted_treatments"
  | "parental_leave"
  | "bonus_program"
  | "none";

export type ServicePerformedAnswer =
  | "neuromodulators"
  | "dermal_fillers"
  | "biostimulators"
  | "laser_treatments"
  | "energy_devices"
  | "body_contouring"
  | "facials_or_peels"
  | "consultations_only"
  | "other";

export type InjectableVolumeRangeAnswer =
  | "none"
  | "1_to_20"
  | "21_to_40"
  | "41_to_60"
  | "61_to_100"
  | "more_than_100";

export type MonthlyRevenueRangeAnswer =
  | "under_25000"
  | "25000_to_49999"
  | "50000_to_74999"
  | "75000_to_99999"
  | "100000_to_149999"
  | "150000_or_more"
  | "not_tracked";

export type RequestedPatientPercentageRangeAnswer =
  | "under_10"
  | "10_to_24"
  | "25_to_49"
  | "50_to_74"
  | "75_or_more"
  | "not_sure";

export type SalesExpectationAnswer =
  | "minimal"
  | "moderate"
  | "high"
  | "very_high";

export type FairnessScoreAnswer = "1" | "2" | "3" | "4" | "5";

export type JobMobilityAnswer =
  | "not_open"
  | "somewhat_open"
  | "actively_exploring"
  | "ready_to_move_for_the_right_offer";

export type ReasonToLeaveAnswer =
  | "higher_pay"
  | "better_schedule"
  | "better_benefits"
  | "more_support"
  | "clearer_growth_path"
  | "less_sales_pressure"
  | "leadership_issues"
  | "want_to_start_or_join_a_practice";

export interface SurveyAnswers {
  role: RoleAnswer | "";
  region: RegionAnswer | "";
  aestheticsExperience: ExperienceAnswer | "";
  healthcareExperience: ExperienceAnswer | "";
  workplaceType: WorkplaceTypeAnswer | "";
  employerLocationCount: EmployerLocationCountAnswer | "";
  employmentArrangement: EmploymentArrangementAnswer | "";
  weeklyHours: WeeklyHoursAnswer | "";
  employerTenure: EmployerTenureAnswer | "";
  restrictiveAgreement: RestrictiveAgreementAnswer | "";
  compensationStructure: CompensationStructureAnswer | "";
  hourlyRate: string;
  annualSalary: string;
  receivesCommission: YesNoAnswer | "";
  commissionType: CommissionTypeAnswer | "";
  commissionValue: string;
  totalAnnualEarningsRange: TotalAnnualEarningsRangeAnswer | "";
  benefits: BenefitAnswer[];
  servicesPerformed: ServicePerformedAnswer[];
  injectableVolumeRange: InjectableVolumeRangeAnswer | "";
  monthlyRevenueRange: MonthlyRevenueRangeAnswer | "";
  bringsPatientFollowing: YesNoAnswer | "";
  requestedPatientPercentageRange: RequestedPatientPercentageRangeAnswer | "";
  salesExpectation: SalesExpectationAnswer | "";
  compensationFairnessScore: FairnessScoreAnswer | "";
  jobMobility: JobMobilityAnswer | "";
  reasonsToLeave: ReasonToLeaveAnswer[];
  compensationFrustration: string;
  employerRetentionFeedback: string;
  consented: boolean;
}

export type SurveyQuestionId = keyof SurveyAnswers;
export type SurveyMultiSelectQuestionId = {
  [TId in SurveyQuestionId]: SurveyAnswers[TId] extends readonly string[] ? TId : never;
}[SurveyQuestionId];

export interface SurveyQuestionOption<TValue extends string = string> {
  label: string;
  value: TValue;
}

export type SurveyQuestionOptionValue<TId extends SurveyQuestionId> = Exclude<
  SurveyAnswers[TId] extends readonly (infer TValue)[]
    ? Extract<TValue, string>
    : Extract<SurveyAnswers[TId], string>,
  ""
>;

export interface SurveyQuestion<TId extends SurveyQuestionId = SurveyQuestionId> {
  id: TId;
  databaseField: SurveyDatabaseField;
  section: SurveySection;
  label: string;
  description?: string;
  input: SurveyInputKind;
  options?: readonly SurveyQuestionOption<SurveyQuestionOptionValue<TId>>[];
  visibleWhen?: (answers: SurveyAnswers) => boolean;
}

export interface SurveyAttribution {
  referrerCode: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  landingPageVariant: string;
}

export interface SurveyDraft {
  currentStepIndex: number;
  anonymousToken: string;
  answers: SurveyAnswers;
  attribution: SurveyAttribution;
  hasSubmittedSurvey: boolean;
}
