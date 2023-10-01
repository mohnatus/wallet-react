import { useMatches } from "react-router-dom";
import { routes } from "../constants/routes";

export function useStatsPage() {
    const matches = useMatches();
    const isStatsPage = matches[1].pathname === routes.stats;
    return isStatsPage
}