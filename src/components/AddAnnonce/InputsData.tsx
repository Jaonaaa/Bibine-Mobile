export const inputsFirst = [
  {
    title: "Marque",
    type: "dropdown",
    name: "marque",
    options: [
      {
        value: 1,
        label: "Mercedes",
      },
      {
        value: 2,
        label: "Audi",
      },
      {
        value: 3,
        label: "Chevrolet",
      },
    ],
  },
];

export const inputsSecond = [
  {
    title: "Modèle",
    type: "dropdown",
    name: "modele",
    options: [
      {
        value: 1,
        label: "45 TVI ",
      },
      {
        value: 2,
        label: "TR-Z 66",
      },
    ],
  },
  {
    title: "Année de sortie",
    type: "month",
    name: "date",
  },
];
export const inputsThird = [
  {
    title: "Description",
    type: "textarea",
    name: "description",
  },
];

export const inputsFourth = [
  {
    title: "Quantité en stock",
    type: "number",
    name: "quanity",
  },
  {
    title: "Details",
    type: "list",
    name: "details",
  },
];

export const inputsFifth = [
  {
    title: "Photos",
    type: "file",
    name: "pictures",
    extra: "pictures",
  },
];
