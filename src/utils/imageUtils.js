export function convertImageSize(imageUrl, fromSize = "t_thumb", toSize = "t_cover_big") {
    if (!imageUrl || typeof imageUrl !== 'string') return null;
    
    if (!imageUrl.includes(fromSize)) {
        console.warn(`Image URL doesn't contain the expected format parameter: ${fromSize}`);
        return imageUrl;
    }
    
    return imageUrl.replace(fromSize, toSize);
}

/* 
IGDB Image Sizes
t_thumb
t_cover_small
t_cover_big
t_screenshot_med
t_screenshot_big
t_screenshot_huge
*/