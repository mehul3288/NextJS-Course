function createSlug(title) {
    return (
        title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s]/g, "")
            .replace(/\s+/g, "-") +
        "-" +
        Date.now()
    );
}

function extractImages(content) {
    const images = [];

    if (!content?.blocks) return images;

    content.blocks.forEach((block) => {
        if (block.type === "image") {
            images.push(
                block?.data?.file?.url
            );
        }
    });

    return images;
}
module.exports = { createSlug, extractImages };