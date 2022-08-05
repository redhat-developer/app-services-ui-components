import { useSelector } from "@xstate/react";
import { useCallback, useContext } from "react";
import type { ActorRefFrom } from "xstate";
import { CreateKafkaInstanceContext } from "./CreateKafkaInstanceProvider";
import type { StandardPlanMachine } from "./StandardPlanMachine";
import type { TrialPlanMachine } from "./TrialPlanMachine";

export type SelectorReturn = {
  standardPlanMachine: ActorRefFrom<typeof StandardPlanMachine> | undefined;
  trialPlanMachine: ActorRefFrom<typeof TrialPlanMachine> | undefined;
  isLoading: boolean;
  isSystemUnavailable: boolean;
  isStandardPlan: boolean;
  isTrialPlan: boolean;
  isSaving: boolean;
  isSaved: boolean;
};

export function useCreateKafkaInstance() {
  const { service } = useContext(CreateKafkaInstanceContext);
  return useSelector<typeof service, SelectorReturn>(
    service,
    useCallback((state) => {
      const standardPlanMachine = state.children["standardPlanService"] as
        | ActorRefFrom<typeof StandardPlanMachine>
        | undefined;
      const trialPlanMachine = state.children["trialPlanService"] as
        | ActorRefFrom<typeof TrialPlanMachine>
        | undefined;

      const isLoading = state.hasTag("loading");
      const isSystemUnavailable = state.hasTag("systemUnavailable");
      const isStandardPlan = state.hasTag("standardPlan");
      const isTrialPlan = state.hasTag("trialPlan");
      const isSaving = state.hasTag("saving");
      const isSaved = state.done === true;

      return {
        standardPlanMachine,
        trialPlanMachine,
        isLoading,
        isSystemUnavailable,
        isStandardPlan,
        isTrialPlan,
        isSaving,
        isSaved,
      };
    }, [])
  );
}
