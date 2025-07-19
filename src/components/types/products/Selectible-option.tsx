import { OptionName } from "./Enums";

export interface SelectibleOption {
    option_type: string;
    option_name: OptionName;
    option:      string[];
}

