import {
  Bullseye,
  Button,
  ButtonVariant,
  Flex,
  Grid,
  GridItem,
  List,
  ListItem,
  Modal,
  Radio,
  Select,
  SelectOption,
  Spinner,
  Stack,
  StackItem,
  Text,
  TextContent,
  Title,
  TitleSizes,
} from "@patternfly/react-core";
import { useTranslation } from "react-i18next";
import { RhodsMlTechnology } from "../images";
import {
  MarketingPageHero,
  MarketingPageSection,
  MarketingPageVideoCard,
} from "./components";
import { ExternalLinkAltIcon } from "@patternfly/react-icons";
import { useState, useCallback } from "react";
import type { VoidFunctionComponent } from "react";
import { ExternalLink } from "../shared";

export type ClusterObject = {
  /**
   * Do not list all properties
   * Only define the ones that are used and required bu the components
   * THat will prevent TS from blocking the object and enforce the right properties
   */
  [key: string]: any;
  id: string;
  cluster_id: string;
  display_name: string;
  metrics?: { nodes?: { compute: number } }[];
};

export type ClustersResponse = {
  clusters: ClusterObject[];
  installableClusters: ClusterObject[];
};

export enum RHodsClusterAddonMode {
  Detecting,
  Install,
  Upgrade,
  Create,
}

export type DataSciencePageProps = {
  loadClusters: () => Promise<ClustersResponse>;
  trackClick: (e: string, properties?: unknown) => void;
};

type HandleSelectCluster = (cluster: ClusterObject) => void;
type ClusterSelectProps = {
  selectedCluster?: ClusterObject;
  clusters: ClusterObject[];
  handleSelectCluster: HandleSelectCluster;
  isDisabled?: boolean;
};
enum UpgradeStrategy {
  Upgrade,
  Create,
}

const CREATE_CLUSTER_HREF = `${document.baseURI}openshift/create `;
const UPGRADE_CLUSTER_HREF = `${document.baseURI}openshift/details/s/{subscriptionID}#machinePools`;
const INSTALL_ADDON_HREF = `${document.baseURI}openshift/details/s/{subscriptionID}#addOns`;

const ClusterSelect: VoidFunctionComponent<ClusterSelectProps> = ({
  clusters,
  handleSelectCluster,
  selectedCluster,
  isDisabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Select
      isDisabled={isDisabled}
      data-testid="select-RHODS-cluster"
      onSelect={() => setIsOpen(false)}
      selections={
        selectedCluster
          ? {
              toString: () => selectedCluster.display_name,
              compareTo: (selectOption) =>
                selectOption === selectedCluster.cluster_id,
            }
          : undefined
      }
      isOpen={isOpen}
      menuAppendTo="parent"
      variant="single"
      onToggle={(isOpen) => setIsOpen(isOpen)}
    >
      {clusters.map((cluster) => (
        <SelectOption
          onClick={() => {
            setIsOpen(false);
            handleSelectCluster(cluster);
          }}
          key={cluster.cluster_id}
          value={{
            toString: () => cluster.display_name,
            compareTo: (selectOption) => selectOption === cluster.cluster_id,
          }}
        />
      ))}
    </Select>
  );
};

const InstallClusterModalContent: VoidFunctionComponent<ClusterSelectProps> = (
  props
) => {
  const { t } = useTranslation("datascienceoverview");
  return (
    <Stack hasGutter>
      <StackItem>
        <TextContent className="pf-u-mb-sm">
          <Text component="p">{t("selectClusterLabel")}</Text>
        </TextContent>
        <ClusterSelect {...props} />
      </StackItem>
      <StackItem>
        <TextContent>
          <Text>{t("installClusterContent")}</Text>
        </TextContent>
      </StackItem>
    </Stack>
  );
};

type UpgradeClusterModalContentProps = ClusterSelectProps & {
  upgradeStrategy: UpgradeStrategy;
  handleStrategyChange: (strategy: UpgradeStrategy) => void;
};

const UpgradeClusterModalContent: VoidFunctionComponent<
  UpgradeClusterModalContentProps
