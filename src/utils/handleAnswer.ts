import { CountryMetric } from "../api/types";

type Guess = "A" | "B";

export const HandleAnswer = (
  countryA: CountryMetric,
  countryB: CountryMetric,
  guess: Guess
): boolean => {
  if (guess === "A") {
    return countryA.value > countryB.value;
  } else {
    return countryB.value > countryA.value;
  }
};