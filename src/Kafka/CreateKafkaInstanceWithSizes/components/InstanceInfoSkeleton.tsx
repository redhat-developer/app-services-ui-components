import {
  Button,
  ButtonVariant,
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListGroup,
  Grid,
  GridItem,
  Skeleton,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { InstanceInfoProps } from "./InstanceInfo";

export const InstanceInfoSkeleton: VoidFunctionComponent<
  Pick<InstanceInfoProps, "onClickQuickStart">
> = ({ onClickQuickStart }) => {
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
                  <GridItem>
                    <Skeleton width="75%" screenreaderText="Loading contents" />
                  </GridItem>
                  <GridItem>
                    <Skeleton width="66%" />
                  </GridItem>
                  <GridItem>
                    <Skeleton width="66%" />
                  </GridItem>
                  <GridItem>
                    <Skeleton width="50%" />
                  </GridItem>
                  <GridItem>
                    <Skeleton width="33%" />
                  </GridItem>
                  <GridItem>
                    <Skeleton width="25%" />
                  </GridItem>
                  <GridItem>
                    <Skeleton width="55%" />
                  </GridItem>
                  <GridItem>
                    <Skeleton width="35%" />
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
