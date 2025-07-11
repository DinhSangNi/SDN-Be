export declare const SLOT_TIME: {
    readonly 1: {
        readonly start: "07:00";
        readonly end: "09:15";
    };
    readonly 2: {
        readonly start: "09:30";
        readonly end: "11:45";
    };
    readonly 3: {
        readonly start: "12:30";
        readonly end: "14:45";
    };
    readonly 4: {
        readonly start: "15:00";
        readonly end: "17:15";
    };
};
export type SlotNumber = keyof typeof SLOT_TIME;
