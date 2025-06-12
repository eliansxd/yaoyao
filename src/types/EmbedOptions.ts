import { Colors } from "../constants/colors";

export interface EmbedOptions {
    title?: string;
    description?: string;
    image?: string;
    thumbnail?: string;
    timestamp?: boolean;
    footer?: string;
    color?: Colors | number;
}
