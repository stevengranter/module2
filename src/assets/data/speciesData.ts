
export type speciesType = {
  id: number,
  imgSrc: string,
  commonName: string,
  scientificName: string,
  nickName?: (undefined | string),
  family: string,
  diet: string,
  habitat: string,
  description: string
}

export const speciesData: speciesType[] = [
  {

    id: 14,
    imgSrc: 'cepaea_nemoralis.png',
    commonName: "Common Garden Snail",
    scientificName: "Cepaea nemoralis",
    nickName: "Nemo",
    family: "Helicidae",
    diet: "Herbivorous (feeds on leaves, flowers, and decaying plant matter)",
    habitat: "Woodlands, meadows, and gardens",
    description: "A terrestrial snail known for its variable shell color patterns, often found in gardens and grassy areas."
  },
  {
    id: 11,
    imgSrc: 'armadillidiidae.png',
    commonName: "Roly-Poly",
    scientificName: "Armadillidiidae",
    nickName: "Dilly",
    family: "Armadillidiidae",
    diet: "Decaying plant material (detritivore)",
    habitat: "Moist environments like leaf litter, under rocks and logs",
    description: "Also known as pillbugs, they are terrestrial crustaceans, known for their ability to roll into a ball."
  },
  {
    id: 12,
    imgSrc: 'salticus_scenicus.png',
    commonName: "Zebra Spider",
    scientificName: "Salticus scenicus",
    nickName: "Salty",
    family: "Salticidae",
    diet: "Small insects (hunts actively)",
    habitat: "Gardens, homes, and various outdoor environments",
    description: "A small jumping spider recognizable by its black and white striped pattern, known for its agile movement."
  },
  {
    id: 13,
    imgSrc: 'lumbricus_terrestris.png',
    commonName: "Earthworm",
    scientificName: "Lumbricus terrestris",
    nickName: "Lumby",
    family: "Lumbricidae",
    diet: "Decomposing organic matter (detritivore)",
    habitat: "Soil, especially in gardens and farmland",
    description: "A vital soil organism that aerates and enriches the soil through its burrowing and feeding habits."
  },
  {
    id: 1,
    imgSrc: 'chrysopa_rufilabris.png',
    commonName: "Common Green Lacewing",
    scientificName: "Chrysopa rufilabris",
    nickName: "Crissy",
    family: "Chrysopidae",
    diet: "Aphids, mealybugs, and other small insects (as larvae)",
    habitat: "Gardens and agricultural fields",
    description: "A small, delicate insect recognized by its green wings and golden eyes, useful for controlling pests."
  },
  {
    id: 2,
    imgSrc: 'apis_mellifera.png',
    commonName: "Honeybee",
    scientificName: "Apis mellifera",
    nickName: "Melli",
    family: "Apidae",
    diet: "Nectar and pollen from flowers",
    habitat: "Gardens, farms, and natural areas",
    description: "Social insects renowned for their vital role in pollination and honey production."
  },
  {
    id: 5,
    imgSrc: "formica_rufibarbis.png",
    commonName: "Common Ant",
    scientificName: "Formica rufibarbis",
    nickName: "Rubarb",
    family: "Formicidae",
    diet: "Variety of foods including seeds, nectar, and other insects",
    habitat: "Forests, gardens, and urban areas",
    description: "Small social insects that live in colonies and play important roles in the ecosystem."
  },
  {
    id: 8,
    imgSrc: 'hippodamia_convergens.png',
    commonName: "Ladybug",
    scientificName: "Hippodamia convergens",
    nickName: "Damia",
    family: "Coccinellidae",
    diet: "Aphids and other pests",
    habitat: "Gardens, fields, and forests",
    description: "Recognizable by their distinctive red or orange color with black spots, they are beneficial insects in pest control."
  },
  {
    id: 15,
    imgSrc: 'enallagma_cyathigerum.png',
    commonName: "Northern Bluet",
    scientificName: "Enallagma cyathigerum",
    nickName: "Llagma",
    family: "Coenagrionidae",
    diet: "Small insects, including mosquitoes (as adults)",
    habitat: "Wetlands, marshes, and along lakes and streams",
    description: "A small, slender damselfly recognized for its striking blue coloration and black markings, often found near freshwater."
  },
  {
    id: 18,
    imgSrc: 'src/assets/images/lophocampa_maculata.png',
    commonName: "Spotted Tussock Moth",
    scientificName: "Lophocampa maculata",
    family: "Erebidae",
    diet: "Leaves of deciduous trees and shrubs (larvae feed on various host plants)",
    habitat: "Wooded areas, gardens, and fields",
    description: "A distinctive moth known for its striking black and white coloration and hairy caterpillars, which are often found on plants."
  },
  {
    id: 17,
    imgSrc: 'src/assets/images/polydrusus_formosus.png',
    commonName: "Formosan Leaf Weevil",
    scientificName: "Polydrusus formosus",
    family: "Curculionidae",
    diet: "Leaves and tender shoots of various plants",
    habitat: "Forests, gardens, and agricultural areas",
    description: "A small, green weevil recognized for its elongated snout; it causes minimal damage to plants but can be a pest in gardens."
  },

];