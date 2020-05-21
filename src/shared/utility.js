export const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties
    };
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required) {
        isValid = isValid && value.trim() !== '';
    }

    if(rules.minLength) {
        isValid = isValid && value.length >= rules.minLength;
    }

    if(rules.isEmail) {
        // eslint-disable-next-line
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
}