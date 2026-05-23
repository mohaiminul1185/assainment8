import { useEffect, useState } from "react";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

import heroImg from "./assets/hero.png";
import logo from "./assets/logo.png";
import appsBanner from "./assets/Apps.png";
import installationBanner from "./assets/Installation.png";
import error404 from "./assets/error-404.png";
import notFoundImg from "./assets/Error-App Not Found.png";

import app1 from "./assets/demo-app (1).webp";
import app2 from "./assets/demo-app (2).webp";
import app3 from "./assets/demo-app (3).webp";
import app4 from "./assets/demo-app (4).webp";
import app5 from "./assets/demo-app (5).webp";
import app6 from "./assets/demo-app (6).webp";

const appsData = [
  {
    id: 1,
    title: "Forest: Focus For Productivity",
    image: app1,
    downloads: "9M",
    rating: 5,
    reviews: "54K",
    size: "258 MB",
    description:
      "Forest helps you stay focused and productive throughout your work session.",
  },
  {
    id: 2,
    title: "SmPlan: ToDo List With Reminder",
    image: app2,
    downloads: "8M",
    rating: 4.9,
    reviews: "50K",
    size: "291 MB",
    description:
      "Manage tasks and reminders easily with a beautiful productivity app.",
  },
  {
    id: 3,
    title: "FLIP - Focus Timer For Study",
    image: app3,
    downloads: "7M",
    rating: 4.8,
    reviews: "40K",
    size: "220 MB",
    description:
      "FLIP keeps you motivated during study and work sessions.",
  },
  {
    id: 4,
    title: "Pomocat - Cute Pomodoro Timer",
    image: app4,
    downloads: "6M",
    rating: 4.7,
    reviews: "39K",
    size: "200 MB",
    description:
      "Cute pomodoro timer with relaxing UI and productivity features.",
  },
  {
    id: 5,
    title: "Time Planner: Schedule & Tasks",
    image: app5,
    downloads: "5M",
    rating: 4.6,
    reviews: "32K",
    size: "180 MB",
    description:
      "Plan your day and organize tasks effectively.",
  },
  {
    id: 6,
    title: "Morning Habits - Daily Routine",
    image: app6,
    downloads: "4M",
    rating: 4.5,
    reviews: "25K",
    size: "170 MB",
    description:
      "Build better daily routines and habits.",
  },
];

