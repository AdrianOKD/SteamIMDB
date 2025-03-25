/**
 * Converts an IGDB image URL from one size format to another.
 *
 * @param {string} imageUrl - The original image URL containing a size parameter
 * @param {string} [fromSize="t_thumb"] - The current size parameter to replace (default: "t_thumb")
 * @param {string} [toSize="t_cover_big"] - The new size parameter to use (default: "t_cover_big")
 * @returns {string|null} The converted image URL, original URL if format not found, or null if invalid input
 *
 * @example
 * // Convert from thumbnail to big cover
 * convertImageSize("https://images.igdb.com/igdb/image/upload/t_thumb/co1wyy.jpg");
 * // Returns: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg"
 *
 * @example
 * // Convert from small cover to screenshot huge
 * convertImageSize("https://images.igdb.com/igdb/image/upload/t_cover_small/co1wyy.jpg", "t_cover_small", "t_screenshot_huge");
 * // Returns: "https://images.igdb.com/igdb/image/upload/t_screenshot_huge/co1wyy.jpg"
 */

export function convertImageSize(
  imageUrl,
  fromSize = "t_thumb",
  toSize = "t_cover_big"
) {
  if (!imageUrl || typeof imageUrl !== "string") return null;
  if (!imageUrl.includes(fromSize)) {
    console.warn(
      `Image URL doesn't contain the expected format parameter: ${fromSize}`
    );
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
