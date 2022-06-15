import * as Chance from "chance";

const chance = new Chance();

export const generateUID = () => chance.guid({ version: 4 });

export const constant = {
    DATE_TIME_FORMAT: 'DD-MM-YYYY HH:mm:ss'
}

export const fetcher = (url) => fetch(url).then((res) => res.json());