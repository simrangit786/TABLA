import {getUserRole} from "./controller/localStorageHandler";
import {getI18n} from "react-i18next";

export const Role = (props) => {
    const role = getUserRole();
    if (!props.isReverse) {
        if (props.allow.includes(role)) {
            return props.children;
        }
        return null
    }
    if (props.allow.includes(role)) {
        return null;
    }
    return props.children;
};

export function isAccessible(allow = [], isReverse = false) {
    const role = getUserRole();
    if (!isReverse) {
        return !!allow.includes(role);

    }
    return !allow.includes(role);

}


export function getDateTime(datetime) {
    // const options = {year: 'numeric', month: 'long', day: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit'};
    let language = getI18n().language;
    const dateOptions = {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris'};
    const timeOptions = {hour12: false, hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris'};
    let last_update = new Date(datetime);
    last_update = last_update.toLocaleDateString(language, dateOptions) + " " + last_update.toLocaleTimeString(language, timeOptions)
    return last_update
}

export const years = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
]

export const dateFormat = 'DD/MM/YYYY';
export const getStatus = {
    true: "Actif",
    false: "Inactif"
}
