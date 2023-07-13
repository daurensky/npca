import { json, type V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { sectionsApi } from "~/shared/api";
import { ContentSection, Main } from "~/shared/ui";

export const loader = async () => {
  const sections = await sectionsApi.getSectionsList();
  return json({ sections });
};

export const meta: V2_MetaFunction = () => {
  return [
    {
      title:
        "Информационная площадка по освещению межнациональных отношений и национальной политики в странах Центральной Азии",
    },
    {
      name: "description",
      content:
        "Мы рады Вас приветствовать на информационной площадке по освещению межнациональных отношений и национальной политики в странах Центральной Азии.",
    },
  ];
};

const Index = () => {
  const { t } = useTranslation();
  const { sections } = useLoaderData<typeof loader>();

  return (
    <Main>
      <ContentSection>
        <h2 className="text-center text-xl lg:text-3xl leading-normal">
          {t("Мы рады Вас приветствовать на")}{" "}
          <span className="inline-block relative before:absolute before:bottom-0.5 before:h-2 before:w-full before:left-4 before:bg-[#006480] before:-z-10">
            {t("информационной площадке")}
          </span>{" "}
          {t(
            "по освещению межнациональных отношений и национальной политики в странах Центральной Азии."
          )}
        </h2>
        <h1 className="text-center font-heading text-2xl lg:text-4xl leading-normal py-8">
          {t(
            "Наша цель - формирование полного представления в области межэтнических и межконфессиональных отношений, а также популяризация данных знаний."
          )}
        </h1>
        <div className="space-y-4">
          <p>{t("Здесь Вы увидите такие материалы, как")}:</p>
          <ul className="flex flex-col lg:flex-row">
            <li className="p-8 text-xl w-full text-center flex items-center border-b lg:border-b-0 lg:border-r border-white/10">
              {t(
                "Законодательная база в сфере национальной политики в странах Центральной Азии"
              )}
            </li>
            <li className="p-8 text-xl w-full text-center flex items-center">
              {t(
                "Систематизированный научный материал и экспертный опыт в области межнациональных и межконфессиональных отношений на одной информационной площадке."
              )}
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <p>{t("Разделы")}:</p>
          <ul className="grid lg:grid-cols-3 gap-4">
            {sections.data.map(({ id, attributes }) => (
              <li key={id} className="flex">
                <Link
                  to={`/s/${id}`}
                  className="p-8 text-xl bg-black/30 border border-white/10 rounded-xl w-full text-center flex justify-center items-center hover:bg-white/5 transition-colors"
                >
                  {attributes.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ContentSection>
    </Main>
  );
};

export default Index;
