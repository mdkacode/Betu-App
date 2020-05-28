import React, { useState, useEffect, useContext, Suspense } from 'react';
import { ScrollView, View, Dimensions, TouchableOpacity } from 'react-native';
import { ApplicationContext } from '../../Modules/context';
import FastImage from 'react-native-fast-image';
import {
  IconImage,
  RowText,
  CircleArea,
  LayoutContainer,
} from '../../Modules/GlobalStyles/GlobalStyle';
import CategoryLoader from '../../Loaders/CategoryLoader';
import { serverIP } from '../../constant';
import Axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface catProps {
  action: any;
}
const Categories = (props: catProps) => {
  const storeData = useContext(ApplicationContext);
  let { action } = props;
  const [categories, setCategories] = useState([]);
  const [isLoader, Loader] = useState(false);
  useEffect(() => {
    Loader(true);
    Axios({
      method: 'GET',
      url: `${serverIP}/api/category`,
    }).then((e) => {
      setCategories(e.data.message);
      Loader(false);
    });
  }, []);
  const selectCategory = (data: any) => {
    // console.log(data);
    storeData.category = {
      _id: data._id,
      name: data.name,
    };
    action();
  };

  return (
    <Suspense fallback={<CategoryLoader />}>
      <LayoutContainer marginTop={3}>
        <RowText paddingLeft={10} fontize={18} fontColor="black">
          Pick From Category
        </RowText>
        <ScrollView
          horizontal={true}
          style={{ flex: 1, height: windowHeight / 8 }}
          showsHorizontalScrollIndicator={false}>
          {isLoader && <CategoryLoader />}
          {categories.map((element: any) => (
            <TouchableOpacity onPress={() => selectCategory(element)}>
              <CircleArea height={500} width={windowWidth / 6}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <FastImage
                    source={{ uri: element.imageList[0] }}
                    style={{
                      width: 35,
                      height: 30,
                      margin: 10,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                  />

                  <RowText style={{ alignSelf: 'center' }} fontize={10} fontColor="black">
                    {element.name}
                  </RowText>
                </View>
              </CircleArea>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LayoutContainer>
    </Suspense>
  );
};

export default Categories;
