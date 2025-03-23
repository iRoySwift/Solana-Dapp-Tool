import blue from "./blue";
import gray from "./gray";
import green from "./green";
import neutral from "./neutral";
import orange from "./orange";
import red from "./red";
import rose from "./rose";
import slate from "./slate";
import stone from "./stone";
import violet from "./violet";
import yellow from "./yellow";
import zinc from "./zinc";

export { colors } from "./colors";

export const themeColor = [
  {
    name: "zinc",
    label: "Zinc",
    ...zinc,
  },
  {
    name: "slate",
    label: "Slate",
    ...slate,
  },
  {
    name: "stone",
    label: "Stone",
    ...stone,
  },
  {
    name: "gray",
    label: "Gray",
    ...gray,
  },
  {
    name: "neutral",
    label: "Neutral",
    ...neutral,
  },
  {
    name: "red",
    label: "Red",
    ...red,
  },
  {
    name: "rose",
    label: "Rose",
    ...rose,
  },
  {
    name: "orange",
    label: "Orange",
    ...orange,
  },
  {
    name: "green",
    label: "Green",
    ...green,
  },
  {
    name: "blue",
    label: "Blue",
    ...blue,
  },
  {
    name: "yellow",
    label: "Yellow",
    ...yellow,
  },
  {
    name: "violet",
    label: "Violet",
    ...violet,
  },
];

export type ThemeColor = (typeof themeColor)[number];
