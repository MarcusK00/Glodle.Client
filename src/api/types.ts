export interface Question {
  id: number;
  label: string;
  column_key: string;
  unit: string;
}

export interface CountryMetric {
  country: string;
  value: number;
  flag_url:string;
  unit: string;
  label: string;
}

export interface Round {
  countries: CountryMetric[];
  question: Question;
}