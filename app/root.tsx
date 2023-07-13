import { cssBundleHref } from "@remix-run/css-bundle";
import type { ActionArgs, LinksFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { AppBar, Footer } from "~/shared/ui";
import { i18nLib, i18nModel } from "./shared/i18n";
import styles from "./tailwind.css";
import { sessionModel } from "./shared/session";

export const loader = async ({ request }: LoaderArgs) => {
  const locale = await i18nModel.getLocale(request);
  return json({ locale });
};

export const action = async ({ request }: ActionArgs) => {
  const lang = (await request.formData()).get("lang");
  const session = await sessionModel.getSession(request.headers.get("cookie"));

  session.set("lang", lang === "kk" ? "kk" : "ru");

  return redirect(request.headers.get("referer") || "/", {
    headers: {
      "Set-Cookie": await sessionModel.commitSession(session),
    },
  });
};

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: styles },
];

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

const App = () => {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  i18nLib.useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Roboto&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <Links />
      </head>
      <body className="flex flex-col h-screen bg-[#0a0a0a] text-white font-body">
        <AppBar />
        <Outlet />
        <Footer />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default App;
