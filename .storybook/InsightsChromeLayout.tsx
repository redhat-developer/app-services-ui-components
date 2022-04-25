import { FunctionComponent, useState } from "react";

export const InsightsChromeLayout: FunctionComponent<{
  withLayout: boolean;
}> = ({ withLayout, children }) => {
  const [expanded, setIsExpanded] = useState(true);
  const toggleNav = () => setIsExpanded(!expanded);
  return withLayout ? (
    <>
      <link
        href="https://console.redhat.com/apps/chrome/js/main.css"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://console.redhat.com/apps/chrome/js/806.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://console.redhat.com/apps/landing/css/468.171fd7dbf0de1093f763.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://console.redhat.com/apps/landing/css/832.afaa0b222a069ed6928d.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://console.redhat.com/apps/chrome/js/742.css"
      />

      <div>
        <div
          className="pf-c-page pf-m-redhat-font"
          id="page"
          style={{ display: "none" }}
        />
        <div id="chrome-entry">
          <div className="pf-c-drawer pf-m-inline pf-u-h-100vh">
            <div className="pf-c-drawer__main">
              <div className="pf-c-drawer__content">
                <div className="pf-c-drawer__body pfext-quick-start-drawer__body">
                  <div className="pf-c-drawer pf-m-inline">
                    <div className="pf-c-drawer__main">
                      <div className="pf-c-drawer__content">
                        <div className="pf-c-drawer__body pfext-quick-start-drawer__body">
                          <div
                            id="chrome-app-render-root"
                            className="pf-c-drawer__content"
                            data-ouia-safe="true"
                            data-ouia-bundle="application-services"
                            data-ouia-app-id="streams"
                          >
                            <div className="pf-c-page pf-m-resize-observer pf-m-breakpoint-2xl">
                              <header className="pf-c-masthead pf-m-display-inline chr-c-masthead">
                                <div className="pf-c-masthead__toggle">
                                  <button
                                    id="nav-toggle"
                                    aria-expanded="true"
                                    aria-disabled="false"
                                    aria-label="Global navigation"
                                    className="pf-c-button pf-m-plain"
                                    type="button"
                                    data-ouia-component-type="PF4/Button"
                                    data-ouia-safe="true"
                                    data-ouia-component-id="OUIA-Generated-Button-plain-1"
                                    onClick={toggleNav}
                                  >
                                    <svg
                                      fill="currentColor"
                                      height="1em"
                                      width="1em"
                                      viewBox="0 0 448 512"
                                      aria-hidden="true"
                                      role="img"
                                      style={{ verticalAlign: "-0.125em" }}
                                    >
                                      <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" />
                                    </svg>
                                  </button>
                                </div>
                                <div className="pf-c-masthead__main">
                                  <a
                                    aria-current="page"
                                    className="pf-c-masthead__brand active"
                                    tabIndex={0}
                                    data-testid="router-link"
                                    data-quickstart-id
                                    href="/"
                                  >
                                    <img
                                      className="pf-c-brand chr-c-brand"
                                      src="https://console.redhat.com//apps/chrome/js/d7d2238f0d64e36cd533.svg"
                                      alt="Red Hat Logo"
                                    />
                                  </a>
                                </div>
                                <div className="pf-c-masthead__content">
                                  <div
                                    className="pf-c-toolbar pf-m-full-height"
                                    id="pf-random-id-1"
                                    data-ouia-component-type="PF4/Toolbar"
                                    data-ouia-safe="true"
                                    data-ouia-component-id="OUIA-Generated-Toolbar-1"
                                  >
                                    <div className="pf-c-toolbar__content">
                                      <div className="pf-c-toolbar__content-section">
                                        <div className="pf-c-toolbar__group pf-m-filter-group">
                                          <div className="pf-c-toolbar__item">
                                            <div
                                              className="pf-c-dropdown pf-m-full-height"
                                              data-ouia-component-type="PF4/Dropdown"
                                              data-ouia-safe="true"
                                              data-ouia-component-id="App Filter"
                                            >
                                              <button
                                                data-ouia-component-type="PF4/DropdownToggle"
                                                data-ouia-safe="true"
                                                data-ouia-component-id="OUIA-Generated-DropdownToggle-1"
                                                id="toggle-id"
                                                className="pf-c-dropdown__toggle"
                                                type="button"
                                                aria-expanded="false"
                                                aria-haspopup="false"
                                              >
                                                <span className="pf-c-dropdown__toggle-text">
                                                  All apps and services
                                                </span>
                                                <span className="pf-c-dropdown__toggle-icon">
                                                  <svg
                                                    fill="currentColor"
                                                    height="1em"
                                                    width="1em"
                                                    viewBox="0 0 320 512"
                                                    aria-hidden="true"
                                                    role="img"
                                                    style={{
                                                      verticalAlign: "-0.125em",
                                                    }}
                                                  >
                                                    <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                                  </svg>
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <div
                                          className="pf-c-toolbar__group pf-m-align-right pf-m-space-items-none pf-m-icon-button-group pf-m-align-right pf-m-spacer-none pf-m-spacer-md-on-md pf-u-mr-0"
                                          widget-type="InsightsToolbar"
                                        >
                                          <div className="pf-c-toolbar__item">
                                            <div
                                              className="pf-c-dropdown pf-m-align-right"
                                              data-ouia-component-type="PF4/Dropdown"
                                              data-ouia-safe="true"
                                              data-ouia-component-id="chrome-settings"
                                            >
                                              <button
                                                data-ouia-component-type="PF4/DropdownToggle"
                                                data-ouia-safe="true"
                                                data-ouia-component-id="SettingsMenu"
                                                id="SettingsMenu"
                                                className="pf-c-dropdown__toggle pf-m-plain"
                                                type="button"
                                                aria-expanded="false"
                                                aria-haspopup="true"
                                              >
                                                <span>
                                                  <svg
                                                    fill="currentColor"
                                                    height="1em"
                                                    width="1em"
                                                    viewBox="0 0 512 512"
                                                    aria-hidden="true"
                                                    role="img"
                                                    style={{
                                                      verticalAlign: "-0.125em",
                                                    }}
                                                  >
                                                    <path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" />
                                                  </svg>
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                          <div
                                            className="pf-c-dropdown pf-m-align-right"
                                            data-ouia-component-type="PF4/Dropdown"
                                            data-ouia-safe="true"
                                            data-ouia-component-id="chrome-help"
                                          >
                                            <button
                                              data-ouia-component-type="PF4/DropdownToggle"
                                              data-ouia-safe="true"
                                              data-ouia-component-id="HelpMenu"
                                              id="HelpMenu"
                                              className="pf-c-dropdown__toggle pf-m-plain"
                                              type="button"
                                              aria-expanded="false"
                                              aria-haspopup="true"
                                            >
                                              <span>
                                                <svg
                                                  fill="currentColor"
                                                  height="1em"
                                                  width="1em"
                                                  viewBox="0 0 512 512"
                                                  aria-hidden="true"
                                                  role="img"
                                                  style={{
                                                    verticalAlign: "-0.125em",
                                                  }}
                                                >
                                                  <path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z" />
                                                </svg>
                                              </span>
                                            </button>
                                          </div>
                                          <div className="pf-c-toolbar__item pf-u-mr-0">
                                            <div
                                              aria-label="Overflow actions"
                                              className="pf-c-dropdown pf-m-align-right chr-c-dropdown-user-toggle"
                                              data-ouia-component-type="PF4/Dropdown"
                                              data-ouia-safe="true"
                                              data-ouia-component-id="chrome-user-menu"
                                            >
                                              <button
                                                widget-type="UserMenu"
                                                data-ouia-component-type="PF4/DropdownToggle"
                                                data-ouia-safe="true"
                                                data-ouia-component-id="OUIA-Generated-DropdownToggle-2"
                                                id="UserMenu"
                                                className="pf-c-dropdown__toggle data-hj-suppress"
                                                type="button"
                                                aria-expanded="false"
                                                aria-haspopup="true"
                                              >
                                                <span className="pf-c-dropdown__toggle-image">
                                                  <img
                                                    src="https://console.redhat.com/apps/chrome/assets/images/img_avatar.svg"
                                                    alt="User Avatar"
                                                    className="pf-c-avatar"
                                                  />
                                                </span>
                                                <span className="pf-c-dropdown__toggle-text">
                                                  Riccardo Forina
                                                </span>
                                                <span className="pf-c-dropdown__toggle-icon">
                                                  <svg
                                                    fill="currentColor"
                                                    height="1em"
                                                    width="1em"
                                                    viewBox="0 0 320 512"
                                                    aria-hidden="true"
                                                    role="img"
                                                    style={{
                                                      verticalAlign: "-0.125em",
                                                    }}
                                                  >
                                                    <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" />
                                                  </svg>
                                                </span>
                                              </button>
                                            </div>
                                          </div>
                                          <div className="pf-c-toolbar__item pf-m-hidden">
                                            <div
                                              aria-label="Overflow actions"
                                              className="pf-c-dropdown pf-m-align-right chr-c-dropdown-user-toggle"
                                              data-ouia-component-type="PF4/Dropdown"
                                              data-ouia-safe="true"
                                              data-ouia-component-id="chrome-user-menu"
                                            >
                                              <button
                                                aria-label="Actions"
                                                id="pf-dropdown-toggle-id-3"
                                                className="pf-c-dropdown__toggle data-hj-suppress"
                                                type="button"
                                                aria-expanded="false"
                                                aria-haspopup="true"
                                              >
                                                <svg
                                                  fill="currentColor"
                                                  height="1em"
                                                  width="1em"
                                                  viewBox="0 0 192 512"
                                                  aria-hidden="true"
                                                  role="img"
                                                  style={{
                                                    verticalAlign: "-0.125em",
                                                  }}
                                                >
                                                  <path d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z" />
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div
                                        className="pf-c-toolbar__expandable-content"
                                        id="pf-random-id-1-expandable-content-11"
                                      >
                                        <div className="pf-c-toolbar__group" />
                                      </div>
                                    </div>
                                    <div
                                      className="pf-c-toolbar__content pf-m-hidden"
                                      hidden
                                    >
                                      <div className="pf-c-toolbar__group" />
                                    </div>
                                  </div>
                                </div>
                              </header>
                              <div
                                id="chr-c-sidebar"
                                className={`pf-c-page__sidebar ${
                                  expanded ? "pf-m-expanded" : "pf-m-collapsed"
                                }`}
                                aria-hidden="false"
                              >
                                <div className="pf-topology-side-bar__body">
                                  <div className="chr-c-app-title">
                                    Application Services
                                  </div>
                                  <nav
                                    className="pf-c-nav"
                                    aria-label="Insights Global Navigation"
                                    data-ouia-component-type="PF4/Nav"
                                    data-ouia-safe="true"
                                    data-ouia-component-id="SideNavigation"
                                  >
                                    <ul className="pf-c-nav__list">
                                      <li
                                        className="pf-c-nav__item"
                                        data-ouia-component-type="PF4/NavItem"
                                        data-ouia-safe="true"
                                        data-ouia-component-id="Overview"
                                      >
                                        <a
                                          className="pf-c-nav__link"
                                          data-testid="router-link"
                                          data-quickstart-id="application-services_overview"
                                          href="/application-services/overview"
                                        >
                                          Overview{" "}
                                        </a>
                                      </li>
                                      <li
                                        className="pf-c-nav__item"
                                        data-ouia-component-type="PF4/NavItem"
                                        data-ouia-safe="true"
                                        data-ouia-component-id="API Management"
                                      >
                                        <a
                                          className="pf-c-nav__link"
                                          data-testid="router-link"
                                          data-quickstart-id="application-services_api-management"
                                          href="/application-services/api-management"
                                        >
                                          API Management{" "}
                                        </a>
                                      </li>
                                      <li
                                        className="pf-c-nav__item"
                                        data-ouia-component-type="PF4/NavItem"
                                        data-ouia-safe="true"
                                        data-ouia-component-id="Connectors"
                                      >
                                        <a
                                          className="pf-c-nav__link"
                                          data-testid="router-link"
                                          data-quickstart-id="application-services_connectors"
                                          href="/application-services/connectors"
                                        >
                                          Connectors{" "}
                                        </a>
                                      </li>
                                      <li
                                        className="pf-c-nav__item"
                                        data-ouia-component-type="PF4/NavItem"
                                        data-ouia-safe="true"
                                        data-ouia-component-id="Data Science"
                                      >
                                        <a
                                          className="pf-c-nav__link"
                                          data-testid="router-link"
                                          data-quickstart-id="application-services_data-science"
                                          href="/application-services/data-science"
                                        >
                                          Data Science{" "}
                                        </a>
                                      </li>
                                      <li
                                        className="pf-c-nav__item"
                                        data-ouia-component-type="PF4/NavItem"
                                        data-ouia-safe="true"
                                        data-ouia-component-id="Service Accounts"
                                      >
                                        <a
                                          className="pf-c-nav__link"
                                          data-testid="router-link"
                                          data-quickstart-id="application-services_service-accounts"
                                          href="/application-services/service-accounts"
                                        >
                                          Service Accounts
                                        </a>
                                      </li>
                                      <li
                                        className="pf-c-nav__item pf-m-expandable"
                                        data-ouia-component-type="PF4/NavExpandable"
                                        data-ouia-safe="true"
                                        data-ouia-component-id="OUIA-Generated-NavExpandable-1"
                                        data-quickstart-id="Service-Registry"
                                      >
                                        <button
                                          className="pf-c-nav__link"
                                          id="pf-1650895160278ng2tdvh5awq"
                                          aria-expanded="false"
                                        >
                                          Service Registry
                                          <span className="pf-c-nav__toggle">
                                            <span className="pf-c-nav__toggle-icon">
                                              <svg
                                                fill="currentColor"
                                                height="1em"
                                                width="1em"
                                                viewBox="0 0 256 512"
                                                aria-hidden="true"
                                                role="img"
                                                style={{
                                                  verticalAlign: "-0.125em",
                                                }}
                                              >
                                                <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
                                              </svg>
                                            </span>
                                          </span>
                                        </button>
                                        <section
                                          className="pf-c-nav__subnav"
                                          aria-labelledby="pf-1650895160278ng2tdvh5awq"
                                          hidden
                                        >
                                          <ul className="pf-c-nav__list">
                                            <li
                                              className="pf-c-nav__item"
                                              data-ouia-component-type="PF4/NavItem"
                                              data-ouia-safe="true"
                                              data-ouia-component-id="Service Registry Instances"
                                            >
                                              <a
                                                className="pf-c-nav__link"
                                                data-testid="router-link"
                                                data-quickstart-id="application-services_service-registry"
                                                href="/application-services/service-registry"
                                              >
                                                Service Registry Instances
                                              </a>
                                            </li>
                                            <li
                                              className="pf-c-nav__item chr-c-navigation__additional-links"
                                              data-ouia-component-type="PF4/NavItem"
                                              data-ouia-safe="true"
                                              data-ouia-component-id="Documentation"
                                            >
                                              <a
                                                data-testid="native-link"
                                                href="https://access.redhat.com/documentation/en-us/red_hat_openshift_service_registry"
                                                rel="noreferrer noopener"
                                                target="_blank"
                                                className="pf-c-nav__link chr-c-navigation__additional-links"
                                                itemID="https://access.redhat.com/documentation/en-us/red_hat_openshift_service_registry"
                                                data-quickstart-id="https://access.redhat.com/documentation/en-us/red_hat_openshift_service_registry"
                                              >
                                                Documentation
                                                <svg
                                                  fill="currentColor"
                                                  height="1em"
                                                  width="1em"
                                                  viewBox="0 0 512 512"
                                                  aria-hidden="true"
                                                  role="img"
                                                  style={{
                                                    verticalAlign: "-0.125em",
                                                  }}
                                                >
                                                  <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" />
                                                </svg>
                                              </a>
                                            </li>
                                          </ul>
                                        </section>
                                      </li>
                                      <li
                                        className="pf-c-nav__item pf-m-expandable pf-m-expanded pf-m-current"
                                        data-ouia-component-type="PF4/NavExpandable"
                                        data-ouia-safe="true"
                                        data-ouia-component-id="OUIA-Generated-NavExpandable-2"
                                        data-quickstart-id="Streams-for-Apache-Kafka"
                                      >
                                        <button
                                          className="pf-c-nav__link"
                                          id="pf-1650895160280t0w7k4p3hsn"
                                          aria-expanded="true"
                                        >
                                          Streams for Apache Kafka
                                          <span className="pf-c-nav__toggle">
                                            <span className="pf-c-nav__toggle-icon">
                                              <svg
                                                fill="currentColor"
                                                height="1em"
                                                width="1em"
                                                viewBox="0 0 256 512"
                                                aria-hidden="true"
                                                role="img"
                                                style={{
                                                  verticalAlign: "-0.125em",
                                                }}
                                              >
                                                <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
                                              </svg>
                                            </span>
                                          </span>
                                        </button>
                                        <section
                                          className="pf-c-nav__subnav"
                                          aria-labelledby="pf-1650895160280t0w7k4p3hsn"
                                        >
                                          <ul className="pf-c-nav__list">
                                            <li
                                              className="pf-c-nav__item"
                                              data-ouia-component-type="PF4/NavItem"
                                              data-ouia-safe="true"
                                              data-ouia-component-id="Kafka Overview"
                                            >
                                              <a
                                                className="pf-c-nav__link"
                                                data-testid="router-link"
                                                data-quickstart-id="application-services_streams_overview"
                                                href="/application-services/streams/overview"
                                              >
                                                Kafka Overview
                                              </a>
                                            </li>
                                            <li
                                              className="pf-c-nav__item"
                                              data-ouia-component-type="PF4/NavItem"
                                              data-ouia-safe="true"
                                              data-ouia-component-id="Kafka Instances"
                                            >
                                              <a
                                                aria-current="page"
                                                className="pf-c-nav__link pf-m-current active"
                                                data-testid="router-link"
                                                data-quickstart-id="application-services_streams_kafkas"
                                                href="/application-services/streams/kafkas"
                                              >
                                                Kafka Instances
                                              </a>
                                            </li>
                                            <li
                                              className="pf-c-nav__item chr-c-navigation__additional-links"
                                              data-ouia-component-type="PF4/NavItem"
                                              data-ouia-safe="true"
                                              data-ouia-component-id="Documentation"
                                            >
                                              <a
                                                data-testid="native-link"
                                                href="https://access.redhat.com/documentation/en-us/red_hat_openshift_streams_for_apache_kafka"
                                                rel="noreferrer noopener"
                                                target="_blank"
                                                className="pf-c-nav__link chr-c-navigation__additional-links"
                                                itemID="https://access.redhat.com/documentation/en-us/red_hat_openshift_streams_for_apache_kafka"
                                                data-quickstart-id="https://access.redhat.com/documentation/en-us/red_hat_openshift_streams_for_apache_kafka"
                                              >
                                                Documentation
                                                <svg
                                                  fill="currentColor"
                                                  height="1em"
                                                  width="1em"
                                                  viewBox="0 0 512 512"
                                                  aria-hidden="true"
                                                  role="img"
                                                  style={{
                                                    verticalAlign: "-0.125em",
                                                  }}
                                                >
                                                  <path d="M432,320H400a16,16,0,0,0-16,16V448H64V128H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V336A16,16,0,0,0,432,320ZM488,0h-128c-21.37,0-32.05,25.91-17,41l35.73,35.73L135,320.37a24,24,0,0,0,0,34L157.67,377a24,24,0,0,0,34,0L435.28,133.32,471,169c15,15,41,4.5,41-17V24A24,24,0,0,0,488,0Z" />
                                                </svg>
                                              </a>
                                            </li>
                                          </ul>
                                        </section>
                                      </li>
                                      <section
                                        className="pf-c-nav__section chr-c-section-nav"
                                        aria-labelledby="Insights"
                                      >
                                        <h2
                                          className="pf-c-nav__section-title"
                                          id="Insights"
                                        >
                                          <div>
                                            <svg
                                              fill="currentColor"
                                              height="1em"
                                              width="1em"
                                              viewBox="0 0 960 1024"
                                              aria-hidden="true"
                                              role="img"
                                              style={{
                                                verticalAlign: "-0.125em",
                                              }}
                                            >
                                              <path d="M960,224 C960,206.3 945.7,192 928,192 L480,192 C462.3,192 448,206.3 448,224 L448,288 C448,305.7 462.3,320 480,320 L741.5,320 L450.3,614.2 L343.7,507.2 C331.2,494.7 310.9,494.6 298.4,507.2 L9.4,796.2 C3.1,802.4 0,810.6 0,818.7 C0,826.9 3.1,835.1 9.4,841.3 L54.7,886.6 C60.9,892.8 69.1,896 77.3,896 C85.5,896 93.7,892.9 99.9,886.6 L320.9,665.6 L427.5,772.6 C440,785.1 460.3,785.2 472.8,772.6 L832,410.5 L831,672 C831,689.7 844.3,704 862,704 L926,704 C943.7,704 960,689.7 960,672 L960,224 Z" />
                                            </svg>
                                            Insights
                                          </div>
                                        </h2>
                                        <ul className="pf-c-nav__list chr-c-section-nav">
                                          <li
                                            className="pf-c-nav__item pf-m-expandable"
                                            data-ouia-component-type="PF4/NavExpandable"
                                            data-ouia-safe="true"
                                            data-ouia-component-id="OUIA-Generated-NavExpandable-3"
                                            data-quickstart-id="Subscriptions"
                                          >
                                            <button
                                              className="pf-c-nav__link"
                                              id="pf-1650895160281rlht5k8scno"
                                              aria-expanded="false"
                                            >
                                              Subscriptions
                                              <span className="pf-c-nav__toggle">
                                                <span className="pf-c-nav__toggle-icon">
                                                  <svg
                                                    fill="currentColor"
                                                    height="1em"
                                                    width="1em"
                                                    viewBox="0 0 256 512"
                                                    aria-hidden="true"
                                                    role="img"
                                                    style={{
                                                      verticalAlign: "-0.125em",
                                                    }}
                                                  >
                                                    <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
                                                  </svg>
                                                </span>
                                              </span>
                                            </button>
                                            <section
                                              className="pf-c-nav__subnav"
                                              aria-labelledby="pf-1650895160281rlht5k8scno"
                                              hidden
                                            >
                                              <ul className="pf-c-nav__list">
                                                <li
                                                  className="pf-c-nav__item"
                                                  data-ouia-component-type="PF4/NavItem"
                                                  data-ouia-safe="true"
                                                  data-ouia-component-id="Streams for Apache Kafka"
                                                >
                                                  <a
                                                    className="pf-c-nav__link"
                                                    data-testid="router-link"
                                                    data-quickstart-id="application-services_subscriptions_streams"
                                                    href="/application-services/subscriptions/streams"
                                                  >
                                                    Streams for Apache Kafka{" "}
                                                    <span className="pf-c-badge pf-m-unread chr-c-toolbar__beta-badge chr-c-navigation__beta-badge">
                                                      beta
                                                    </span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </section>
                                          </li>
                                        </ul>
                                      </section>
                                      <li
                                        className="pf-c-nav__item"
                                        data-ouia-component-type="PF4/NavItem"
                                        data-ouia-safe="true"
                                        data-ouia-component-id="Database Access"
                                      >
                                        <a
                                          className="pf-c-nav__link"
                                          data-testid="router-link"
                                          data-quickstart-id="application-services_databases"
                                          href="/application-services/databases"
                                        >
                                          Database Access{" "}
                                        </a>
                                      </li>
                                      <li
                                        className="pf-c-nav__item"
                                        data-ouia-component-type="PF4/NavItem"
                                        data-ouia-safe="true"
                                        data-ouia-component-id="Learning Resources"
                                      >
                                        <a
                                          className="pf-c-nav__link"
                                          data-testid="router-link"
                                          data-quickstart-id="application-services_learning-resources"
                                          href="/application-services/learning-resources"
                                        >
                                          Learning Resources
                                        </a>
                                      </li>
                                    </ul>
                                  </nav>
                                </div>
                              </div>
                              <main className="pf-c-page__main" tabIndex={-1}>
                                <div className="chr-render pf-u-h-100vh">
                                  <main
                                    role="main"
                                    className="chr-scope__default-layout applicationServices"
                                  >
                                    {children}
                                  </main>
                                  <main
                                    className="pf-c-page__main"
                                    id="no-access"
                                  />
                                </div>
                              </main>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="pf-drawer-panel-0"
                        className="pf-c-drawer__panel pf-m-resizable pfext-quick-start__base"
                        hidden
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="consent_blackbar" />
        <div />
        <button
          aria-disabled="false"
          className="pf-c-button pf-m-primary chr-c-button-feedback"
          type="button"
          data-ouia-component-type="PF4/Button"
          data-ouia-safe="true"
          data-ouia-component-id="feedback-button"
        >
          <svg
            fill="currentColor"
            height="1em"
            width="1em"
            viewBox="0 0 576 512"
            aria-hidden="true"
            role="img"
            style={{ verticalAlign: "-0.125em" }}
          >
            <path d="M532 386.2c27.5-27.1 44-61.1 44-98.2 0-80-76.5-146.1-176.2-157.9C368.3 72.5 294.3 32 208 32 93.1 32 0 103.6 0 192c0 37 16.5 71 44 98.2-15.3 30.7-37.3 54.5-37.7 54.9-6.3 6.7-8.1 16.5-4.4 25 3.6 8.5 12 14 21.2 14 53.5 0 96.7-20.2 125.2-38.8 9.2 2.1 18.7 3.7 28.4 4.9C208.1 407.6 281.8 448 368 448c20.8 0 40.8-2.4 59.8-6.8C456.3 459.7 499.4 480 553 480c9.2 0 17.5-5.5 21.2-14 3.6-8.5 1.9-18.3-4.4-25-.4-.3-22.5-24.1-37.8-54.8zm-392.8-92.3L122.1 305c-14.1 9.1-28.5 16.3-43.1 21.4 2.7-4.7 5.4-9.7 8-14.8l15.5-31.1L77.7 256C64.2 242.6 48 220.7 48 192c0-60.7 73.3-112 160-112s160 51.3 160 112-73.3 112-160 112c-16.5 0-33-1.9-49-5.6l-19.8-4.5zM498.3 352l-24.7 24.4 15.5 31.1c2.6 5.1 5.3 10.1 8 14.8-14.6-5.1-29-12.3-43.1-21.4l-17.1-11.1-19.9 4.6c-16 3.7-32.5 5.6-49 5.6-54 0-102.2-20.1-131.3-49.7C338 339.5 416 272.9 416 192c0-3.4-.4-6.7-.7-10C479.7 196.5 528 238.8 528 288c0 28.7-16.2 50.6-29.7 64z" />
          </svg>
          Feedback
        </button>
      </div>
    </>
  ) : (
    <>{children}</>
  );
};
