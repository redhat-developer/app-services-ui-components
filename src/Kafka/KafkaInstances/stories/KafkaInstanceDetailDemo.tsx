import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Level,
  LevelItem,
  PageSection,
  Skeleton,
  Tab,
  TabContent,
  Tabs,
  TabsComponent,
  Title,
} from "@patternfly/react-core";
import type { ComponentType } from "react";
import { lazy, Suspense, useRef } from "react";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { Loading } from "../../../shared";
import { useKafkaInstanceDrawer } from "../KafkaInstanceDrawer";
import { useInstance } from "./support";

const LazyDashboard = lazy(
  () =>
    new Promise<{ default: ComponentType<any> }>((resolve) =>
      setTimeout(() => resolve(import("./SampleDashboard")), 1500)
    )
);

const LazyTopics = lazy(
  () =>
    new Promise<{ default: ComponentType<any> }>((resolve) =>
      setTimeout(() => resolve(import("./SampleTopics")), 1500)
    )
);

export const KafkaInstanceDetailDemo = () => {
  const { id, tab = "dashboard" } = useParams<{
    id: string;
    tab: string | undefined;
  }>();
  const history = useHistory();
  const match = useRouteMatch({ path: "/streams/:id" });
  const { instance } = useInstance(id);
  const { openDrawer } = useKafkaInstanceDrawer();
  const dashboardRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <PageSection variant={"light"} type={"breadcrumb"}>
        <Breadcrumb>
          <BreadcrumbItem
            render={() => <Link to={"/streams"}>Kafka instances</Link>}
          />
          <BreadcrumbItem isActive>
            {instance?.name || <Skeleton width={"150px"} />}
          </BreadcrumbItem>
        </Breadcrumb>
      </PageSection>
      <PageSection variant={"light"}>
        <Level>
          <LevelItem>
            <Title headingLevel={"h1"}>
              {instance?.name || <Skeleton width={"150px"} />}
            </Title>
          </LevelItem>
          <LevelItem>
            {instance && (
              <Button onClick={() => openDrawer(instance)}>Open drawer</Button>
            )}
          </LevelItem>
        </Level>
      </PageSection>
      <PageSection variant={"light"} type={"tabs"}>
        <Tabs
          activeKey={tab}
          onSelect={(_, key) => {
            history.push({
              pathname: `${match?.url || ""}/${key}`,
            });
          }}
          component={TabsComponent.nav}
          aria-label="Tabs in the toggled separate content example"
        >
          <Tab
            eventKey={"dashboard"}
            title="Dashboard"
            tabContentId="dashboard-tab"
          />
          <Tab eventKey={"topics"} title="Topics" tabContentId="topics-tab" />
        </Tabs>
      </PageSection>
      <PageSection isFilled={true}>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path={`${match?.path || ""}/dashboard`}>
              <TabContent
                eventKey={"dashboard"}
                id="dashboard-tab"
                ref={dashboardRef}
                aria-label="TODO"
              >
                <LazyDashboard />
              </TabContent>
            </Route>
            <Route path={`${match?.path || ""}/topics`}>
              <TabContent
                eventKey={"topics"}
                id="topics-tab"
                ref={topicsRef}
                aria-label="TODO"
              >
                <LazyTopics />
              </TabContent>
            </Route>
            <Redirect
              path={match?.path}
              exact={true}
              to={`${match?.path || ""}/dashboard`}
            />
          </Switch>
        </Suspense>
      </PageSection>
    </>
  );
};

export default KafkaInstanceDetailDemo;
