export const formatWhatsApp = (input) => {
    if (!input) return input;

    let numbers = input.replace(/\D/g, "");

    if (numbers.startsWith("0")) {
        numbers = "62" + numbers.substring(1);
    }

    if (!numbers.startsWith("62")) {
        numbers = "62" + numbers;
    }

    const countryCode = numbers.substring(0, 2);
    const phoneNumber = numbers.substring(2);

    return `wa.me/${countryCode}-${phoneNumber}`;
};

export const formatInstagram = (input) => {
    if (!input) return input;

    let username = input.trim();
    username = username.replace(/^https?:\/\//, "");
    username = username.replace(/^www\./, "");
    username = username.replace(/^instagram\.com\/?/, "");
    username = username.replace(/^@/, "");
    username = username.replace(/\/$/, "");
    username = username.split("?")[0].split("#")[0];

    return `instagram.com/${username}`;
};

export const formatPhoneNumber = (input) => {
    if (!input) return input;
    
    let numbers = input.replace(/\D/g, "");
    
    if (numbers.startsWith("0")) {
        numbers = numbers.substring(1);
    }
    
    if (numbers.startsWith("62")) {
        numbers = numbers.substring(2);
    }
    
    return "0" + numbers;
};

export const formatUrl = (input) => {
    if (!input) return input;
    
    let url = input.trim();
    
    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url;
    }
    
    return url;
};

export const isValidWhatsApp = (input) => {
    if (!input) return false;
    return /^wa\.me\/62-\d{8,15}$/.test(input);
};

export const isValidInstagram = (input) => {
    if (!input) return false;
    return /^instagram\.com\/[a-zA-Z0-9._]+$/.test(input);
};

export const isValidPhoneNumber = (input) => {
    if (!input) return false;
    return /^0\d{9,12}$/.test(input);
};

export const isValidUrl = (input) => {
    if (!input) return false;
    try {
        const url = new URL(input);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
};

export const isValidGoogleDriveUrl = (input) => {
    if (!input) return false;
    return /^https?:\/\/(drive|docs)\.google\.com\/(drive\/folders\/|file\/d\/|open\?id=)[\w-]+/.test(input);
};