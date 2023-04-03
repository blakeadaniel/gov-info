import { Platform as RNPlatform } from 'react-native';

export function Platform(ifIOS: any, ifAndroid: any) {
  return RNPlatform.OS === 'ios' ? ifIOS : ifAndroid;
}

Platform.OS = RNPlatform.OS;
Platform.Version = RNPlatform.Version;
