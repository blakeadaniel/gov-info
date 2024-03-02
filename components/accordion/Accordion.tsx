import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import { styled } from '@shipt/react-native-tachyons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import { LineDivider } from '../LineDivider';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledScrollView = styled(ScrollView)``;
const TextAndIconContainer = styled(View)`flx-row jcsb`;
const StyledLineDivider = styled(LineDivider)`ml1 mt2`;

interface AccordionProps {
  headerText: string;
  children: JSX.Element;
  withScroll?: boolean;
}

interface RenderAccordionChildrenProps {
  children: JSX.Element;
  withScroll?: boolean;
}

export function Accordion({
  headerText,
  children,
  withScroll = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const renderChildren = ({
    children,
    withScroll,
  }: RenderAccordionChildrenProps) =>
    React.useMemo(() => {
      if (!!withScroll)
        return (
          <StyledScrollView showsVerticalScrollIndicator={false}>
            {children}
          </StyledScrollView>
        );
      else return <View>{children}</View>;
    }, [children]);

  const handleCollapseToggle = React.useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <Collapse style={{ width: '100%' }} onToggle={handleCollapseToggle}>
      <CollapseHeader style={styles.headerContainer}>
        <TextAndIconContainer>
          <Text style={{ fontSize: 18, marginLeft: 4 }}>{headerText}</Text>
          <FontAwesome
            name={isOpen ? 'chevron-down' : 'chevron-up'}
            size={20}
          />
        </TextAndIconContainer>
        <StyledLineDivider />
      </CollapseHeader>
      <CollapseBody>
        {renderChildren({
          children: children,
          withScroll: withScroll,
        })}
      </CollapseBody>
    </Collapse>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginBottom: 2,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 12,
    marginRight: 20,
  },
  body: {
    marginBottom: 180,
  },
});
