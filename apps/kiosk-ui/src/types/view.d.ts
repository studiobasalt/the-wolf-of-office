type View = {
    id?: string;
    name?: string;
    sections?: ViewSection[];
}

type ViewSection = {
    name?: string;
    url?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    zoom?: number;
    refreshInterval?: number;
}