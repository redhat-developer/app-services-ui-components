import { useSelector } from "@xstate/react";
import { useCallback, useContext } from "react";
import { ActorRefFrom } from "xstate";
import {
  LOADING,
  SAVING,
  STANDARD_PLAN,
  STANDARD_PLAN_MACHINE_ID,
  SYSTEM_UNAVAILABLE,
  TRIAL_PLAN,
  TRIAL_PLAN_MACHINE_ID,
} from "./CreateKafkaInstanceMachine";
import { CreateKafkaInstanceContext } from "./CreateKafkaInstanceProvider";
import { StandardPlanMachine } from "./StandardPlanMachine";
import { TrialPlanMachine } from "./TrialPlanMachine";

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
      const standardPlanMachine = state.children[STANDARD_PLAN_MACHINE_ID] as
        | ActorRefFrom<typeof StandardPlanMachine>
        | undefined;
      const trialPlanMachine = state.children[TRIAL_PLAN_MACHINE_ID] as
        | ActorRefFrom<typeof TrialPlanMachine>
        | undefined;

      const isLoading = state.hasTag(LOADING);
      const isSystemUnavailable = state.hasTag(SYSTEM_UNAVAILABLE);
      const isStandardPlan = state.hasTag(STANDARD_PLAN);
      const isTrialPlan = state.hasTag(TRIAL_PLAN);
      const isSaving = state.hasTag(SAVING);
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