function App() {
  const [page, setPage] = useState("home");
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  const [installedApps, setInstalledApps] = useState(() => {
    const stored = localStorage.getItem("installedApps");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "installedApps",
      JSON.stringify(installedApps)
    );
  }, [installedApps]);

  const filteredApps = appsData.filter((app) =>
    app.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleInstall = (app) => {
    const exists = installedApps.find(
      (item) => item.id === app.id
    );

    if (!exists) {
      setInstalledApps([...installedApps, app]);
      toast.success("App Installed Successfully");
    }
  };

  const handleUninstall = (id) => {
    const updated = installedApps.filter(
      (app) => app.id !== id
    );

    setInstalledApps(updated);
    toast.error("App Uninstalled");
  };

  return (
    <div className="app">
      <Toaster />

      {/* NAVBAR */}

      <header className="navbar">
        <img
          src={logo}
          alt=""
          className="logo"
          onClick={() => setPage("home")}
        />

        <nav className="nav-links">
          <button onClick={() => setPage("home")}>
            Home
          </button>

          <button onClick={() => setPage("apps")}>
            Apps
          </button>

          <button
            onClick={() => setPage("installation")}
          >
            Installation
          </button>
        </nav>

        <a
          href="https://github.com/"
          target="_blank"
          className="contribute-btn"
        >
          Contribute
        </a>
      </header>

      {/* HOME */}

      {page === "home" && (
        <>
          <section className="hero">
            <h1>
              We Build <br />
              <span>Productive</span> Apps
            </h1>

            <p>
              Explore amazing productivity apps for
              students and professionals.
            </p>

            <div className="hero-buttons">
              <button>Google Play</button>
              <button>App Store</button>
            </div>

            <img
              src={heroImg}
              alt=""
              className="hero-image"
            />
          </section>

          <section className="stats">
            <div>
              <h2>29.6M</h2>
              <p>Total Downloads</p>
            </div>

            <div>
              <h2>906K</h2>
              <p>Active Users</p>
            </div>

            <div>
              <h2>132+</h2>
              <p>Reviews</p>
            </div>
          </section>

          <section className="trending">
            <h2>Trending Apps</h2>

            <div className="apps-grid">
              {appsData.map((app) => (
                <div
                  key={app.id}
                  className="app-card"
                  onClick={() => {
                    setSelectedApp(app);
                    setPage("details");
                  }}
                >
                  <img src={app.image} alt="" />

                  <h4>{app.title}</h4>

                  <div className="card-bottom">
                    <span>⬇ {app.downloads}</span>
                    <span>⭐ {app.rating}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="show-btn"
              onClick={() => setPage("apps")}
            >
              Show All
            </button>
          </section>
        </>
      )}

      {/* APPS PAGE */}

      {page === "apps" && (
        <section className="apps-page">
          <img
            src={appsBanner}
            alt=""
            className="page-banner"
          />

          <div className="apps-header">
            <h2>Our All Applications</h2>

            <p>
              Explore All Apps on the Market
              developed by us
            </p>
          </div>

          <div className="search-row">
            <h4>
              ({filteredApps.length}) Apps Found
            </h4>

            <input
              type="text"
              placeholder="Search Apps"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          {filteredApps.length === 0 ? (
            <div className="not-found">
              <img src={notFoundImg} alt="" />

              <h2>NO APP FOUND</h2>
            </div>
          ) : (
            <div className="apps-grid">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="app-card"
                  onClick={() => {
                    setSelectedApp(app);
                    setPage("details");
                  }}
                >
                  <img src={app.image} alt="" />

                  <h4>{app.title}</h4>

                  <div className="card-bottom">
                    <span>⬇ {app.downloads}</span>
                    <span>⭐ {app.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* DETAILS */}

      {page === "details" && selectedApp && (
        <section className="details-page">
          <div className="details-top">
            <img
              src={selectedApp.image}
              alt=""
              className="details-img"
            />

            <div>
              <h1>{selectedApp.title}</h1>

              <p>{selectedApp.description}</p>

              <div className="details-stats">
                <div>
                  <h3>{selectedApp.downloads}</h3>
                  <span>Downloads</span>
                </div>

                <div>
                  <h3>{selectedApp.rating}</h3>
                  <span>Ratings</span>
                </div>

                <div>
                  <h3>{selectedApp.reviews}</h3>
                  <span>Reviews</span>
                </div>
              </div>

              <button
                className="install-btn"
                disabled={installedApps.find(
                  (item) =>
                    item.id === selectedApp.id
                )}
                onClick={() =>
                  handleInstall(selectedApp)
                }
              >
                {installedApps.find(
                  (item) =>
                    item.id === selectedApp.id
                )
                  ? "Installed"
                  : `Install Now (${selectedApp.size})`}
              </button>
            </div>
          </div>

          <div className="description">
            <h2>Description</h2>

            <p>{selectedApp.description}</p>
          </div>
        </section>
      )}

      {/* INSTALLATION */}

      {page === "installation" && (
        <section className="installation-page">
          <img
            src={installationBanner}
            alt=""
            className="page-banner"
          />

          <h1>Your Installed Apps</h1>

          {installedApps.length === 0 ? (
            <div className="not-found">
              <img src={notFoundImg} alt="" />
              <h2>No Installed Apps</h2>
            </div>
          ) : (
            <div className="install-list">
              {installedApps.map((app) => (
                <div
                  key={app.id}
                  className="install-card"
                >
                  <div className="install-left">
                    <img src={app.image} alt="" />

                    <div>
                      <h3>{app.title}</h3>

                      <p>
                        ⬇ {app.downloads} ⭐{" "}
                        {app.rating}
                      </p>
                    </div>
                  </div>

                  <button
                    className="uninstall-btn"
                    onClick={() =>
                      handleUninstall(app.id)
                    }
                  >
                    Uninstall
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* FOOTER */}

      <footer className="footer">
        <img src={logo} alt="" />

        <p>Copyright © 2025 - All right reserved</p>
      </footer>
    </div>
  );
}

export default App;