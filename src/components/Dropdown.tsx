import { createSignal, For, onCleanup, Show } from 'solid-js';
import styles from './Dropdown.module.css';

export interface DropdownProps {
  readonly label: string;
  readonly items: readonly {
    label: string;
    value: string;
  }[];
  readonly default?: string;
  readonly onChange?: (value: string) => void;
}

export default function Dropdown(props: DropdownProps) {
  const [currentItem, setCurrentItem] = createSignal(
    props.default !== undefined
      ? props.items.find((e) => e.value === props.default)
      : props.items[0]
  );
  const [show, setShow] = createSignal(false);
  return (
    <div class={styles.container}>
      <div
        class={styles.box}
        data-active={show()}
        onClick={() => setShow((prev) => !prev)}
        use:clickOutside={() => setShow(false)}
      >
        <div>
          <b>{props.label}: </b>
          <p>{currentItem()?.label}</p>
        </div>
        <img src="dropdown-arrow.svg" />
      </div>
      <Show when={show()}>
        <ul class={styles.popup}>
          <For each={props.items}>
            {(item) => (
              <li
                value={item.value}
                onClick={() => {
                  setCurrentItem(item);
                  props.onChange?.(item.value);
                }}
              >
                {item.label}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: () => void;
    }
  }
}

function clickOutside(element: Element, accessor: () => any) {
  const onClick = (e: any) => !element.contains(e.target) && accessor()?.();
  document.body.addEventListener('click', onClick);

  onCleanup(() => document.body.removeEventListener('click', onClick));
}
