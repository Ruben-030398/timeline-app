import { createAction } from "@reduxjs/toolkit";
import { GenerateTimelinePayload } from "../slices/timelines";

export const generateTimeline = createAction<GenerateTimelinePayload, 'generate-timeline'>('generate-timeline')