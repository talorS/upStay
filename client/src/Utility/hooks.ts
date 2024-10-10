import { Ref, useCallback, useEffect, useState } from "react";

export const useIntersection = <T extends HTMLElement>(): [boolean, Ref<T>] => {
    const [intersecting, setIntersecting] = useState<boolean>(false);
    const [element, setElement] = useState<HTMLElement>();
    useEffect(() => {
        if (!element) return;
        const observer = new IntersectionObserver((entries) => {
            setIntersecting(entries[0]?.isIntersecting)
        })
        observer.observe(element)
        return () => observer.unobserve(element);
    }, [element]);
    return [intersecting, (el) => el && setElement(el)];
}

export const useToggle = (init = {}): [Record<string, boolean>, (rowIndex: number) => void] => {
    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>(init);

    const toggleRowExpansion = useCallback((rowIndex: number) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [rowIndex]: !prevState[rowIndex],
        }));
    }, []);

    return [expandedRows, toggleRowExpansion];
};

export const useFilter = (init = ''): [string, (selectedUuid: string) => void] => {
    const [selectedUuid, setSelectedUuid] = useState(init);
    const filterReservations = useCallback((selectedUuid: string) => {
        setSelectedUuid(selectedUuid);
    }, []);

    return [selectedUuid, filterReservations];
};