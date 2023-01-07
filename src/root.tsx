// @refresh reload
import {Suspense} from 'solid-js';
import {Body, ErrorBoundary, FileRoutes, Head, Html, Link, Meta, Routes, Scripts, Title} from 'solid-start';
import Appbar from './components/Appbar';
import './root.css';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Stands</Title>
        <Meta charset="utf-8"/>
        <Meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Link
          href="https://fonts.googleapis.com/css?family=Inter"
          rel="stylesheet"
        ></Link>
      </Head>
      <Body>
        <Appbar/>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes/>
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts/>
      </Body>
    </Html>
  );
}
