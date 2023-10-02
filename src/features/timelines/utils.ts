import { Timeline } from "../../store/slices/timelines";
import { DEFAULT_ROW_INDEX } from "./constants";

const areLinesCrossing = (line1: Timeline, line2: Timeline) => {
  const { startIndex: start1, endIndex: end1 } = line1;
  const { startIndex: start2, endIndex: end2 } = line2;

  if (start1 <= end2 && end1 >= start2) {
    return true;
  } else if (start2 <= end1 && end2 >= start1) {
    return true;
  } else {
    return false;
  }
}

export const sortTimelines = (data: Array<Timeline>) => {
  let rowIndex = DEFAULT_ROW_INDEX;
  const unsorted = [...data];

  const final = unsorted.reduce<Record<number, Array<Timeline & { rowIndex: number }>>>((acc, value, index) => {

    if (index === 0) {
      acc[rowIndex] = [{ ...value, rowIndex: rowIndex }]
      return acc;
    }

    const matchingRow = Object.values(acc).find(timelines => {
      return timelines.every(timeline => !areLinesCrossing(timeline, value))
    })

    if (!matchingRow) {
      rowIndex++;

      acc[rowIndex] = [{ ...value, rowIndex: rowIndex }];

      return acc
    } else {
      acc[matchingRow[0].rowIndex].push({ ...value, rowIndex: matchingRow[0].rowIndex })
    }

    return acc;

  }, {})

  return final;

}