> = ({ handleStrategyChange, upgradeStrategy, ...props }) => {
  const { t } = useTranslation("datascienceoverview");
  const upgradeBody = (
    <TextContent>
      <Text component="small">{t("upgradeClusterSelectDescription")}</Text>
      <ClusterSelect
        {...props}
        isDisabled={upgradeStrategy !== UpgradeStrategy.Upgrade}
      />
      <TextContent>
        <Text>{t("upgradeClusterPrerequisites")}</Text>
        <List>
          <ListItem>{t("upgradeClusterNodes")}</ListItem>
          <ListItem>{t("upgradeClusterCPUs")}</ListItem>
          <ListItem>{t("upgradeClusterMemory")}</ListItem>
        </List>
      </TextContent>
    </TextContent>
  );
  return (
    <Stack hasGutter>
      <StackItem>
        <Radio
          id="upgrade-cluster"
          name="upgrade-cluster"
          data-testid="radio-RHODS-action-upgrade"
          label={t("upgradeClusterSelectLabel")}
          onChange={() => handleStrategyChange(UpgradeStrategy.Upgrade)}
          isChecked={upgradeStrategy === UpgradeStrategy.Upgrade}
          body={upgradeBody}
        />
      </StackItem>
      <StackItem>
        <Radio
          id="create-cluster"
          name="create-cluster"
          data-testid="radio-RHODS-action-create"
          label={t("createClusterLabel")}
          onChange={() => handleStrategyChange(UpgradeStrategy.Create)}
          isChecked={upgradeStrategy === UpgradeStrategy.Create}
        />
      </StackItem>
    </Stack>
  );
};

const CreateClusterContent = () => {
  const { t } = useTranslation("datascienceoverview");
  return (
    <TextContent>
      <Text>{t("createClusterContent")}</Text>
    </TextContent>
  );
};

type ClusterModalContentProps = {
  selectedCluster?: ClusterObject;
  handleSelectCluster: HandleSelectCluster;
  mode: RHodsClusterAddonMode;
  clusters: ClusterObject[];
  upgradeStrategy: UpgradeStrategy;
  handleStrategyChange: (strategy: UpgradeStrategy) => void;
};

const ClusterModalContent: VoidFunctionComponent<ClusterModalContentProps> = ({
  mode,
  clusters,
  handleSelectCluster,
  selectedCluster,
  upgradeStrategy,
  handleStrategyChange,
}) => {
  if (mode === RHodsClusterAddonMode.Detecting) {
    return (
      <Bullseye>
        <Spinner size="xl" />
      </Bullseye>
    );
  }

  if (mode === RHodsClusterAddonMode.Install) {
    return (
      <InstallClusterModalContent
        selectedCluster={selectedCluster}
        handleSelectCluster={handleSelectCluster}
        clusters={clusters}
      />
    );
  }

  if (mode === RHodsClusterAddonMode.Upgrade) {
    return (
      <UpgradeClusterModalContent
        selectedCluster={selectedCluster}
        handleSelectCluster={handleSelectCluster}
        clusters={clusters}
        upgradeStrategy={upgradeStrategy}
        handleStrategyChange={handleStrategyChange}
      />
    );
  }

  if (mode === RHodsClusterAddonMode.Create) {
    return <CreateClusterContent />;
  }

  return null;
};

