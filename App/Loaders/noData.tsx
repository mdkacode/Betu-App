import React, {useState, Suspense} from 'react';
import {LayoutContainer, RowText} from '../Modules/GlobalStyles/GlobalStyle';
import {BackgroundColor, Darkest} from '../Modules/GlobalStyles/GlobalColors';
const Categories = React.lazy(() =>
    import('../Components/Categories/Categories'),
  ),
  CategoryLoader = React.lazy(() => import('./CategoryLoader'));
interface InoData {
  navigation: any;
}
const Nodata = (props: InoData) => {
  const [getCategory, setCategory] = useState('');
  const navigate = (e: any) => {
    props.navigation.navigate('Products', {title: 'Categories'});
  };

  return (
    <LayoutContainer>
      <RowText
        fontColor={Darkest}
        fontFoarmat="Italic"
        style={{alignSelf: 'center'}}>
        No data Found
      </RowText>
      <Suspense fallback={<CategoryLoader />}>
        <Categories action={() => navigate(setCategory)} />
      </Suspense>
    </LayoutContainer>
  );
};

export default Nodata;
