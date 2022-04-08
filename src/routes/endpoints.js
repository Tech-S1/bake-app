import BakersPage from "../pages/BakersPage";
import ArchivePage from "../pages/ArchivePage";
import HomePage from "../pages/HomePage";
import ScoresPage from "../pages/ScoresPage";
import RunningTotalPage from "../pages/RunningTotalPage";

const endpoints = [
  {
    navbar: false,
    name: "Home",
    path: "/",
    element: <HomePage />,
  },
  {
    navbar: true,
    name: "Scores",
    path: "/scores",
    element: <ScoresPage />,
  },
  {
    navbar: true,
    name: "Bakers",
    path: "/bakers",
    element: <BakersPage />,
  },
  {
    navbar: true,
    name: "Archive",
    path: "/archive",
    element: <ArchivePage />,
  },
  {
    navbar: true,
    name: "Totals",
    path: "/totals",
    element: <RunningTotalPage />,
  },
];

export default endpoints;
