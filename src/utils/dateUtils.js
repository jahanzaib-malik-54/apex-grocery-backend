export const createExpiryTimestamp = (expiry) => {
    const regex = /^(\d+)([smhd])$/i;

    const match = expiry.match(regex);

    if (!match) {
        throw new Error(
            "Invalid expiry format. Expected formats: '10s', '10m', '10h', '12d'"
        );
    }

    const value = parseInt(match[1], 10); // Get the number (value)
    let unit = match[2].toLowerCase(); // Get the unit and convert it to lowercase for consistency

    let milliseconds;

    // Determine the conversion to milliseconds based on the unit
    switch (unit) {
        case 's':
            milliseconds = value * 1000;
            break;
        case 'm':
            milliseconds = value * 60 * 1000;
            break;
        case 'h':
            milliseconds = value * 60 * 60 * 1000;
            break;
        case 'd':
            milliseconds = value * 24 * 60 * 60 * 1000;
            break;
        default:
            throw new Error(`Unsupported time unit: ${unit}`);
    }

    const expirationTimestamp = Date.now() + milliseconds;

    return expirationTimestamp;
};
