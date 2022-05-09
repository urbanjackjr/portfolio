type singleValidation = (a: string) => boolean;

export const nameValidation: singleValidation = (value) => {
    if (value.length > 1) {
        return true;
    }

    return false;
}

export const emailValidation: singleValidation = (value) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
    }

    return false;
}

export const emptyValidation: singleValidation = (value) => {
    if (value) {
        return true;
    }

    return false;
}

export const escapeString = (value: string): string => {
    const entityMap: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    return String(value).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s];
    });
}