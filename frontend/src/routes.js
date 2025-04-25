
// Pages
import AboutUsPage from "layouts/pages/landing-pages/about-us";
import ContactUsPage from "layouts/pages/landing-pages/contact-us";
import TrackPage from "layouts/pages/landing-pages/track";
import SignInPage from "layouts/pages/authentication/sign-in";
import SignUpPage from "layouts/pages/authentication/sign-up";
import ApplicationPage from "layouts/pages/landing-pages/application";
import StepByStepGuidePage from "layouts/pages/landing-pages/step-by-step";
import ViewPriceDetails from "pages/Presentation/routePage/ViewPriceDetails";
import ApplicationViewByAdminPage from "layouts/pages/admin/admin-home";
import PrivateRoute from "layouts/pages/authentication/PrivateComponent";
import NewsPage from "pages/Admin/NewsPage";

import ViewStatus from "pages/LandingPages/StepByStep/viewStatus.js";
// Sections

import Status from "pages/LandingPages/Track/Status";
import PaymentSuccessPage from "pages/LandingPages/Application/PaymentSuccessPage";


const routes = [
  {
    name: "landing pages",
    columns: 1,
    rowsPerColumn: 3,
    collapse: [
      {
        name: "about us",
        route: "/about",
        component: <AboutUsPage />,
      },
      {
        name: "contact us",
        route: "/contact",
        component: <ContactUsPage />,
      },
      {
        name: "track",
        route: "/trackyourapplication",
        component: <TrackPage />,
      },
      {
        name: "step guide",
        route: "/stepbystep",
        component: <StepByStepGuidePage />,
      },
      {
        name: "application",
        route: "/startyourapplication",
        component: <ApplicationPage />,
      },
      {
        name: "view price",
        route: "/view/visapaymentsdetails",
        component: <ViewPriceDetails />,
      },
      {
        name: "view application status",
        route: "/view/visastatus",
        component: <ViewStatus />,
      },
      {
        name: "status",
        route: "/view/status",
        component: <Status />,
      },
      {
        name: "payment success",
        route: "/view/payment-success",
        component: <PaymentSuccessPage />,
      },
    ],
  },
  {
    name: "authentication",
    columns: 1,
    rowsPerColumn: 1,
    collapse: [
      {
        name: "sign in",
        route: "/admin/signin",
        component: <SignInPage />,
      },
      {
        name: "sign up",
        route: "/admin/signup",
        component: <SignUpPage />,
      },
    ],
  },
  {
    name: "admin dashboard",
    columns: 1,
    rowsPerColumn: 1,
    collapse: [
      {
        name: "user applications",
        route: "/userapplicationdetails",
        component: (
          <PrivateRoute>
            <ApplicationViewByAdminPage />
          </PrivateRoute>
        ),
      },
      {
        name: "news updates",
        route: "/news-update",
        component: (
          <PrivateRoute>
            <NewsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
];

export default routes;
  

   
 

  
