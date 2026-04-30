export type SmokeMarker = {
  label: string;
  ready: true;
};

export function createSmokeMarker(label: string): SmokeMarker {
  return {
    label,
    ready: true
  };
}
