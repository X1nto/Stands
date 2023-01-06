import { For } from 'solid-js';
import {
  createRouteData,
  refetchRouteData,
  RouteDataArgs,
  useRouteData,
  useSearchParams,
} from 'solid-start';
import Dropdown from '~/components/Dropdown';
import { Stand } from '~/db/stands';
import styles from './index.module.css';

const dropdowns = [
  {
    label: 'Power',
    value: 'power',
  },
  {
    label: 'Speed',
    value: 'speed',
  },
  {
    label: 'Range',
    value: 'range',
  },
  {
    label: 'Stamina',
    value: 'stamina',
  },
  {
    label: 'Precision',
    value: 'precision',
  },
  {
    label: 'Development',
    value: 'development',
  },
] as const;

const dropdownEntries = [
  {
    label: '<Any>',
    value: '',
  },
  {
    label: '∞',
    value: 'INF',
  },
  {
    label: 'A',
    value: 'A',
  },
  {
    label: 'B',
    value: 'B',
  },
  {
    label: 'C',
    value: 'C',
  },
  {
    label: 'D',
    value: 'D',
  },
  {
    label: 'E',
    value: 'E',
  },
  {
    label: 'N/A',
    value: 'NONE',
  },
  {
    label: '∅',
    value: 'NULL',
  },
] as const;

export function routeData({ location }: RouteDataArgs) {
  return createRouteData(async () => {
    let url = '/api/stands?';
    for (const key in location.query) {
      url += `${key}=${location.query[key]}&`;
    }
    const response = await fetch(url);
    return (await response.json()) as Stand[];
  });
}

export default function Home() {
  const data = useRouteData<typeof routeData>();
  const [params, setParams] = useSearchParams();
  return (
    <main class={styles['page']}>
      <div class={styles['input-header']}>
        <div class={styles['input-search']}>
          <input
            class={styles['input-search-box']}
            type="text"
            placeholder="Search"
            onInput={(e) => {
              setParams({ name: (e.target as HTMLInputElement).value });
            }}
          />
          <div
            class={styles['input-search-button']}
            onClick={() => refetchRouteData()}
          >
            <img src="search.svg" />
          </div>
        </div>

        <div class={styles['stand-stat-dropdown-list']}>
          <For each={dropdowns}>
            {(stat) => (
              <Dropdown
                label={stat.label}
                items={dropdownEntries}
                default={params[stat.value]}
                onChange={(value) => {
                  setParams({ [stat.value]: value });
                }}
              />
            )}
          </For>
        </div>
      </div>
      <div class={styles['stand-list']}>
        <For
          each={data()}
          fallback={
            <div class={styles['stand-list-empty']}>
              <h1>Could not find stands with the selected filters.</h1>
            </div>
          }
        >
          {(stand) => (
            <div class={styles['stand-card']}>
              <h2>{stand.name}</h2>
              <div class={styles['stand-card-stats']}>
                <For each={dropdowns}>
                  {(stat) => {
                    const statValue = dropdownEntries.find(
                      (e) => e.value === stand[stat.value]
                    )?.label;
                    return (
                      <div class={styles['stand-card-stat']}>
                        <b>{stat.label}: </b>
                        <p>{statValue}</p>
                      </div>
                    );
                  }}
                </For>
              </div>
            </div>
          )}
        </For>
      </div>
    </main>
  );
}