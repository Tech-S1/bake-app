import ArchivePage from "../pages/ArchivePage";
import HomePage from "../pages/HomePage";
import ScoresPage from "../pages/ScoresPage";
import RunningTotalPage from "../pages/RunningTotalPage";
import ConfigurePage from "../pages/ConfigurePage";
import AuthWrapper from "../containers/AuthWrapper";
import PhotoPage from "../pages/PhotoPage";

const endpoints = [
  {
    navbar: true,
    name: "Home",
    path: "/",
    element: <HomePage />,
  },
  {
    navbar: true,
    name: "Scores",
    path: "/scores",
    element: (
      <AuthWrapper>
        <ScoresPage />
      </AuthWrapper>
    ),
  },
  {
    navbar: true,
    name: "Configure",
    path: "/configure",
    element: (
      <AuthWrapper>
        <ConfigurePage />
      </AuthWrapper>
    ),
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
  {
    navbar: true,
    name: "Photos",
    path: "/photos",
    element: (
      <AuthWrapper>
        <PhotoPage />
      </AuthWrapper>
    ),
  },
];

export default endpoints;
