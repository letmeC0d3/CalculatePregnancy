/**
 * Structured Pregnancy Week & Baby Size Data Model
 *
 * Source-backed educational dataset compiled from:
 * 1. American College of Obstetricians and Gynecologists (ACOG)
 * 2. National Health Service (NHS) UK
 * 3. INTERGROWTH-21st Project / University of Oxford (fetal weight standards)
 *
 * Editorial status: "source_verified"
 * "The content has been checked against the identified authoritative/published sources."
 */

export type MedicalReviewStatus = "source_verified" | "pending_editorial_review" | "draft";

export type LengthMeasurementType = "crown-to-rump" | "head-to-heel" | null;

export type FetalMeasurementType = "embryonic-disc" | "crown-to-rump" | "crown-to-heel" | null;

export interface SourceReference {
  title: string;
  publisher: string;
  url: string;
  year?: number;
  doi?: string;
}

export interface PregnancyWeek {
  week: number;
  babySizeLabel: string;
  sizeIcon: string;
  babySizeCategory: "seed" | "fruit" | "vegetable";
  approximateLength: string | null;
  approximateWeight: string | null;
  lengthMeasurementType: LengthMeasurementType;
  developmentSummary: string;
  keyMilestones: string[];
  trimester: 1 | 2 | 3;
  sources: SourceReference[];
  medicalReviewStatus: "source_verified";
  // Backwards compatibility helpers
  measurementType?: FetalMeasurementType;
  measurementTypeLabel?: string;
}

export type PregnancyWeekData = PregnancyWeek;

// Standard source definitions
const SOURCE_ACOG_FETUS_GROWS: SourceReference = {
  title: "How Your Fetus Grows During Pregnancy",
  publisher: "American College of Obstetricians and Gynecologists (ACOG)",
  url: "https://www.acog.org/womens-health/faqs/how-your-fetus-grows-during-pregnancy",
  year: 2023,
};

const SOURCE_ACOG_DUE_DATE: SourceReference = {
  title: "Methods for Estimating the Due Date (Committee Opinion No. 700)",
  publisher: "American College of Obstetricians and Gynecologists (ACOG)",
  url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2017/05/methods-for-estimating-the-due-date",
  year: 2017,
};

const SOURCE_ACOG_TERM: SourceReference = {
  title: "Definition of Term Pregnancy (Committee Opinion No. 579)",
  publisher: "American College of Obstetricians and Gynecologists (ACOG)",
  url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2013/11/definition-of-term-pregnancy",
  year: 2013,
};

const SOURCE_NHS_WEEKLY: SourceReference = {
  title: "Week-by-week guide to pregnancy",
  publisher: "National Health Service (NHS)",
  url: "https://www.nhs.uk/best-start-in-life/pregnancy/week-by-week-guide-to-pregnancy/",
  year: 2023,
};

const SOURCE_INTERGROWTH_WEIGHT: SourceReference = {
  title: "International estimated fetal weight standards of the INTERGROWTH-21st Project",
  publisher: "Ultrasound in Obstetrics & Gynecology / University of Oxford",
  url: "https://intergrowth21.com/",
  year: 2017,
  doi: "10.1002/uog.17347",
};

const SOURCE_INTERGROWTH_CRL: SourceReference = {
  title: "International standards for early fetal size and pregnancy dating based on ultrasound measurement of crown-rump length",
  publisher: "Ultrasound in Obstetrics & Gynecology / PubMed",
  url: "https://pubmed.ncbi.nlm.nih.gov/25044000/",
  year: 2014,
  doi: "10.1002/uog.13448",
};

