export function isValidEmail(email) {
    // Step 1: Check if there's exactly one @ symbol
    const atSymbolIndex = email.indexOf('@');
    if (atSymbolIndex === -1 || email.indexOf('@', atSymbolIndex + 1) !== -1) {
        return false;
    }

    // Step 2: Ensure @ is not at the start or end
    if (atSymbolIndex === 0 || atSymbolIndex === email.length - 1) {
        return false;
    }

    // Step 3: Ensure there's at least one . after the @ symbol
    const dotIndex = email.indexOf('.', atSymbolIndex);
    if (dotIndex === -1) {
        return false;
    }

    // Step 4: Ensure . is not directly after @ or at the end
    if (dotIndex === atSymbolIndex + 1 || dotIndex === email.length - 1) {
        return false;
    }

    // Step 5: Ensure there are characters before @, between @ and ., and after .
    const localPart = email.slice(0, atSymbolIndex);
    const domainPart = email.slice(atSymbolIndex + 1, dotIndex);
    const topLevelDomain = email.slice(dotIndex + 1);

    if (!localPart || !domainPart || !topLevelDomain) {
        return false;
    }

    // If all checks pass, the email is valid
    return true;
}

export function isInvalidText(text) {
    return !text || text.trim() === '';
}

export function isValidPassword(password) {
    // Step 1: Check for minimum length of 6 characters
    if (password.length < 6) {
        return false;
    }

    // Step 2: Check for at least one uppercase letter
    let hasUppercase = false;
    // Step 3: Check for at least one alphanumeric character (letter or number)
    let hasAlphanumeric = false;

    for (let i = 0; i < password.length; i++) {
        const char = password[i];

        if (char >= 'A' && char <= 'Z') {
            hasUppercase = true;
        }

        if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') || (char >= '0' && char <= '9')) {
            hasAlphanumeric = true;
        }

        // If both conditions are met, no need to continue checking
        if (hasUppercase && hasAlphanumeric) {
            return true;
        }
    }

    // If we finish the loop and haven't found both conditions, return false
    return false;
}