export const DataSciencePage: VoidFunctionComponent<DataSciencePageProps> = ({
  loadClusters,
  trackClick,
}) => {
  const { t } = useTranslation("datascienceoverview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<
    ClusterObject | undefined
  >();
  const [upgradeStrategy, setUpgradeStrategy] = useState<UpgradeStrategy>(
    UpgradeStrategy.Upgrade
  );
  const [{ mode, clusters }, setClustersState] = useState<{
    clusters: ClusterObject[];
    mode: RHodsClusterAddonMode;
  }>({ clusters: [], mode: RHodsClusterAddonMode.Detecting });

  const modalActions = {
    [RHodsClusterAddonMode.Detecting]: [],
    [RHodsClusterAddonMode.Install]: [
      <Button
        variant="primary"
        key="install"
        component="a"
        data-testid="install-RHODS-button"
        onClick={() => {
          trackClick("rhods-modal-install-click");
        }}
        href={INSTALL_ADDON_HREF.replace(
          "{subscriptionID}",
          selectedCluster?.id || ""
        )}
      >
        {t("installClusterAction")}
      </Button>,
      <Button
        onClick={() => {
          trackClick("rhods-modal-install-cancel");
          return setIsModalOpen(false);
        }}
        key="cancel"
        variant="secondary"
        data-testid="install-RHODS-cancel"
      >
        {t("cancelClusterAction")}
      </Button>,
    ],
    [RHodsClusterAddonMode.Upgrade]: [
      <Button
        variant="primary"
        key="install"
        component="a"
        data-testid="upgrade-RHODS-button"
        onClick={() => {
          trackClick("rhods-modal-upgrade-click");
        }}
        href={
          upgradeStrategy === UpgradeStrategy.Create
            ? CREATE_CLUSTER_HREF
            : UPGRADE_CLUSTER_HREF.replace(
                "{subscriptionID}",
                selectedCluster?.id || ""
              )
        }
      >
        {upgradeStrategy === UpgradeStrategy.Create
          ? t("createClusterAction")
          : t("upgradeAction")}
      </Button>,
      <Button
        onClick={() => {
          trackClick("rhods-modal-upgrade-cancel");
          return setIsModalOpen(false);
        }}
        key="cancel"
        variant="secondary"
        data-testid="install-RHODS-cancel"
      >
        {t("cancelClusterAction")}
      </Button>,
    ],
    [RHodsClusterAddonMode.Create]: [
      <Button
        component="a"
        onClick={() => {
          trackClick("rhods-modal-create-cluster-click");
        }}
        href={CREATE_CLUSTER_HREF}
        variant="primary"
        key="install"
      >
        {t("createClusterAction")}
      </Button>,
      <Button
        onClick={() => {
          trackClick("rhods-modal-create-cluster-cancel");
          return setIsModalOpen(false);
        }}
        key="cancel"
        variant="secondary"
        data-testid="install-RHODS-cancel"
      >
        {t("cancelClusterAction")}
      </Button>,
    ],
  };

  const clusterModalDescriptions = {
    [RHodsClusterAddonMode.Install]: t("installClusterDescription"),
    [RHodsClusterAddonMode.Upgrade]: t("upgradeClusterDescription"),
    [RHodsClusterAddonMode.Create]: t("createClusterDescription"),
  };

  const clusterModalTitles = {
    [RHodsClusterAddonMode.Detecting]: t("detectingClustersTitle"),
    [RHodsClusterAddonMode.Install]: t("installClusterTitle"),
    [RHodsClusterAddonMode.Upgrade]: t("installClusterTitle"),
    [RHodsClusterAddonMode.Create]: t("installClusterTitle"),
  };

  const getData = useCallback(async () => {
    const { clusters, installableClusters } = await loadClusters();
    if (installableClusters.length > 0) {
      setClustersState({
        mode: RHodsClusterAddonMode.Install,
        clusters: installableClusters,
      });
    } else {
      setClustersState({
        mode:
          clusters.length > 0
            ? RHodsClusterAddonMode.Upgrade
            : RHodsClusterAddonMode.Create,
        clusters,
      });
    }
  }, [loadClusters]);

  const handleInstallModalOpen = () => {
    trackClick("rhods-hero-install-click");
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getData();
    setIsModalOpen(true);
  };

  const handleSelectCluster = (cluster: ClusterObject) => {
    setSelectedCluster(cluster);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant="medium"
        data-testid="data-science-modal"
        actions={modalActions[mode]}
        title={clusterModalTitles[mode]}
        description={
          mode !== RHodsClusterAddonMode.Detecting ? (
            <Title headingLevel="h2" size="md">
              {clusterModalDescriptions[mode]}
            </Title>
          ) : undefined
        }
      >
        <ClusterModalContent
          upgradeStrategy={upgradeStrategy}
          handleSelectCluster={handleSelectCluster}
          selectedCluster={selectedCluster}
          mode={mode}
          clusters={clusters}
          handleStrategyChange={setUpgradeStrategy}
        />
      </Modal>
      <MarketingPageHero
        title={t("heroTitle")}
        tagLine={t("heroTagline")}
        description={t("heroDescription")}
        cta={
          <Flex>
            <Button
              data-testid="hero-buttonInstall"
              ouiaId="button-rhods-install"
              onClick={handleInstallModalOpen}
            >
              {t("installButton")}
            </Button>
            <ExternalLink
              testId="hero-buttonTry"
              ouiaId="button-rhods-try"
              href="https://developers.redhat.com/products/red-hat-openshift-data-science/getting-started?extIdCarryOver=true&sc_cid=701f2000001Css5AAC"
            >
              {t("heroTryItButton")}
            </ExternalLink>
          </Flex>
        }
        heroImage={RhodsMlTechnology}
        heroImageSize={478}
        heroImageCanRepeat={false}
        heroImagePositionY={-99}
      />
      <MarketingPageSection>
        <Grid hasGutter>
          <GridItem md={5}>
            <Stack hasGutter>
              <StackItem>
                <TextContent>
                  <Title
                    size={TitleSizes.xl}
                    headingLevel="h3"
                    className="pf-u-mb-lg"
                  >
                    {t("videoSectionTitle")}
                  </Title>
                  <Text className="pf-u-mr-md">
                    {t("videoSectionInThisVideo")}
                  </Text>
                </TextContent>
              </StackItem>
              <StackItem>
                <Button
                  data-testid="CTA-videoRHODSDemo"
                  variant={ButtonVariant.secondary}
                  component="a"
                  href="https://www.openshift.com/DataScienceVideoDemo"
                  target="_blank"
                >
                  {t("heroViewDemo")}{" "}
                  <ExternalLinkAltIcon className="pf-u-ml-sm" />
                </Button>
              </StackItem>
            </Stack>
          </GridItem>
          <GridItem md={7}>
            <MarketingPageVideoCard
              src={"https://www.youtube.com/embed/joK89xYeuUY"}
              title={t("videoSectionTitle")}
            />
          </GridItem>
        </Grid>
      </MarketingPageSection>
    </>
  );
};
