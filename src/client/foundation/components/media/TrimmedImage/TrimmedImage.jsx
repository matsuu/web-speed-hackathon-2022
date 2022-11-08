import React, { useEffect, useState } from "react";

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように拡大縮小したサイズを返す
 */

/**
 * @typedef Size
 * @property {number} width
 * @property {number} height
 */

/** @type {(cv: Size, img: Size) => Size} */
const calcImageSize = (cv, img) => {
  const constrainedHeight = cv.width * (img.height / img.width);

  if (constrainedHeight >= cv.height) {
    return {
      height: constrainedHeight,
      width: cv.width,
    };
  }

  const constrainedWidth = cv.height * (img.width / img.height);

  return {
    height: cv.height,
    width: constrainedWidth,
  };
};

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const imageUrl = src.replace(/(.*)\/([^\/]*)\.jpg/, '$1/' + width + 'x' + height + '-$2.avif');
  if (width == 100) {
    return <img height={height} src={imageUrl} width={width} loading="lazy" decoding="async" />;
  }
  return <img src={imageUrl} loading="lazy" decoding="async" />;
};
