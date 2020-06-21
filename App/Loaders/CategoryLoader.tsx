import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';

const CategoryLoader = () => (
  <ContentLoader
    speed={0.4}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#a9a9a9">
    <Rect x="22" y="14" rx="14" ry="14" width="62" height="60" />
    <Rect x="401" y="5" rx="14" ry="14" width="108" height="96" />
    <Rect x="414" y="110" rx="0" ry="0" width="84" height="5" />
    <Rect x="424" y="123" rx="7" ry="7" width="68" height="21" />
    <Rect x="42" y="82" rx="0" ry="0" width="24" height="6" />
    <Rect x="115" y="10" rx="14" ry="14" width="62" height="60" />
    <Rect x="135" y="78" rx="0" ry="0" width="24" height="6" />
    <Rect x="199" y="8" rx="14" ry="14" width="62" height="60" />
    <Rect x="219" y="76" rx="0" ry="0" width="24" height="6" />
    <Rect x="292" y="4" rx="14" ry="14" width="62" height="60" />
    <Rect x="312" y="72" rx="0" ry="0" width="24" height="6" />
  </ContentLoader>
);

export default CategoryLoader;
