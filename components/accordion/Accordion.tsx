import React from 'react';
import {
  ScrollView,
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

const Header = styled(View)`bg-mediumpurple aic pv2`;
const HeaderText = styled(Text, { fontSize: 24 })`bold`;
const StyledScrollView = styled(ScrollView)``;
const TextAndIconContainer = styled(View)`flx-row jcsb`;
const StyledLineDivider = styled(LineDivider)`ml1 mt2`;

interface AccordionProps {
  headerText: string;
  children: JSX.Element;
  withScroll?: boolean;
  svStyle: any;
}

interface RenderAccordionChildrenProps {
  children: JSX.Element;
  withScroll?: boolean;
  svStyle: any;
}

export function Accordion({
  headerText,
  children,
  withScroll = false,
  svStyle,
}: AccordionProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const renderChildren = ({
    children,
    withScroll,
    svStyle,
  }: RenderAccordionChildrenProps) =>
    React.useMemo(() => {
      if (!!withScroll)
        return <StyledScrollView style={svStyle}>{children}</StyledScrollView>;
      else return <View>{children}</View>;
    }, [children]);

  const handleCollapseToggle = React.useCallback(() => {
    return setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <Collapse onToggle={handleCollapseToggle}>
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
          svStyle: svStyle,
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
});
