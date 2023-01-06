import { A } from 'solid-start';
import styles from './Appbar.module.css';

export default function Appbar() {
  return (
    <header>
      <nav class={styles['appbar']}>
        <A href="/">
          <h1>Stands</h1>
        </A>
      </nav>
    </header>
  );
}
