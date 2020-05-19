import React, {useState, useEffect, useContext} from 'react';
import {ScrollView, View, Dimensions, TouchableOpacity} from 'react-native';
import {ApplicationContext} from '../../Modules/context';
import {
  IconImage,
  RowView,
  CircleArea,
  LayoutContainer,
} from '../../Modules/GlobalStyles/GlobalStyle';
import {serverIP} from '../../constant';
import Axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface catProps {
  action: any;
}
const Categories = (props: catProps) => {
  const storeData = useContext(ApplicationContext);
  let {action} = props;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    Axios({
      method: 'GET',
      url: `${serverIP}/api/category`,
    }).then((e) => {
      console.log(e, 'datassss');
      setCategories(e.data.message);
    });
  }, []);
  const selectCategory = (data: any) => {
    console.log(data);
    storeData.category = {
      _id: data._id,
      name: data.name,
    };
    action();
  };

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
          <TouchableOpacity onPress={() => selectCategory(element)}>
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
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LayoutContainer>
  );
};

export default Categories;
