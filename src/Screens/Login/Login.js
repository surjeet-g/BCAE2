import React, { useEffect } from "react";

import { Col, Row, Grid } from "react-native-easy-grid";
import { useTheme } from "react-native-paper";
import { Text } from "react-native-paper";

export const Login = () => {
  const { colors } = useTheme();
  return (
    <Grid>
      <Col>
        <Text variant="displayLarge" style={{ color: colors.primary }}>
          Display Large
        </Text>
        <Text variant="displayMedium" style={{ color: colors.secondary }}>
          Display Medium
        </Text>
        <Text variant="displaySmall" style={{ color: colors.tertiary }}>
          Display small
        </Text>

        <Text variant="headlineLarge">Headline Large</Text>
        <Text variant="headlineMedium">Headline Medium</Text>
        <Text variant="headlineSmall">Headline Small</Text>

        <Text variant="titleLarge">Title Large</Text>
        <Text variant="titleMedium">Title Medium</Text>
        <Text variant="titleSmall">Title Small</Text>

        <Text variant="bodyLarge">Body Large</Text>
        <Text variant="bodyMedium">Body Medium</Text>
        <Text variant="bodySmall">Body Small</Text>

        <Text variant="labelLarge">Label Large</Text>
        <Text variant="labelMedium">Label Medium</Text>
        <Text variant="labelSmall">Label Small</Text>
      </Col>
      <Col>
        <Row>
          <Text variant="labelSmall">Label Small</Text>
        </Row>
        <Row>
          <Text variant="labelSmall">Label Small</Text>
        </Row>
      </Col>
    </Grid>
  );
};
