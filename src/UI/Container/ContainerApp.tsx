import {View} from 'react-native';
import React, {memo} from 'react';

import HeaderApp from '../Navigation/HeaderApp';
import TabBottom from '../Navigation/TabBottom';
import Colors from '../../Common/Colors';

interface ContainerAppProps {
  title?: string;
  navigation: any;
  children: any;
  headerLeftVisible: boolean;
}
const ContainerApp: React.FC<ContainerAppProps> = ({
  title = '',
  navigation,
  children,
  headerLeftVisible = false,
}) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.backgroundColor}}>
      <HeaderApp
        navigation={navigation}
        title={title}
        headerLeftVisible={headerLeftVisible}
        goBack={true}
      />
      <View style={{flex: 1}}>{children}</View>
      <TabBottom navigation={navigation} />
    </View>
  );
};

export default memo(ContainerApp);
