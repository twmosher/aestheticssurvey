export type YesNoAnswer = "yes" | "no";

export type SurveySection =
  | "Professional profile"
  | "Credentials and scope"
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
  | "role_track"
  | "personally_performs_procedures"
  | "supervises_clinicians"
  | "ownership_status"
  | "primary_state"
  | "practices_in_massachusetts"
  | "practices_in_multiple_states"
  | "active_states"
  | "region"
  | "aesthetics_experience"
  | "healthcare_experience"
  | "workplace_type"
  | "employer_location_count"
  | "primary_license"
  | "additional_licenses"
  | "massachusetts_license_active"
  | "prescriptive_authority"
  | "board_certified"
  | "board_certification_type"
  | "independent_assessment"
  | "independent_prescribing"
  | "treatment_plan_signoff_required"
  | "prescribing_signoff_required"
  | "works_under_medical_director"
  | "is_medical_director"
  | "injector_status"
  | "laser_under_own_license"
  | "license_arrangement"
  | "advanced_training"
  | "device_certifications"
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

export type RoleTrackAnswer = "clinical" | "operational" | "ownership" | "hybrid";

export type StateAnswer =
  | "massachusetts"
  | "connecticut"
  | "rhode_island"
  | "new_hampshire"
  | "maine"
  | "vermont"
  | "new_york"
  | "new_jersey"
  | "florida"
  | "california"
  | "texas"
  | "other_us_state";

export type RegionAnswer =
  | "boston"
  | "cambridge_somerville"
  | "north_shore"
  | "metrowest"
  | "south_shore"
  | "central_massachusetts"
  | "western_massachusetts"
  | "cape_cod_and_islands"
  | "other_massachusetts";

export type ExperienceAnswer =
  | "under_1_year"
  | "one_to_two_years"
  | "three_to_five_years"
  | "six_to_ten_years"
  | "more_than_ten_years";

export type WorkplaceTypeAnswer =
  | "independent_med_spa"
  | "multi_location_med_spa_group"
  | "dermatology_practice"
  | "plastic_surgery_practice"
  | "hospital_or_health_system"
  | "wellness_or_longevity_clinic"
  | "self_employed"
  | "other";

export type EmployerLocationCountAnswer =
  | "one_location"
  | "two_to_three_locations"
  | "four_to_ten_locations"
  | "more_than_ten_locations"
  | "not_sure";

export type PrimaryLicenseAnswer =
  | "rn"
  | "np"
  | "pa"
  | "md_do"
  | "licensed_aesthetician"
  | "laser_certified_technician"
  | "practice_administrator"
  | "none_nonclinical"
  | "other";

export type AdditionalLicenseAnswer =
  | "rn"
  | "np"
  | "pa"
  | "md_do"
  | "licensed_aesthetician"
  | "laser_certified_technician"
  | "prescriber"
  | "managerial"
  | "other";

export type BoardCertificationTypeAnswer =
  | "dermatology"
  | "plastic_surgery"
  | "family_medicine"
  | "internal_medicine"
  | "emergency_medicine"
  | "nurse_practitioner"
  | "physician_assistant"
  | "aesthetic_or_laser"
  | "other";

export type LicenseArrangementAnswer =
  | "under_my_own_license"
  | "under_another_clinicians_license"
  | "delegated_arrangement"
  | "not_applicable";

export type AdvancedTrainingAnswer =
  | "manufacturer_training"
  | "cadaver_training"
  | "advanced_injector_coursework"
  | "laser_safety_training"
  | "business_or_management_training"
  | "formal_fellowship_or_preceptorship"
  | "none"
  | "other";

export type DeviceCertificationAnswer =
  | "laser_safety_officer"
  | "manufacturer_device_certification"
  | "coolsculpting_or_body_contouring"
  | "radiofrequency_or_ultrasound"
  | "ipl_or_photofacial"
  | "none"
  | "other";

export type EmploymentArrangementAnswer =
  | "full_time_employee"
  | "part_time_employee"
  | "independent_contractor"
  | "per_diem"
  | "owner"
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

export type RestrictiveAgreementAnswer =
  | YesNoAnswer
  | "not_sure"
  | "prefer_not_to_say";

export type CompensationStructureAnswer =
  | "hourly"
  | "salary"
  | "commission_only"
  | "hourly_plus_commission"
  | "salary_plus_commission"
  | "production_bonus"
  | "other";