export const PREGNANCY_WEEKS_DATA: PregnancyWeek[] = [
  {
    week: 4,
    babySizeLabel: "Poppy Seed",
    sizeIcon: "🌱",
    babySizeCategory: "seed",
    approximateLength: "~2 mm",
    approximateWeight: null,
    lengthMeasurementType: null,
    measurementType: "embryonic-disc",
    measurementTypeLabel: "Early Embryonic Disc",
    developmentSummary:
      "The blastocyst completes implantation into the uterine lining. Cells begin early specialization into the embryo, amniotic sac, and placenta.",
    keyMilestones: [
      "Blastocyst completes implantation in the endometrium",
      "Early cell layers begin forming primary body systems",
      "Placenta begins producing early pregnancy hormones (hCG)",
    ],
    trimester: 1,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 5,
    babySizeLabel: "Sesame Seed",
    sizeIcon: "🌱",
    babySizeCategory: "seed",
    approximateLength: "~2 mm",
    approximateWeight: null,
    lengthMeasurementType: null,
    measurementType: "embryonic-disc",
    measurementTypeLabel: "Early Embryonic Disc",
    developmentSummary:
      "The neural tube develops along the embryo's back, which will form the brain and spinal cord. Primitive blood vessels and heart tube begin to form.",
    keyMilestones: [
      "Neural tube forms along the back of the embryo",
      "Primitive cardiovascular tube begins taking shape",
      "Early embryonic disc differentiates into distinct layers",
    ],
    trimester: 1,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 6,
    babySizeLabel: "Pea",
    sizeIcon: "🟢",
    babySizeCategory: "vegetable",
    approximateLength: "~6 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "Small limb buds appear that will form arms and legs. The primitive heart tube shows early rhythmic contractions that can often be detected on ultrasound.",
    keyMilestones: [
      "Early limb buds for arms and legs appear",
      "Primitive heart contractions begin",
      "Neural tube closure is normally complete",
    ],
    trimester: 1,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_CRL],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 7,
    babySizeLabel: "Grape",
    sizeIcon: "🍇",
    babySizeCategory: "fruit",
    approximateLength: "~10 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "Arm and leg buds lengthen and paddle-shaped hand and foot plates start forming. The brain and head grow rapidly compared to the rest of the body.",
    keyMilestones: [
      "Paddle-shaped hand and foot buds develop",
      "Rapid brain enlargement causes prominent head growth",
      "Early facial indentations for eyes and mouth emerge",
    ],
    trimester: 1,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_CRL],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 8,
    babySizeLabel: "Raspberry",
    sizeIcon: "🫐",
    babySizeCategory: "fruit",
    approximateLength: "~16 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "Webbed fingers and toes begin to separate into distinct digits. The eyelids and external ear folds form, and early involuntary movements begin.",
    keyMilestones: [
      "Fingers and toes begin distinct separation",
      "Eyelid and external ear structures take shape",
      "Basic framework of all essential organs is established",
    ],
    trimester: 1,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_CRL],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 9,
    babySizeLabel: "Strawberry",
    sizeIcon: "🍓",
    babySizeCategory: "fruit",
    approximateLength: "~22 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "Arms bend at the elbows and hands meet near the chest. The embryonic tail regression is complete, marking the approaching transition to the fetal period.",
    keyMilestones: [
      "Elbow joints flex and hands can meet at midline",
      "Eyelids fully cover the eyes and remain fused shut",
      "Nipple and hair follicle foundations begin developing",
    ],
    trimester: 1,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_CRL],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 10,
    babySizeLabel: "Apricot",
    sizeIcon: "🍑",
    babySizeCategory: "fruit",
    approximateLength: "~30 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "The embryonic phase ends; the developing baby is now medically classified as a fetus. Vital organs including kidneys, intestines, and liver are functioning in early stages.",
    keyMilestones: [
      "Embryonic stage completes; medical classification becomes fetus",
      "Digits lose webbed appearance completely",
      "Fingernails begin early formation",
    ],
    trimester: 1,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_CRL],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 11,
    babySizeLabel: "Fig",
    sizeIcon: "🍈",
    babySizeCategory: "fruit",
    approximateLength: "~41 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "The head makes up roughly half the fetal length. Facial features continue to refine as nasal bones, tooth buds, and external ear canals become established.",
    keyMilestones: [
      "Tooth buds form beneath the gum line",
      "Skeletal bones begin early hardening (ossification)",
      "Fetus can make subtle reflex movements and stretches",
    ],
    trimester: 1,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_CRL],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 12,
    babySizeLabel: "Plum",
    sizeIcon: "🫐",
    babySizeCategory: "fruit",
    approximateLength: "~54 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "The kidneys begin producing small amounts of urine that pass into the amniotic fluid. This is the optimal window for first-trimester ultrasound dating and nuchal translucency scans.",
    keyMilestones: [
      "Kidneys begin producing early urine into the amniotic fluid",
      "Standard clinical window for first-trimester ultrasound dating",
      "Vocal cords begin early structural differentiation",
    ],
    trimester: 1,
    sources: [SOURCE_ACOG_DUE_DATE, SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_CRL],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 13,
    babySizeLabel: "Peach",
    sizeIcon: "🍑",
    babySizeCategory: "fruit",
    approximateLength: "~74 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "The final week of the first trimester. Unique epidermal ridges (fingerprints) form on tiny fingertips, and intestines move fully into the abdomen.",
    keyMilestones: [
      "First trimester draws to a close",
      "Unique fingerprint ridges begin forming on fingertips",
      "Intestines migrate fully from the umbilical cord into the abdominal cavity",
    ],
    trimester: 1,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_CRL],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 14,
    babySizeLabel: "Kiwi",
    sizeIcon: "🥝",
    babySizeCategory: "fruit",
    approximateLength: "~85 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "Second trimester begins. The neck elongates and the chin lifts off the chest. Facial muscles exercise through subtle grimacing and squinting reflexes.",
    keyMilestones: [
      "Second trimester officially begins",
      "Thyroid gland begins producing early metabolic hormones",
      "Limbs move more fluidly and flexibly",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 15,
    babySizeLabel: "Apple",
    sizeIcon: "🍎",
    babySizeCategory: "fruit",
    approximateLength: "~101 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "Bones continue to harden, and hair patterning begins on the scalp. Fine, downy hair called lanugo starts appearing across the delicate skin.",
    keyMilestones: [
      "Skeletal ossification continues to advance",
      "Fine lanugo hair begins covering the skin",
      "Taste buds begin structural development on the tongue",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 16,
    babySizeLabel: "Avocado",
    sizeIcon: "🥑",
    babySizeCategory: "fruit",
    approximateLength: "~116 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "The eyes make slow, coordinated movements beneath closed eyelids. Some individuals may begin to detect early, subtle flutter-like movements (quickening).",
    keyMilestones: [
      "Eyes can make slow, coordinated movements",
      "Lower limbs become proportionally well-developed",
      "Early quickening movements may be felt by some pregnant individuals",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 17,
    babySizeLabel: "Pomegranate",
    sizeIcon: "🫐",
    babySizeCategory: "fruit",
    approximateLength: "~120 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "Adipose fat tissue begins accumulating beneath the skin to support heat generation and energy storage. The umbilical cord thickens and strengthens.",
    keyMilestones: [
      "Adipose fat tissue stores begin forming beneath the skin",
      "Skeleton joints become increasingly mobile",
      "Auditory inner ear structures continue developing",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 18,
    babySizeLabel: "Bell Pepper",
    sizeIcon: "🫑",
    babySizeCategory: "vegetable",
    approximateLength: "~142 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "Myelin insulation begins forming around nerve fibers in the spinal cord. The fetus regularly swallows amniotic fluid, practicing digestive tract movements.",
    keyMilestones: [
      "Myelin coating begins insulating nerve fibers",
      "Fetus swallows amniotic fluid regularly",
      "Mid-pregnancy anatomy ultrasound scan window opens (18–22 weeks)",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 19,
    babySizeLabel: "Tomato",
    sizeIcon: "🍅",
    babySizeCategory: "vegetable",
    approximateLength: "~153 mm (CRL, head-to-bottom)",
    approximateWeight: null,
    lengthMeasurementType: "crown-to-rump",
    measurementType: "crown-to-rump",
    measurementTypeLabel: "Crown-to-Rump Length (CRL)",
    developmentSummary:
      "A protective white waxy coating called vernix caseosa covers the skin to shield it from amniotic fluid. This is the final week using the Crown-Rump Length convention.",
    keyMilestones: [
      "Vernix caseosa coats the delicate skin",
      "Sensory brain regions for touch and hearing mature",
      "Final week where clinical length is measured head-to-bottom (CRL)",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 20,
    babySizeLabel: "Banana",
    sizeIcon: "🍌",
    babySizeCategory: "fruit",
    approximateLength: "~256 mm (head-to-heel)",
    approximateWeight: null,
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Midpoint of pregnancy (20 completed weeks). Measurement standard changes from Crown-Rump Length to full Head-to-Heel length. Detailed mid-pregnancy anatomy scans typically occur around this week.",
    keyMilestones: [
      "Mid-pregnancy anatomical milestone (20 weeks)",
      "Measurement standard transitions from CRL to full head-to-heel length",
      "Fetal limb movements become noticeably stronger and more regular",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 21,
    babySizeLabel: "Carrot",
    sizeIcon: "🥕",
    babySizeCategory: "vegetable",
    approximateLength: "~267 mm (head-to-heel)",
    approximateWeight: null,
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Bone marrow assumes major red blood cell production from the liver and spleen. Fetal sleep-wake patterns become more discernible through activity rhythms.",
    keyMilestones: [
      "Bone marrow becomes primary producer of red blood cells",
      "Digestive tract absorbs small amounts of water from swallowed fluid",
      "Sleep-wake cycles become more discernible",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 22,
    babySizeLabel: "Sweet Potato",
    sizeIcon: "🍠",
    babySizeCategory: "vegetable",
    approximateLength: "~278 mm (head-to-heel)",
    approximateWeight: "525 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Tactile touch and grip reflexes strengthen as the fetus explores the uterine wall and umbilical cord. Estimated fetal weight reaches approximately 525 g at the INTERGROWTH-21st 50th percentile.",
    keyMilestones: [
      "Grip reflex and tactile sensitivity continue to develop",
      "Eyebrows and eyelashes are clearly discernible",
      "Estimated fetal weight is ~525 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 23,
    babySizeLabel: "Large Mango",
    sizeIcon: "🥭",
    babySizeCategory: "fruit",
    approximateLength: "~289 mm (head-to-heel)",
    approximateWeight: "592 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Rapid eye movements (REM) emerge during rest cycles. Blood vessels within the lungs multiply in preparation for eventual respiratory function after birth.",
    keyMilestones: [
      "Rapid eye movements (REM) emerge during rest",
      "Pulmonary vascular tree expands throughout lung tissue",
      "Estimated fetal weight is ~592 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 24,
    babySizeLabel: "Corn on the Cob",
    sizeIcon: "🌽",
    babySizeCategory: "vegetable",
    approximateLength: "~300 mm (head-to-heel)",
    approximateWeight: "668 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Specialized cells in the lungs begin producing pulmonary surfactant, a compound essential for keeping air sacs open after delivery. The fetus responds to acoustic vibrations.",
    keyMilestones: [
      "Pulmonary surfactant production begins in the lungs",
      "Auditory inner ear structures respond to external sound vibrations",
      "Estimated fetal weight is ~668 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 25,
    babySizeLabel: "Courgette",
    sizeIcon: "🥒",
    babySizeCategory: "vegetable",
    approximateLength: "~346 mm (head-to-heel)",
    approximateWeight: "756 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Capillary beds form beneath the skin, giving it a pinkish tone. The fetus exhibits startle reflex movements in response to sudden loud noises.",
    keyMilestones: [
      "Subcutaneous capillary networks expand",
      "Spinal structures and vertebral columns strengthen",
      "Estimated fetal weight is ~756 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 26,
    babySizeLabel: "Scallion",
    sizeIcon: "🧅",
    babySizeCategory: "vegetable",
    approximateLength: null, // Omitted per editorial guidelines: reliable NHS/source length not specified for week 26
    approximateWeight: "856 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Eyelids that have been fused shut since the first trimester begin to open. Primitive air sac precursors continue developing in the lungs.",
    keyMilestones: [
      "Eyelids begin partially opening",
      "Primitive air sac precursors (alveoli) continue developing",
      "Estimated fetal weight is ~856 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 27,
    babySizeLabel: "Cauliflower",
    sizeIcon: "🥦",
    babySizeCategory: "vegetable",
    approximateLength: "~366 mm (head-to-heel)",
    approximateWeight: "969 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "The final week of the second trimester. Fetal brain tissue grows rapidly with increasing cortical convolutions. Rhythmic hiccup movements may be felt as gentle twitches.",
    keyMilestones: [
      "Second trimester concludes",
      "Fetal hiccups may be felt as rhythmic gentle twitches",
      "Estimated fetal weight is ~969 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 2,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 28,
    babySizeLabel: "Aubergine",
    sizeIcon: "🍆",
    babySizeCategory: "vegetable",
    approximateLength: "~376 mm (head-to-heel)",
    approximateWeight: "1,097 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Third trimester begins (28 completed weeks). The fetus can blink and turn toward sustained light. Brain tissue expands and develops complex cortical convolutions.",
    keyMilestones: [
      "Third trimester officially begins",
      "Eyelashes are fully formed; blinking reflex active",
      "Estimated fetal weight reaches ~1,097 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 29,
    babySizeLabel: "Butternut Squash",
    sizeIcon: "🎃",
    babySizeCategory: "vegetable",
    approximateLength: "~386 mm (head-to-heel)",
    approximateWeight: "1,239 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Bones are fully developed but remain soft and pliable to facilitate delivery. The brain can regulate primitive body temperature rhythms.",
    keyMilestones: [
      "Central nervous system directs rhythmic practice breathing motions",
      "Active storage of calcium, iron, and phosphorus in fetal bones",
      "Estimated fetal weight is ~1,239 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 30,
    babySizeLabel: "Cabbage",
    sizeIcon: "🥬",
    babySizeCategory: "vegetable",
    approximateLength: "~399 mm (head-to-heel)",
    approximateWeight: "1,396 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Amniotic fluid volume reaches its peak and begins to gradually decline as the fetus occupies more uterine space. Red blood cells are now completely manufactured by bone marrow.",
    keyMilestones: [
      "Amniotic fluid volume reaches peak levels",
      "Fine lanugo hair begins shedding from the face and shoulders",
      "Estimated fetal weight is ~1,396 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 31,
    babySizeLabel: "Coconut",
    sizeIcon: "🥥",
    babySizeCategory: "fruit",
    approximateLength: "~411 mm (head-to-heel)",
    approximateWeight: "1,568 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Pupillary light reflex develops; pupils can constrict and dilate in response to light. Subcutaneous white fat continues depositing under the skin.",
    keyMilestones: [
      "Pupillary light reflex becomes active",
      "Distinct active and quiet sleep cycles can be detected",
      "Estimated fetal weight is ~1,568 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 32,
    babySizeLabel: "Jicama",
    sizeIcon: "🥔",
    babySizeCategory: "vegetable",
    approximateLength: null, // Omitted per editorial guidelines: reliable NHS/source length not specified for week 32
    approximateWeight: "1,755 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Toenails are visible and fingernails reach the tips of the fingers. Movement sensations shift from large somersaults to targeted kicks and stretches due to confined space.",
    keyMilestones: [
      "Fingernails and toenails fully reach nail beds",
      "Fetus frequently settles into a cephalic (head-down) position",
      "Estimated fetal weight is ~1,755 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 33,
    babySizeLabel: "Pineapple",
    sizeIcon: "🍍",
    babySizeCategory: "fruit",
    approximateLength: "~437 mm (head-to-heel)",
    approximateWeight: "1,954 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Maternal antibodies (primarily IgG) actively cross the placenta to provide temporary immune protection after birth. Skull bones remain soft and pliable with open sutures.",
    keyMilestones: [
      "Maternal antibody transmission across the placenta accelerates",
      "Skull bones remain flexible with open fontanelles for delivery",
      "Estimated fetal weight is ~1,954 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 34,
    babySizeLabel: "Cantaloupe",
    sizeIcon: "🍈",
    babySizeCategory: "fruit",
    approximateLength: "~450 mm (head-to-heel)",
    approximateWeight: "2,162 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "The central nervous system and lungs continue maturing rapidly. The protective vernix caseosa thickens in skin creases across the body.",
    keyMilestones: [
      "Pulmonary surfactant production approaches mature levels",
      "Subcutaneous fat layers smooth out wrinkles on the skin",
      "Estimated fetal weight is ~2,162 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 35,
    babySizeLabel: "Honeydew Melon",
    sizeIcon: "🍈",
    babySizeCategory: "fruit",
    approximateLength: "~462 mm (head-to-heel)",
    approximateWeight: "2,378 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Kidneys are fully mature and the liver can process waste products. Most physical organ development is complete; remaining weeks are dedicated to healthy weight gain.",
    keyMilestones: [
      "Kidneys fully mature and functioning",
      "Rapid daily accumulation of subcutaneous fat",
      "Estimated fetal weight is ~2,378 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 36,
    babySizeLabel: "Romaine Lettuce",
    sizeIcon: "🥬",
    babySizeCategory: "vegetable",
    approximateLength: "~474 mm (head-to-heel)",
    approximateWeight: "2,594 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "The head may begin descending into the maternal pelvic inlet (lightening or engagement). Most of the lanugo coat has shed into the amniotic fluid.",
    keyMilestones: [
      "Fetal head may descend and engage in the maternal pelvis",
      "Sucking and swallowing reflexes are well-coordinated",
      "Estimated fetal weight is ~2,594 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 37,
    babySizeLabel: "Swiss Chard",
    sizeIcon: "🥬",
    babySizeCategory: "vegetable",
    approximateLength: null, // Omitted per editorial guidelines: reliable NHS/source length not specified for week 37
    approximateWeight: "2,806 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Reaching 37 weeks is clinically classified by ACOG as 'Early Term' (37 0/7 to 38 6/7 weeks). Fetal organ systems are capable of functioning independently outside the womb.",
    keyMilestones: [
      "Reaches clinical 'Early Term' classification (ACOG Committee Opinion No. 579)",
      "Firm grasp reflex established",
      "Estimated fetal weight is ~2,806 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_TERM, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 38,
    babySizeLabel: "Rhubarb",
    sizeIcon: "🎋",
    babySizeCategory: "vegetable",
    approximateLength: "~498 mm (head-to-heel)",
    approximateWeight: "3,006 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Organ systems are fully ready for extrauterine life. Vernix caseosa continues to shed into the amniotic fluid while intestines accumulate meconium.",
    keyMilestones: [
      "Organ systems fully ready for extrauterine life",
      "Fingernails extend past the fingertips",
      "Estimated fetal weight is ~3,006 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_FETUS_GROWS, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 39,
    babySizeLabel: "Small Watermelon",
    sizeIcon: "🍉",
    babySizeCategory: "fruit",
    approximateLength: "~507 mm (head-to-heel)",
    approximateWeight: "3,186 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Reaching 39 weeks is medically designated as 'Full Term' (39 0/7 to 40 6/7 weeks), the optimal window for neonatal outcomes. The chest is prominent and fat reserves are well-established.",
    keyMilestones: [
      "Reaches clinical 'Full Term' milestone (ACOG Committee Opinion No. 579)",
      "Placenta continues delivering protective maternal antibodies",
      "Estimated fetal weight is ~3,186 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_TERM, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
  {
    week: 40,
    babySizeLabel: "Pumpkin",
    sizeIcon: "🎃",
    babySizeCategory: "vegetable",
    approximateLength: "~512 mm (head-to-heel)",
    approximateWeight: "3,338 g (Estimated fetal weight — 50th percentile)",
    lengthMeasurementType: "head-to-heel",
    measurementType: "crown-to-heel",
    measurementTypeLabel: "Crown-to-Heel Length",
    developmentSummary:
      "Reaches the official estimated due date (280 days from LMP). Only a small percentage of births occur on the exact due date; most healthy arrivals occur within two weeks before or after.",
    keyMilestones: [
      "Estimated Due Date (EDD) reached",
      "Fully developed musculoskeletal, nervous, and pulmonary systems",
      "Estimated fetal weight is ~3,338 g at the INTERGROWTH-21st 50th percentile",
    ],
    trimester: 3,
    sources: [SOURCE_ACOG_DUE_DATE, SOURCE_ACOG_TERM, SOURCE_NHS_WEEKLY, SOURCE_INTERGROWTH_WEIGHT],
    medicalReviewStatus: "source_verified",
  },
];

export function getAllWeeksData(): PregnancyWeek[] {
  return PREGNANCY_WEEKS_DATA;
}

export function getWeekData(weekNumber: number): PregnancyWeek {
  const clampedWeek = Math.max(4, Math.min(40, Math.floor(weekNumber)));
  const found = PREGNANCY_WEEKS_DATA.find((item) => item.week === clampedWeek);
  if (!found) {
    return PREGNANCY_WEEKS_DATA[0];
  }
  return found;
}

export function getWeeksByTrimester(trimester: 1 | 2 | 3): PregnancyWeek[] {
  return PREGNANCY_WEEKS_DATA.filter((w) => w.trimester === trimester);
}
