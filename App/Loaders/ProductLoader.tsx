import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const ProductLoader = () => (
  <ContentLoader
    speed={0.4}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#a9a9a9">
    <Rect x="4" y="10" rx="14" ry="14" width="108" height="96" />
    <Rect x="17" y="115" rx="0" ry="0" width="84" height="5" />
    <Rect x="27" y="129" rx="7" ry="7" width="68" height="21" />
    <Rect x="132" y="10" rx="14" ry="14" width="108" height="96" />
    <Rect x="145" y="115" rx="0" ry="0" width="84" height="5" />
    <Rect x="155" y="129" rx="7" ry="7" width="68" height="21" />
    <Rect x="263" y="6" rx="14" ry="14" width="108" height="96" />
    <Rect x="277" y="110" rx="0" ry="0" width="84" height="5" />
    <Rect x="287" y="127" rx="7" ry="7" width="68" height="21" />
    <Rect x="401" y="5" rx="14" ry="14" width="108" height="96" />
    <Rect x="414" y="110" rx="0" ry="0" width="84" height="5" />
    <Rect x="424" y="123" rx="7" ry="7" width="68" height="21" />
  </ContentLoader>
);

export default ProductLoader;
