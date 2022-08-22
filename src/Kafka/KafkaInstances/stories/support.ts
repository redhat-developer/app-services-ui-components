import { addHours } from "date-fns";
import { useEffect, useState } from "react";
import type { KafkaInstance } from "../../types";

const now = new Date().toISOString();
const future = addHours(new Date(), 19).toISOString();
const INSTANCES: KafkaInstance[] = [
  {
    id: "1",
    name: "foo",
    createdAt: now,
    updatedAt: now,
    expiryDate: undefined,
    owner: "owner",
    provider: "aws",
    region: "region",
    status: "provisioning",
    plan: "standard",
    size: "1",
    ingress: undefined,
    egress: undefined,
    storage: undefined,
    maxPartitions: undefined,
    connections: undefined,
    connectionRate: undefined,
    messageSize: undefined,
    billing: undefined,
  },
  {
    id: "2",
    name: "bar",
    createdAt: now,
    updatedAt: now,
    expiryDate: future,
    owner: "owner",
    provider: "aws",
    region: "region",
    status: "deleting",
    plan: "developer",
    size: "1",
    ingress: undefined,
    egress: undefined,
    storage: undefined,
    maxPartitions: undefined,
    connections: undefined,
    connectionRate: undefined,
    messageSize: undefined,
    billing: undefined,
  },
  {
    id: "3",
    name: "baz",
    createdAt: now,
    updatedAt: now,
    expiryDate: future,
    owner: "owner",
    provider: "azure",
    region: "region",
    status: "ready",
    plan: "standard",
    size: "2",
    ingress: undefined,
    egress: undefined,
    storage: undefined,
    maxPartitions: undefined,
    connections: undefined,
    connectionRate: undefined,
    messageSize: undefined,
    billing: undefined,
  },
];
export const useInstances = () => {
  const [instances, setInstances] = useState<KafkaInstance[]>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInstances(INSTANCES);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return {
    instances,
    loading: instances === undefined,
  };
};
export const useInstance = (id: string) => {
  const { instances, loading } = useInstances();
  const instance = instances?.find((i) => i.id === id);

  return {
    instance,
    loading: loading || instance === undefined,
  };
};
