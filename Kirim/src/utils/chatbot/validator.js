import {
    formatPhoneNumber,
    formatInstagram,
    formatUrl,
    isValidPhoneNumber,
    isValidInstagram,
    isValidUrl,
    isValidGoogleDriveUrl
} from './formatter';

export const validateField = (value, step) => {
    if (!value.trim() || !step) {
        return { status: null, message: "", preview: "" };
    }

    const v = value.trim();

    if (step.validation === "phone" || step.key === "phone_number") {
        const formatted = formatPhoneNumber(v);
        const isValid = isValidPhoneNumber(formatted);

        if (isValid) {
            return {
                status: "valid",
                message: "✓ Format nomor telepon benar!",
                preview: formatted,
            };
        } else if (v.length < 10) {
            return {
                status: "warning",
                message: "Nomor terlalu pendek. Minimal 10 digit.",
                preview: "",
            };
        } else {
            return {
                status: "invalid",
                message: "Format belum benar. Contoh: 081234567890",
                preview: formatted,
            };
        }
    }

    if (step.validation === "instagram" || step.key === "instagram") {
        const formatted = formatInstagram(v);
        const isValid = isValidInstagram(formatted);

        if (isValid) {
            return {
                status: "valid",
                message: "✓ Username Instagram valid!",
                preview: formatted,
            };
        } else if (v.length < 3) {
            return {
                status: "warning",
                message: "Username terlalu pendek.",
                preview: "",
            };
        } else {
            return {
                status: "invalid",
                message: "Format belum benar. Contoh: @username atau username",
                preview: formatted,
            };
        }
    }

    if (step.validation === "url") {
        const formatted = formatUrl(v);
        const isValid = isValidUrl(formatted);

        if (isValid) {
            return {
                status: "valid",
                message: "✓ Link valid!",
                preview: formatted,
            };
        } else {
            return {
                status: "invalid",
                message: "Format link belum benar. Contoh: https://instagram.com/p/xxxxx",
                preview: "",
            };
        }
    }

    if (step.options && step.options.length > 0) {
        const normalizedInput = v.toUpperCase();
        const validOption = step.options.find(
            (opt) => opt.toUpperCase() === normalizedInput
        );

        if (validOption) {
            return {
                status: "valid",
                message: `✓ Pilihan valid: "${validOption}"`,
                preview: "",
            };
        } else {
            return {
                status: "warning",
                message: `Pilih salah satu: ${step.options.join(", ")}`,
                preview: "",
            };
        }
    }

    return { status: null, message: "", preview: "" };
};

export const validateAnswer = (answer, step) => {
    const v = answer.trim();

    if (step.validation === "phone" || step.key === "phone_number") {
        const formatted = formatPhoneNumber(v);
        if (!isValidPhoneNumber(formatted)) {
            return {
                isValid: false,
                message: 'Format nomor telepon tidak valid. Coba lagi dengan nomor yang benar ya! 😊\n\nContoh: 081234567890',
                formatted: formatted
            };
        }
        return { isValid: true, formatted, message: `Nomor telepon kamu: ${formatted}` };
    }

    if (step.validation === "instagram" || step.key === "instagram") {
        const formatted = formatInstagram(v);
        if (!isValidInstagram(formatted)) {
            return {
                isValid: false,
                message: 'Format Instagram tidak valid. Pastikan username benar ya! 😊\n\nContoh: @username atau username',
                formatted: formatted
            };
        }
        return { isValid: true, formatted, message: `Instagram kamu: ${formatted}` };
    }

    if (step.validation === "url") {
        const formatted = formatUrl(v);
        if (!isValidUrl(formatted)) {
            return {
                isValid: false,
                message: 'Format link tidak valid. Pastikan link lengkap ya! 😊\n\nContoh: https://instagram.com/p/xxxxx',
                formatted: formatted
            };
        }
        return { isValid: true, formatted, message: `Link kamu: ${formatted}` };
    }

    if (step.options && step.options.length > 0) {
        const normalizedInput = v.toUpperCase();
        const validOption = step.options.find(opt => opt.toUpperCase() === normalizedInput);

        if (!validOption) {
            return {
                isValid: false,
                message: `Pilih salah satu: ${step.options.join(" atau ")} ya 😊`,
                formatted: v
            };
        }
        return { isValid: true, formatted: validOption, message: null };
    }

    if (step.key === "proofDocuments") {
        const formatted = formatUrl(v);
        if (!isValidGoogleDriveUrl(formatted)) {
            return {
                isValid: false,
                message: 'Link harus dari Google Drive ya! 😊\n\nContoh yang benar:\n• drive.google.com/drive/folders/xxxxx\n• drive.google.com/file/d/xxxxx',
                formatted: formatted
            };
        }
        return { isValid: true, formatted, message: `Link Google Drive: ${formatted}` };
    }

    return { isValid: true, formatted: v, message: null };
};