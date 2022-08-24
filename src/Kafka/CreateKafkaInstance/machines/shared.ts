import type { CloudProvider, CloudProviderInfo, Region } from "../types";

export function onProviderChange(
  providers: CloudProviderInfo[],
  provider: CloudProvider
): { provider: CloudProvider; region: Region | undefined } {
  const selectedProvider = providers.find((p) => p.id === provider);
  const region =
    selectedProvider?.defaultRegion ||
    selectedProvider?.regions.filter((r) => !!r.isDisabled === false)[0]?.id;
  return { provider, region };
}
