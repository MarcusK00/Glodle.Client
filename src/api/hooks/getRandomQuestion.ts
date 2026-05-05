import { useEffect, useState } from "react";
import { gqlFetch } from "../client";
import { GET_QUESTION } from "../queries";
import { Question } from "../types";

export function useQuestion() {
  const [data, setData] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gqlFetch<{ randomQuestion: Question }>(GET_QUESTION)
      .then((res) => setData(res.randomQuestion))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}