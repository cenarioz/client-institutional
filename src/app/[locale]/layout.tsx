import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import "../globals.css";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }, { locale: "pt-BR" }];
}

interface layoutProps {
  children: ReactNode;
  params: any;
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: layoutProps) {
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
