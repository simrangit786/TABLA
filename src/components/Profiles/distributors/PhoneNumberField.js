import {Image} from "../../Images";

export const phone = [
    {
        country: "france",
        flag: Image.flag_france,
        country_code: "+33",
        formatting: [
            {
                field: "phone_1",
                max: 2
            }, {
                field: "phone_2",
                max: 2
            }, {
                field: "phone_3",
                max: 2
            }, {
                field: "phone_4",
                max: 2
            }, {
                field: "phone_5",
                max: 2
            },
        ]
    }, {
        country: "portugal",
        flag: Image.flag_portugal,
        country_code: "+351",
        formatting: [
            {
                field: "phone_1",
                max: 3
            }, {
                field: "phone_2",
                max: 4
            }, {
                field: "phone_3",
                max: 2
            }
        ]
    }, {
        country: "belgium",
        flag: Image.flag_belgium,
        country_code: "+32",
        formatting: [
            {
                field: "phone_1",
                max: 3
            }, {
                field: "phone_2",
                max: 4
            }, {
                field: "phone_3",
                max: 2
            }
        ]
    }, {
        country: "switzerland",
        flag: Image.flag_switzerland,
        country_code: "+41",
        formatting: [
            {
                field: "phone_1",
                max: 3
            }, {
                field: "phone_2",
                max: 4
            }, {
                field: "phone_3",
                max: 2
            }
        ]
    }, {
        country: "luxembourg",
        flag: Image.flag_luxembourg,
        country_code: "+352",
        formatting: [
            {
                field: "phone_1",
                max: 3
            }, {
                field: "phone_2",
                max: 4
            }, {
                field: "phone_3",
                max: 2
            }
        ]
    }, {
        country: "costa rica",
        flag: Image.flag_costa,
        country_code: "+506",
        formatting: [
            {
                field: "phone_1",
                max: 3
            }, {
                field: "phone_2",
                max: 4
            }, {
                field: "phone_3",
                max: 1
            }
        ]
    }, {
        country: "us",
        flag: Image.flag_united_states,
        country_code: "+1",
        formatting: [
            {
                field: "phone_1",
                max: 3
            }, {
                field: "phone_2",
                max: 3
            }, {
                field: "phone_3",
                max: 4
            }
        ]
    }, {
        country: "uk",
        flag: Image.flag_united_kingdom,
        country_code: "+44",
        formatting: [
            {
                field: "phone_1",
                max: 4
            }, {
                field: "phone_2",
                max: 6
            }
        ]
    }, {
        country: "germany",
        flag: Image.flag_germany,
        country_code: "+49",
        formatting: [
            {
                field: "phone_1",
                max: 3
            }, {
                field: "phone_2",
                max: 4
            }, {
                field: "phone_3",
                max: 3
            }
        ]
    }, {
        country: "spain",
        flag: Image.flag_spain,
        country_code: "+34",
        formatting: [
            {
                field: "phone_1",
                max: 3
            }, {
                field: "phone_2",
                max: 4
            }
        ]
    }, {
        country: "italy",
        flag: Image.flag_italy,
        country_code: "+39",
        formatting: [
            {
                field: "phone_1",
                max: 3
            }, {
                field: "phone_2",
                max: 4
            }, {
                field: "phone_3",
                max: 2
            }
        ]
    },
];

export const getPhoneFields = (country_code) => {
    const country = phone.find(obj => obj.country_code === country_code);
    if (country)
        return country.formatting;
    else
        return null


};

export const getPhoneFormatting = (country_code, value) => {
    const country = phone.find(obj => obj.country_code === country_code);
    if (country) {
        let phoneArray = [];
        country.formatting.map(obj => {
            let val = [value.slice(0, obj.max), value.slice(obj.max)];
            value = val[1];
            phoneArray.push(val[0])
        });
        return phoneArray.join("-")
    } else {
        return ''
    }
};
