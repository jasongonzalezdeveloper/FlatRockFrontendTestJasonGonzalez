import { OptionEnum, OptionName } from "./Enums";

export interface SelectibleOption {
    option_type: string;
    option_name: OptionName;
    option:      Array<OptionEnum | number>;
}

