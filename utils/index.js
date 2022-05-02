import * as dayjs from "dayjs";
import * as Chance from "chance";

const chance = new Chance();

export const generateUID = () => chance.guid({ version: 4 });
export const generateRandomNumber = () => parseInt(dayjs(new Date()).valueOf());
