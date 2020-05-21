import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const CategoryLoader = () => (
  <ContentLoader
    speed={0.7}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#a9a9a9">
    <Rect x="35" y="21" rx="9" ry="9" width="55" height="53" />
    <Rect x="44" y="83" rx="4" ry="4" width="40" height="10" />
    <Rect x="123" y="18" rx="9" ry="9" width="55" height="53" />
    <Rect x="236" y="21" rx="9" ry="9" width="55" height="53" />
    <Rect x="332" y="21" rx="9" ry="9" width="55" height="53" />
    <Rect x="246" y="83" rx="4" ry="4" width="40" height="8" />
    <Rect x="133" y="83" rx="4" ry="4" width="40" height="9" />
    <Rect x="340" y="86" rx="4" ry="4" width="40" height="9" />
  </ContentLoader>
);

export default CategoryLoader;
