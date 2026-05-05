import { useEffect, useState } from "react";
import { gqlFetch } from "../client";
import { GET_ROUND } from "../queries";
import { Round } from "../types";

export function useRound(roundKey:number) {
  const [round, setRound] = useState<Round | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    gqlFetch<{ randomRound: Round }>(GET_ROUND)
      .then((res) => setRound(res.randomRound))
      .finally(() => setLoading(false));
  }, [roundKey]);

  return { round, loading };
}