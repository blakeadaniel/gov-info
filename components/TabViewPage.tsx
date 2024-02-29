import React from 'react';
import { View, useWindowDimensions, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { styled } from '@shipt/react-native-tachyons';

const TabContainer = styled(View)`flx-i`;

type TabViewPageProps = {
  children: React.ReactNode[];
};

export function TabViewPage({ children }: TabViewPageProps) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'house', title: 'House' },
    { key: 'senate', title: 'Senate' },
    { key: 'both', title: 'Both' },
  ]);

  const Routes = React.useCallback(() => {
    return {
      house: () => <TabContainer>{children[0]}</TabContainer>,
      senate: () => <TabContainer>{children[1]}</TabContainer>,
      both: () => <TabContainer>{children[2]}</TabContainer>,
    };
  }, [children]);

  const renderScene = SceneMap({
    both: Routes().both,
    house: Routes().house,
    senate: Routes().senate,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'silver' }}
    />
  );

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
    />
  );
}