export type CommissionTypeAnswer =
  | "percentage_of_personal_revenue"
  | "percentage_of_collected_revenue"
  | "percentage_of_profit"
  | "per_treatment_bonus"
  | "tiered_production_bonus"
  | "retail_commission"
  | "tips"
  | "other";

export type TotalAnnualEarningsRangeAnswer =
  | "under_50000"
  | "50000_to_74999"
  | "75000_to_99999"
  | "100000_to_124999"
  | "125000_to_149999"
  | "150000_to_199999"
  | "200000_to_249999"
  | "250000_or_more"
  | "prefer_not_to_say";

export type BenefitAnswer =
  | "health_insurance"
  | "dental_insurance"
  | "retirement_contribution"
  | "paid_time_off"
  | "paid_training"
  | "free_or_discounted_treatments"
  | "product_discounts"
  | "malpractice_coverage"
  | "continuing_education_allowance"
  | "none"
  | "other";

export type ServicePerformedAnswer =
  | "neuromodulators"
  | "dermal_filler"
  | "biostimulators"
  | "prp_or_prf"
  | "laser_treatments"
  | "ipl"
  | "microneedling"
  | "radiofrequency_treatments"
  | "body_contouring"
  | "facials_and_skin_treatments"
  | "weight_management_services"
  | "consultations_and_treatment_planning"
  | "other";

export type InjectableVolumeRangeAnswer =
  | "none"
  | "1_to_10"
  | "11_to_25"
  | "26_to_50"
  | "51_to_100"
  | "more_than_100";

export type MonthlyRevenueRangeAnswer =
  | "do_not_know"
  | "under_10000"
  | "10000_to_24999"
  | "25000_to_49999"
  | "50000_to_74999"
  | "75000_to_99999"
  | "100000_or_more"
  | "prefer_not_to_say";

export type RequestedPatientPercentageRangeAnswer =
  | "under_10_percent"
  | "10_to_24_percent"
  | "25_to_49_percent"
  | "50_to_74_percent"
  | "75_percent_or_more"
  | "not_sure";

export type SalesExpectationAnswer =
  | "yes_formally_measured"
  | "yes_informally_expected"
  | "no"
  | "not_sure";

export type FairnessScoreAnswer =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";

export type JobMobilityAnswer =
  | "very_unlikely"
  | "unlikely"
  | "open_to_hearing"
  | "likely"
  | "actively_looking";

export type ReasonToLeaveAnswer =
  | "higher_compensation"
  | "better_schedule"
  | "stronger_leadership"
  | "more_training"
  | "more_autonomy"
  | "better_benefits"
  | "more_advanced_treatments"
  | "better_workplace_culture"
  | "ownership_opportunity"
  | "less_pressure_to_sell"
  | "other";

export interface SurveyAnswers {
  role: RoleAnswer | "";
  roleTrack: RoleTrackAnswer | "";
  personallyPerformsProcedures: YesNoAnswer | "";
  supervisesClinicians: YesNoAnswer | "";
  ownershipStatus: "employee" | "minority_owner" | "majority_owner" | "sole_owner" | "";
  primaryState: StateAnswer | "";
  practicesInMassachusetts: YesNoAnswer | "";
  practicesInMultipleStates: YesNoAnswer | "";
  activeStates: StateAnswer[];
  region: RegionAnswer | "";
  aestheticsExperience: ExperienceAnswer | "";
  healthcareExperience: ExperienceAnswer | "";
  workplaceType: WorkplaceTypeAnswer | "";
  employerLocationCount: EmployerLocationCountAnswer | "";
  primaryLicense: PrimaryLicenseAnswer | "";
  additionalLicenses: AdditionalLicenseAnswer[];
  massachusettsLicenseActive: YesNoAnswer | "";
  prescriptiveAuthority: YesNoAnswer | "";
  boardCertified: YesNoAnswer | "";
  boardCertificationType: BoardCertificationTypeAnswer | "";
  independentAssessment: YesNoAnswer | "";
  independentPrescribing: YesNoAnswer | "";
  treatmentPlanSignoffRequired: YesNoAnswer | "";
  prescribingSignoffRequired: YesNoAnswer | "";
  worksUnderMedicalDirector: YesNoAnswer | "";
  isMedicalDirector: YesNoAnswer | "";
  injectorStatus: YesNoAnswer | "";
  laserUnderOwnLicense: YesNoAnswer | "";
  licenseArrangement: LicenseArrangementAnswer | "";
  advancedTraining: AdvancedTrainingAnswer[];
  deviceCertifications: DeviceCertificationAnswer[];
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
  required?: boolean;
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
