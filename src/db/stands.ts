// @ts-ignore
import standsDb from './stands.json';

const stands = standsDb as Stand[];

export const standStatValues = [
  'NONE',
  'NULL',
  'E',
  'D',
  'C',
  'B',
  'A',
  'S',
  'INF',
] as const;
export type StandStatValue = typeof standStatValues[number];

export const standStats = [
  'power',
  'speed',
  'range',
  'stamina',
  'precision',
  'development',
] as const;
export type StandStat = typeof standStats[number];

export function isStatValueValid(stat: string): stat is StandStatValue {
  return standStatValues.includes(stat as StandStatValue);
}

export interface Stand {
  name: string;
  power: StandStatValue;
  speed: StandStatValue;
  range: StandStatValue;
  stamina: StandStatValue;
  precision: StandStatValue;
  development: StandStatValue;
}

export interface StandFindPredicate {
  name?: string | null;
  power?: StandStatValue | null;
  speed?: StandStatValue | null;
  range?: StandStatValue | null;
  stamina?: StandStatValue | null;
  precision?: StandStatValue | null;
  development?: StandStatValue | null;
}

export async function findStands({
  name,
  power,
  speed,
  range,
  stamina,
  precision,
  development,
}: StandFindPredicate) {
  const stands = await getStands();
  return stands.filter((stand) => {
    return (
      (!name || stand.name.toLowerCase().includes(name.toLowerCase())) &&
      (!power || stand.power === power) &&
      (!speed || stand.speed === speed) &&
      (!range || stand.range === range) &&
      (!stamina || stand.stamina === stamina) &&
      (!precision || stand.precision === precision) &&
      (!development || stand.development === development)
    );
  });
}

export async function getStands() {
  return stands;
}
