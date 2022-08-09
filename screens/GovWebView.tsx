import React from 'react';
import { Alert, View, Pressable } from 'react-native';
import WebView from 'react-native-webview';
import { styled, styledWithRefForwarding } from '@shipt/react-native-tachyons';
import { ENDPOINTS } from '../constants/Endpoints';
import { Bar } from 'react-native-progress';
import { TEXT } from '../constants/Text';
import { FontAwesome } from '@expo/vector-icons';
import { LineDivider } from '../components/LineDivider';

const HeaderContainer = styled(View, { paddingTop: 40 })`bg-white`;
const ButtonContainer = styled(View)`flx-row jcsb mh3 mv2`;
const ExitButton = styled(View)`asfs`;
const BackButton = styled(Pressable)`asc pr3`;
const ForwardButton = styled(Pressable)`asc`;
const StyledWebView = styledWithRefForwarding(WebView)`flx-i`;

type GovWebView = {
  route: {
    params: {
      source: string;
      goBack?: () => void;
      pop?: () => void;
      uri: string;
    };
  };
};

export function GovWebView({ route }: GovWebView) {
  const [progress, setProgress] = React.useState(0);
  const [canGoBack, setCanGoBack] = React.useState(false);
  const [canGoForward, setCanGoForward] = React.useState(false);
  const webViewRef = React.useRef<WebView>();

  const handleBackPress = React.useCallback(() => {
    return webViewRef?.current?.goBack();
  }, [webViewRef]);

  const handleForwardPress = React.useCallback(() => {
    return webViewRef?.current?.goForward();
  }, [webViewRef]);

  const handleGoBack = React.useCallback(() => {
    if (route.params.goBack) {
      return route.params.goBack();
    }
    if (route.params.pop) {
      return route.params.pop();
    } else return () => {};
  }, [route.params]);

  return (
    <>
      <HeaderContainer>
        <ButtonContainer>
          <ExitButton>
            <Pressable onPress={handleGoBack}>
              <FontAwesome name='close' size={25} color={'#808080'} />
            </Pressable>
          </ExitButton>
          <View style={{ flexDirection: 'row' }}>
            <BackButton>
              <Pressable onPress={handleBackPress}>
                <FontAwesome
                  name='arrow-left'
                  size={25}
                  color={canGoBack ? '#808080' : '#d9d9d9'}
                />
              </Pressable>
            </BackButton>
            <ForwardButton>
              <Pressable onPress={handleForwardPress}>
                <FontAwesome
                  name='arrow-right'
                  size={25}
                  color={canGoForward ? '#808080' : '#d9d9d9'}
                />
              </Pressable>
            </ForwardButton>
          </View>
        </ButtonContainer>
      </HeaderContainer>
      <LineDivider />
      {progress !== 1 && (
        <Bar
          progress={progress}
          width={null}
          borderWidth={0}
          borderRadius={0}
          color={'#808080'}
        />
      )}
      <StyledWebView
        ref={webViewRef}
        source={{
          uri: route.params.uri
            ? route.params.uri
            : `${ENDPOINTS.PACKAGE_DETAILS}${route.params.source}`,
        }}
        originWhitelist={['*']}
        onLoadProgress={({ nativeEvent }: any) =>
          setProgress(nativeEvent.progress)
        }
        allowsFullscreenVideo
        pullToRefreshEnabled
        onError={(event: any) =>
          Alert.alert(
            TEXT.SOMETHING_WENT_WRONG,
            `${event.nativeEvent.description}`,
            [
              {
                text: TEXT.OKAY,
                style: 'default',
              },
            ]
          )
        }
        onMessage={(event: any) =>
          Alert.alert('', `${event.nativeEvent.description}`, [
            {
              text: TEXT.OKAY,
              style: 'default',
            },
          ])
        }
        onNavigationStateChange={(state: any) => {
          setCanGoBack(state.canGoBack);
          setCanGoForward(state.canGoForward);
        }}
      />
    </>
  );
}
