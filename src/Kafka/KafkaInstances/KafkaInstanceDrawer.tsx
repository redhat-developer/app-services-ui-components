import type { FunctionComponent } from "react";
import { createContext, useContext, useState } from "react";
import type { KafkaInstance } from "../types";
import { InstanceDrawer } from "./components";

type KafkaInstanceDrawerContextProps = {
  drawerInstance: KafkaInstance | undefined;
  openDrawer: (instance: KafkaInstance) => void;
  closeDrawer: () => void;
};
const Context = createContext<KafkaInstanceDrawerContextProps | null>(null);

export const KafkaInstanceDrawer: FunctionComponent = ({ children }) => {
  const [drawerInstance, setDrawerInstance] = useState<KafkaInstance>();
  const closeDrawer = () => setDrawerInstance(undefined);
  return (
    <InstanceDrawer instance={drawerInstance} onClose={closeDrawer}>
      <Context.Provider
        value={{
          drawerInstance,
          openDrawer: setDrawerInstance,
          closeDrawer,
        }}
      >
        {children}
      </Context.Provider>
    </InstanceDrawer>
  );
};

export function useKafkaInstanceDrawer() {
  const context = useContext(Context);
  if (context === null) {
    throw new Error(
      "useKafkaDrawer must be called inside a KafkaInstances component"
    );
  }
  return context;
}
