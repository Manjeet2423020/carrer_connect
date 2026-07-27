/**
 * @description Generates an SEO friendly URL slug from a title string
 * Example: "Senior React Developer!" -> "senior-react-developer-a1b2c"
 * 
 * @param {string} title - Job Title or Company Name
 * @returns {string} Clean URL slug
 */
export const generateSlug = (title) => {
    if (!title) return '';

    const cleanTitle = title
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[\s_]+/g, '-')       // Spaces & underscores ko hyphen (-) se replace karta hai
        .replace(/[^\w\-]+/g, '')      // Special characters (!, @, #, etc.) remove karta hai
        .replace(/\-\-+/g, '-');       // Multiple hyphens ko single hyphen banata hai

    // Har slug ke aage 5-character random string add karte hain taaki exact duplicate titles par issue na aaye
    const uniqueId = Math.random().toString(36).substring(2, 7);
    return `${cleanTitle}-${uniqueId}`;
};
