import React, {useState, useEffect} from 'react';
import {ScrollView, View, Dimensions} from 'react-native';
import {
  IconImage,
  RowView,
  CircleArea,
  LayoutContainer,
} from '../../Modules/GlobalStyles/GlobalStyle';
import Axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    Axios({
      method: 'GET',
      url: 'http://52.186.14.151/api/category',
    }).then((e) => {
      setCategories(e.data.message);
    });
  }, []);

  return (
    <LayoutContainer marginTop={1}>
      <RowView paddingLeft={10} fontize={18} fontColor="black">
        Pick From Category
      </RowView>
      <ScrollView
        horizontal={true}
        style={{flex: 1, height: windowHeight / 8}}
        showsHorizontalScrollIndicator={false}>
        {categories.map((element: any) => (
          <CircleArea height={500} width={windowWidth / 6}>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <IconImage
                source={{uri: element.imageList[0]}}
                width={30}
                height={30}
                margin={12}
              />
              <RowView paddingLeft={5} fontize={12} fontColor="black">
                {element.name}
              </RowView>
            </View>
          </CircleArea>
        ))}
      </ScrollView>
    </LayoutContainer>
  );
};

export default Categories;
