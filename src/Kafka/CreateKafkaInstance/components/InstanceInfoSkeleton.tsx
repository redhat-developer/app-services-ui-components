import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Grid,
  GridItem,
  Skeleton,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { ClockIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { InstanceInfoProps } from "./InstanceInfo";

export const InstanceInfoSkeleton: VoidFunctionComponent<InstanceInfoProps> = ({
  isTrial,
  onClickQuickStart,
}) => {
  const { t } = useTranslation("create-kafka-instance-with-sizes");
  return (
    <Stack hasGutter data-testid={"instance-info"}>
      <StackItem>
        <Card isFlat>
          <CardTitle component="h2">{t("instance_information")}</CardTitle>
          <CardBody>
            <DescriptionList isCompact>
              <DescriptionListGroup>
                <Grid sm={6} lg={12} hasGutter>
                  {!isTrial && (
                    <GridItem data-testid={"instance-size"}>
                      <DescriptionListTerm>
                        {t("common:size")}
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        <Skeleton
                          width="35%"
                          screenreaderText="Loading contents"
                        />
                      </DescriptionListDescription>
                    </GridItem>
                  )}
                  {isTrial && (
                    <GridItem>
                      <DescriptionListTerm>
                        {t("kafka:duration")}
                      </DescriptionListTerm>
                      <DescriptionListDescription>
                        <ClockIcon color="var(--pf-global--info-color--100)" />{" "}
                        <Skeleton
                          width="35%"
                          screenreaderText="Loading contents"
                        />
                      </DescriptionListDescription>
                    </GridItem>
                  )}
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:ingress")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      <Skeleton width="75%" />
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:egress")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      <Skeleton width="66%" />
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:storage")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      <Skeleton width="66%" />
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:partitions")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      <Skeleton width="50%" />
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:client_connections")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      <Skeleton width="33%" />
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:connection_rate")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      <Skeleton width="25%" />
                    </DescriptionListDescription>
                  </GridItem>
                  <GridItem>
                    <DescriptionListTerm>
                      {t("kafka:message_size")}
                    </DescriptionListTerm>
                    <DescriptionListDescription>
                      <Skeleton width="55%" />
                    </DescriptionListDescription>
                  </GridItem>
                </Grid>
              </DescriptionListGroup>
            </DescriptionList>
          </CardBody>
        </Card>
      </StackItem>
      <StackItem>
        <Card isFlat isCompact>
          <CardTitle component="h2">{t("quick_start_guide_title")}</CardTitle>
          <CardBody>
            <Button
              isSmall
              isInline
              variant={ButtonVariant.link}
              onClick={onClickQuickStart}
            >
              {t("quick_start_guide_message_exp")}
            </Button>
          </CardBody>
        </Card>
      </StackItem>
    </Stack>
  );
};
