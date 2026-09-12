// src/data/diagnosesData.js

const diagnosesData = [
  {
    id: 1,
    colloquialName: "Decay",
    scientificName: "Dental Caries",
    image: "/src/images/Dental Caries.jpg",
    description: "Decay can appear as black, brown, or grey spots, holes (cavities), or dark areas near the gums. Teeth might feel sensitive to hot, cold, or sweet foods, and might feel sore to bite down on. It is important to fix decay before it reaches the nerve inside your tooth! Decay is fixed with a filling. It is important to see your dentist or oral health therapist as soon as you can to put a filling in your tooth.",
    treatment: "Dental filling or restorative treatment by a dentist or oral health therapist.",
    top: 35,
    left: 48
  },
  {
    id: 2,
    colloquialName: "Chipped tooth",
    scientificName: "Tooth Fracture",
    image: "/src/images/ToothFracture.png",
    description: "Chipped teeth can happen because of many things. Eating hard foods, a knock into a tooth during sports or a fall, grinding teeth. See your dentist or oral health therapist to have a chipped tooth examined to determine if a filling is necessary. Your oral health professional can also tell you how to stop more chipped teeth!",
    treatment: "Dental evaluation, smoothing edges, or composite bonding/filling.",
    top: 42,
    left: 32
  },
  {
    id: 3,
    colloquialName: "Gum disease",
    scientificName: "Gingivitis / Periodontitis",
    image: "/src/images/Gingivitis.jpg",
    description: "If your gum is swollen, red, bleeding or sore, sometimes with bad breath you may have gum disease. Gum disease happens when there is too much plaque around your tooth. See your dentist or oral health therapist so they can determine the cause, possibly clean your teeth and teach you how to prevent it in the future!",
    treatment: "Professional cleaning, scaling, and improved daily brushing/flossing.",
    top: 65,
    left: 55
  },
  {
    id: 4,
    colloquialName: "Yellow tooth",
    scientificName: "Tooth Discoloration",
    image: "/src/images/sensitive.jpg",
    description: "Teeth aren't naturally pearly white! They do have a bit of colour to them. Yellow teeth can be because of the tooth's natural colour, staining from food or drink. Smoking and vaping can also discolour your teeth. If you are concerned bring it up with your dentist or oral health therapist at your next visit.",
    treatment: "Professional advice, hygiene cleaning, or whitening consultation.",
    top: 48,
    left: 65
  },
  {
    id: 5,
    colloquialName: "Recession",
    scientificName: "Gingival Recession",
    image: "/src/images/Gingivitis.jpg",
    description: "Recession is when your gum pulls back from your tooth. This can cause sensitivity. There is a number of causes but the most common is hard toothbrushing, so make sure you are using a soft toothbrush or an electric toothbrush. Tell your dentist or oral health therapist when you see them!",
    treatment: "Soft toothbrushing technique, desensitizing toothpaste, and monitoring.",
    top: 58,
    left: 38
  },
  {
    id: 6,
    colloquialName: "Gaps between teeth",
    scientificName: "Diastema",
    image: "/src/images/Edentulism.jpg",
    description: "Spaces between teeth for some people is completely natural! Other causes can be from teeth not erupting, early loss of tooth. See your oral health therapist or dentist to figure out why you have the spaces and if you need any orthodontic treatment to get it fixed.",
    treatment: "Orthodontic evaluation, monitoring, or alignment treatment.",
    top: 28,
    left: 42
  },
  {
    id: 7,
    colloquialName: "Crowding",
    scientificName: "Dental Crowding",
    image: "/src/images/Dental Caries.jpg",
    description: "Overlapped teeth can occur naturally because teeth are a bit too big and become cramped together. Crowded teeth can make it hard to clean teeth, which might cause cavities or gum disease. See your oral health therapist or dentist to figure out why you have the spaces and if you need any orthodontic treatment to get it fixed.",
    treatment: "Orthodontic evaluation and tailored oral hygiene guidance.",
    top: 30,
    left: 58
  },
  {
    id: 8,
    colloquialName: "Ulcer",
    scientificName: "Aphthous Ulcer",
    image: "/src/images/OralCandidiasis.jpg",
    description: "Ulcers can happen due to many things. They usually resolve on their own. Use salt water rinses daily to help things go back to normal. If things do not get better after a week see your oral health therapist or dentist, or even doctor!",
    treatment: "Salt water mouth rinses, topical gels, or professional check if persistent.",
    top: 72,
    left: 45
  }
];

export const symptomCardsData = [
  {
    id: "cold",
    title: "Cold",
    desc: "Do you experience short sharp pain when you have something cold to drink or eat? This is called sensitivity. It can happen in one tooth or all over your mouth. If the sensitivity is short or sharp you might be able to fix it with sensitive toothpaste. It is important to prevent sensitivity by preventing recession. Sensitivity can also be a sign of decay in your tooth. If sensitivity is very painful or lingering it is best to see your dentist or oral health therapist.",
    image: "/src/images/cold.jpg"
  },
  {
    id: "hot",
    title: "Hot",
    desc: "Do you experience short sharp pain when you have something hot to drink or eat? This is called sensitivity. It can happen in one tooth or all over your mouth. If the sensitivity is short or sharp you might be able to fix it with sensitive toothpaste. It is important to prevent sensitivity by preventing recession. Sensitivity can also be a sign of decay in your tooth. If sensitivity is very painful or lingering it is best to see your dentist or oral health therapist.",
    image: "/src/images/hot.jpg"
  },
  {
    id: "bleeding",
    title: "Bleeding",
    desc: "Is there bleeding in your mouth? It can be from your gums. This is usually a sign of gum disease. Gum disease is because there is plaque hanging around your teeth. It is important to clean teeth well with brushing and flossing. It is best to tell your dentist or oral health therapist so they can examine your gums and help you with your cleaning. If the bleeding is not from your gums it is best to have a health professional have a look at your mouth.",
    image: "/src/images/bleed.jpg"
  },
  {
    id: "wiggly",
    title: "Wiggly teeth",
    desc: "Wiggly teeth can be caused by multiple things. If it's a baby tooth that is normal, unless it stays wiggly for a long time and doesn't want to come out. Sometimes teeth can become wiggly from a big knock or hit to them. Gum disease can also cause wiggly teeth. If an adult tooth is wiggly it is best to see your dentist or oral health therapist straight away to find the cause and best treatment.",
    image: "/src/images/loose.jpg"
  },
  {
    id: "pain",
    title: "Pain",
    desc: "If a tooth is sore it could mean there is an infection inside the tooth and it will need treatment quickly so that we can try and save the tooth! If your tooth is causing pain when you eat, sore all the time, waking you up at night stopping you from sleeping or going to school it is best to see your dentist or oral health therapist as soon as possible.",
    image: "/src/images/sensitive.jpg"
  }
];

export default diagnosesData;
