import ArchivePage from "../pages/ArchivePage";
import HomePage from "../pages/HomePage";
import ScoresPage from "../pages/ScoresPage";
import RunningTotalPage from "../pages/RunningTotalPage";
import ConfigurePage from "../pages/ConfigurePage";

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
    name: "Configure",
    path: "/configure",
    element: <ConfigurePage />,
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
