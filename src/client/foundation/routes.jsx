import React, { lazy, Suspense } from "react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

import { CommonLayout } from "./layouts/CommonLayout";
// const CommonLayout = lazy(() => import("./layouts/CommonLayout").then(({ CommonLayout }) => ({ default: CommonLayout })));
import { RaceLayout } from "./layouts/RaceLayout";
// const RaceLayout = lazy(() => import("./layouts/RaceLayout").then(({ RaceLayout }) => ({ default: RaceLayout })));

// import { Top } from "./pages/Top";
const Top = lazy(() => import("./pages/Top").then(({ Top }) => ({ default: Top })));
// import { Odds } from "./pages/races/Odds";
const Odds = lazy(() => import("./pages/races/Odds").then(({ Odds }) => ({ default: Odds })));
// import { RaceCard } from "./pages/races/RaceCard";
const RaceCard = lazy(() => import("./pages/races/RaceCard").then(({ RaceCard }) => ({ default: RaceCard })));
// import { RaceResult } from "./pages/races/RaceResult";
const RaceResult = lazy(() => import("./pages/races/RaceResult").then(({ RaceResult }) => ({ default: RaceResult })));

/** @type {React.VFC} */
export const Routes = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
    <RouterRoutes>
      <Route element={<CommonLayout />} path="/">
        <Route index element={<Top />} />
        <Route element={<Top />} path=":date" />
        <Route element={<RaceLayout />} path="races/:raceId">
          <Route element={<RaceCard />} path="race-card" />
          <Route element={<Odds />} path="odds" />
          <Route element={<RaceResult />} path="result" />
        </Route>
      </Route>
    </RouterRoutes>
    </Suspense>
  );
};
