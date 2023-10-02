import { createAction } from "@reduxjs/toolkit";

export type GenerateSnapshots = {
  video: HTMLVideoElement,
  skip?: number,
  limit?: number,
}

export const generateSnapshots = createAction<GenerateSnapshots, 'generate-snapshots'>('generate-snapshots')