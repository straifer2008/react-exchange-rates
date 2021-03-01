import {lazy} from 'react';

const LazyConverterPage = lazy(() => import("../pages/converter"));
const LazyRatesPage = lazy(() => import("../pages/rates"));

export const lazyRoutes = [
  {
    title: 'Converter',
    link: '/converter',
    component: LazyConverterPage
  },
  {
    title: 'Rates',
    link: '/rates',
    component: LazyRatesPage
  }
]
