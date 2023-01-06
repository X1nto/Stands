import { APIEvent, json } from 'solid-start';
import {
  findStands,
  isStatValueValid,
  StandFindPredicate,
  standStats,
  StandStatValue,
} from '~/db/stands';
import { parseQuery } from '~/util/query';

export async function GET(event: APIEvent) {
  const query = parseQuery(event.request.url);

  const statOrResponse = (stat: string): StandStatValue | Response | null => {
    const queryStat = query.get(stat)?.toUpperCase();

    if (queryStat == null) {
      return null;
    }

    if (!isStatValueValid(queryStat)) {
      return new Response(`Invalid value for stat '${stat}': '${queryStat}'.`, {
        status: 400,
      });
    }

    return queryStat;
  };

  let predicate: StandFindPredicate = { name: query.get('name') };

  for (const stat of standStats) {
    const sor = statOrResponse(stat);
    if (sor instanceof Response) return sor;

    predicate = { ...predicate, [stat]: sor };
  }

  console.log(predicate);

  const foundStands = await findStands(predicate);

  return json(foundStands);
}
