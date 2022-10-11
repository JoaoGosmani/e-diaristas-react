import useIsMobile from "data/hooks/useIsMobile";

export default function useMinhasDiarias() {
    const isMobile = useIsMobile();

    return { isMobile };
}