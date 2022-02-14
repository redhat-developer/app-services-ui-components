import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { PageSection, Button } from "@patternfly/react-core";
import { useHistory } from "react-router-dom";
import { EmptyState, EmptyStateVariant } from "../EmptyState";

export const PageNotFound: VoidFunctionComponent = () => {
  const { t } = useTranslation();

  function GoHomeBtn() {
    const history = useHistory();
    function handleClick() {
      history.push("/");
    }
    return (
      <Button onClick={handleClick}>{t("common:return_to_home_page")}</Button>
    );
  }

  return (
    <PageSection padding={{ default: "noPadding" }} isFilled>
      <EmptyState
        emptyStateProps={{ variant: EmptyStateVariant.PageNotFound }}
        titleProps={{ title: t("common:404_page_does_not_exist") }}
        emptyStateBodyProps={{
          body: t("common:we_cannot_find_the_page_you_are_looking_for"),
        }}
      >
        <GoHomeBtn />
      </EmptyState>
    </PageSection>
  );
};
