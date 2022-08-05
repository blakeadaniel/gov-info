import React from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { WebViewSource } from 'react-native-webview/lib/WebViewTypes';
import { styled, styledWithRefForwarding } from '@shipt/react-native-tachyons';
import { API_KEY } from '../constants/Key';
import { ENDPOINTS } from '../constants/Endpoints';

const WebViewContainer = styled(View)`flx-i ba`;
const StyledWebView = styledWithRefForwarding(WebView)`flx-i`;

type GovWebView = {
    route: {
        params: {
            source: string;
        }
    }
}

export function GovWebView({route}:GovWebView ) {
    const webViewRef = React.useRef<WebView>();

    return (
        // <WebViewContainer>
        <StyledWebView
        ref={webViewRef}
        source={{
            uri: `${ENDPOINTS.PACKAGE_DETAILS}${route.params.source}`
          }}
        originWhitelist={['*']}
        />
        // </WebViewContainer>
    )
}