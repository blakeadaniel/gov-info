import React from 'react';
import { Alert, View, Pressable } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewSource } from 'react-native-webview/lib/WebViewTypes';
import { styled, styledWithRefForwarding } from '@shipt/react-native-tachyons';
import { API_KEY } from '../constants/Key';
import { ENDPOINTS } from '../constants/Endpoints';
import { Bar } from 'react-native-progress';
import { errorText } from '../utils/getErrorMessageText';
import { TEXT } from '../constants/Text';
import { FontAwesome } from '@expo/vector-icons';

const HeaderContainer = styled(View)`bg-white mt3`;
const ButtonContainer = styled(View)`flx-row asfe mh3 mv2`;
const BackButton = styled(Pressable)`asc pr3`;
const ForwardButton = styled(Pressable)`asc`;
const StyledWebView = styledWithRefForwarding(WebView)`flx-i`;

type GovWebView = {
  route: {
    params: {
      source: string;
    };
  };
};

export function GovWebView({ route }: GovWebView) {
  const [progress, setProgress] = React.useState(0);
  const [canGoBack, setCanGoBack] = React.useState(false);
  const [canGoForward, setCanGoForward] = React.useState(false);
  const webViewRef = React.useRef<WebView>();

  const handleBackPress = () => {
    webViewRef?.current?.goBack();
  };
  const handleForwardPress = () => {
    webViewRef?.current?.goForward();
  };

  return (
    <>
      {progress !== 1 && (
        <Bar
          progress={progress}
          width={null}
          borderWidth={0}
          borderRadius={0}
          color={'#808080'}
        />
      )}
      <HeaderContainer>
        <ButtonContainer>
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
        </ButtonContainer>
      </HeaderContainer>
      <StyledWebView
        ref={webViewRef}
        source={{
          uri: `${ENDPOINTS.PACKAGE_DETAILS}${route.params.source}`,
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
        onNavigationStateChange={(state) => {
          setCanGoBack(state.canGoBack);
          setCanGoForward(state.canGoForward);
        }}
      />
    </>
  );
}
