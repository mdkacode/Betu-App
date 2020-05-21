import React, {useState, Suspense} from 'react';
import {LayoutContainer, RowText} from '../Modules/GlobalStyles/GlobalStyle';
import {BackgroundColor, Darkest} from '../Modules/GlobalStyles/GlobalColors';
const Categories = React.lazy(() =>
    import('../Components/Categories/Categories'),
  ),
  CategoryLoader = React.lazy(() => import('./CategoryLoader'));
interface InoData {
  navigation: any;
  topic?: string;
}
const Nodata = (props: InoData) => {
  let {navigation, topic} = props;
  const [getCategory, setCategory] = useState('');
  const navigate = (e: any) => {
    navigation.navigate('Products', {title: 'Categories'});
  };

  const fontFormat = 'Italic';
  return (
    <LayoutContainer>
      <RowText
        fontColor={Darkest}
        fontFormat="Italic"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{alignSelf: 'center'}}>
        {`No ${topic ? topic : 'Data'} Found ...`}
      </RowText>
      <Suspense fallback={<CategoryLoader />}>
        <Categories action={() => navigate(setCategory)} />
      </Suspense>
    </LayoutContainer>
  );
};

export default Nodata;
