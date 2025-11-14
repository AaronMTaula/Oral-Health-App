// src/data/diagnosesData.js

const diagnosesData = [
  {
    id: 1,
    image: "/src/images/Gum-abscess-1296x728-slide01.jpg",
    scientificName: "Periapical Abscess",
    colloquialName: "Tooth Abscess",
    description: "A localized infection at the tip of the tooth root that causes pain and swelling.",
    treatment: "Treatment usually involves drainage, antibiotics, and root canal therapy.",
    objectPosition: "75% center",
    //width: "100%",              
    //height: "300%",             
    //objectFit: "contain"       
  },
  {
    id: 2,
    image: "/src/images/Dental Caries.jpg",
    scientificName: "Dental Caries",
    colloquialName: "Tooth Decay",
    description: "Decay of the tooth structure caused by bacteria that produce acids.",
    treatment: "Treatment involves removal of decay and restoring the tooth with a filling or crown."
  },
  {
    id: 3,
    image: "/src/images/Perricoronitis.jpg",
    scientificName: "Pericoronitis",
    colloquialName: "Wisdom Tooth Infection",
    description: "Inflammation around a partially erupted wisdom tooth.",
    treatment: "Treatment may include cleaning, antibiotics, or removal of the wisdom tooth."
  },
  {
    id: 4,
    image: "/src/images/Edentulism.jpg",
    scientificName: "Edentulism",
    colloquialName: "Tooth Loss",
    description: "The condition of being without natural teeth.",
    treatment: "Treatment options include dentures, bridges, or dental implants.",
    objectPosition: "50% 20%",
    width: "100%",              
    height: "100%",             
    //objectFit: "fixed" 
  },
    {
    id: 5,
    image: "/src/images/Gingivitis.jpg",
    scientificName: "Gingivitis",
    colloquialName: "Gum Inflammation",
    description: "Inflammation of the gums usually caused by plaque buildup.",
    treatment: "Improved oral hygiene, professional cleaning, and sometimes antimicrobial rinses.",
    category: "Periodontal Diseases",
    severity: "Mild",
    symptoms: ["Red, swollen gums", "Bleeding while brushing"],
    objectPosition: "90% ",
    width: "100%",
    //height: "auto",
    //objectFit: "fit"
  },
  {
    id: 6,
    image: "/src/images/Periodontitis.jpg",
    scientificName: "Periodontitis",
    colloquialName: "Advanced Gum Disease",
    description: "Serious gum infection that damages soft tissue and destroys the bone supporting teeth.",
    treatment: "Scaling and root planing, antibiotics, and possibly surgery.",
    category: "Periodontal Diseases",
    severity: "Severe",
    symptoms: ["Loose teeth", "Gum recession", "Persistent bad breath"],
    objectPosition: "45% center",
    width: "100%",
    //height: "auto",
    objectFit: "cover"
  },

  // Oral Mucosa & Soft Tissue Conditions
  {
    id: 7,
    image: "/src/images/OralCandidiasis.jpg",
    scientificName: "Oral Candidiasis",
    colloquialName: "Thrush",
    description: "Fungal infection of the mouth caused by Candida species.",
    treatment: "Antifungal medications, maintaining oral hygiene.",
    category: "Oral Mucosal Conditions",
    severity: "Mild to Moderate",
    symptoms: ["White patches", "Redness", "Painful mouth"],
    objectPosition: "50% center",
    width: "100%",
    height: "auto",
    objectFit: "cover"
  },
  {
    id: 8,
    image: "/src/images/Leukoplakia.jpg",
    scientificName: "Leukoplakia",
    colloquialName: "White Oral Patches",
    description: "White patches in the mouth that can be precancerous.",
    treatment: "Monitoring, biopsy if needed, and removal of risk factors such as smoking.",
    category: "Oral Mucosal Conditions",
    severity: "Varies",
    symptoms: ["White or gray patches", "Thickened oral tissue"],
    objectPosition: "50% center",
    width: "100%",
    //height: "auto",
    objectFit: "cover"
  },

  // Salivary Gland Disorders
  {
    id: 9,
    image: "/src/images/Xerostomia.jpg",
    scientificName: "Xerostomia",
    colloquialName: "Dry Mouth",
    description: "Reduced saliva flow leading to dry mouth.",
    treatment: "Hydration, saliva substitutes, managing underlying causes.",
    category: "Salivary Gland Disorders",
    severity: "Mild to Moderate",
    symptoms: ["Dry mouth", "Difficulty swallowing", "Burning sensation"],
    objectPosition: "30% center",
    width: "100%",
    //height: "auto",
    objectFit: "cover"
  },

  // Trauma & Injuries
  {
    id: 10,
    image: "/src/images/ToothFracture.png",
    scientificName: "Tooth Fracture",
    colloquialName: "Broken Tooth",
    description: "Cracks or breaks in the tooth structure caused by trauma or biting forces.",
    treatment: "Dental bonding, crowns, or extraction depending on severity.",
    category: "Trauma & Injuries",
    severity: "Varies",
    symptoms: ["Pain", "Sharp edges", "Difficulty chewing"],
    objectPosition: "50% center",
    width: "100%",
    //height: "auto",
    objectFit: "cover"
  },

  // Jaw & TMJ Disorders
  {
    id: 11,
    image: "/src/images/TMJDisorder.jpg",
    scientificName: "Temporomandibular Joint Disorder",
    colloquialName: "TMJ Dysfunction",
    description: "Problems with the jaw joint and surrounding muscles causing pain and difficulty moving the jaw.",
    treatment: "Pain management, physical therapy, bite splints, sometimes surgery.",
    category: "Jaw & TMJ Disorders",
    severity: "Moderate",
    symptoms: ["Jaw pain", "Clicking sounds", "Difficulty opening mouth"],
    objectPosition: "90% center",
    width: "100%",
    //height: "auto",
    objectFit: "cover"
  },

  // Oral Cancer
  {
    id: 12,
    image: "/src/images/OralCancer.jpg",
    scientificName: "Oral Squamous Cell Carcinoma",
    colloquialName: "Oral Cancer",
    description: "Malignant tumor of the oral cavity, most commonly squamous cell carcinoma.",
    treatment: "Surgery, radiation therapy, chemotherapy.",
    category: "Oral & Oropharyngeal Cancer",
    severity: "Severe",
    symptoms: ["Persistent ulcers", "White or red patches", "Bleeding"],
    objectPosition: "50% center",
    width: "100%",
    //height: "auto",
    objectFit: "cover"
  }
];

export default diagnosesData;
