import { Grid, GridItem, PageSection } from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import React from "react";
import { TopicPartitionsApproachingLimit } from "./Components/TopicPartitionsApproachingLimit";
import { Topics } from "./Components/Topics";
import { ConsumerGroups } from "./Components/ConsumerGroups";

export const TopRowCardsApproachingLimit: VoidFunctionComponent = () => {
  return (
    <React.Fragment>
      <PageSection>
        <Grid hasGutter>
          <GridItem sm={4}>
            <Topics />
          </GridItem>
          <GridItem sm={4}>
            <TopicPartitionsApproachingLimit />
          </GridItem>
          <GridItem sm={4}>
            <ConsumerGroups />
          </GridItem>
        </Grid>
      </PageSection>
    </React.Fragment>
  );
};
