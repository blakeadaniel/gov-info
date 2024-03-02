/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Image, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { SingleCollectionScreen } from '../screens/SingleCollectionScreen';
import { GovWebView } from '../screens/GovWebView';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { TabThreeScreen } from '../screens/TabThreeScreen';
import InfoIcon from '../assets/svgs/info.svg';
import { PopUp } from '../components/pop-up/PopUp';
import { TEXT } from '../constants/Text';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const capDomeImg = require('../assets/images/CRC.png');

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='NotFound'
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Screen
        name='SingleCollectionScreen'
        component={SingleCollectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='GovWebView'
        component={GovWebView}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen
          name='Modal'
          component={ModalScreen}
          options={{ headerShown: false }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'containedTransparentModal',
          animation: 'fade',
        }}
      >
        <Stack.Screen
          name='PopUp'
          component={PopUp}
          options={{ headerShown: false }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName='AtAGlance'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name='AtAGlance'
        component={TabThreeScreen}
        options={({ navigation }: RootTabScreenProps<'AtAGlance'>) => ({
          title: 'At A Glance',
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarAllowFontScaling: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='institution' color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() =>
                navigation.navigate('PopUp', {
                  text: TEXT.AT_A_GLANCE_INFO,
                })
              }
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <TabBarIcon
                name='info-circle'
                color={'#000000'}
                iconSize={18}
                iconStyle={{ marginRight: 12 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name='DateSearch'
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'DateSearch'>) => ({
          title: 'Date search',
          tabBarLabel: 'Date search',
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarAllowFontScaling: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='book' color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Image
                source={capDomeImg}
                style={{ width: 38, height: 38, marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name='KeywordSearch'
        component={TabTwoScreen}
        options={({ navigation }: RootTabScreenProps<'KeywordSearch'>) => ({
          title: 'Keyword search',
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarAllowFontScaling: false,
          tabBarIcon: ({ color }) => <TabBarIcon name='search' color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <Image
                source={capDomeImg}
                style={{ width: 38, height: 38, marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  iconSize?: number;
  iconStyle?: any;
}) {
  return (
    <FontAwesome
      size={props.iconSize ?? 30}
      style={{ marginBottom: -3, ...props.iconStyle }}
      {...props}
    />
  );
}
