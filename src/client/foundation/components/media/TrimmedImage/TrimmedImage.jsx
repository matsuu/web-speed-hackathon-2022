import React, { useEffect, useState } from "react";

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように拡大縮小したサイズを返す
 */

/**
 * @typedef Props
 * @property {string} src
 * @property {number} width
 * @property {number} height
 */

/** @type {React.VFC<Props>} */
export const TrimmedImage = ({ height, src, width }) => {
  const imageUrl = src.replace(/(.*)\/([^\/]*)/, '$1/' + width + 'x' + height + '-$2');
  return <img src={dataUrl} />;
};
