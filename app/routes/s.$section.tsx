import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { sectionsApi } from "~/shared/api";
import { SERVER_URL } from "~/shared/config/server";
import { ContentSection, Main } from "~/shared/ui";

export const loader = async ({ params }: LoaderArgs) => {
  const sectionId = params.section as string;

  const section = await sectionsApi.getSectionById({ id: sectionId });
  const cmsPublicPath = SERVER_URL;

  return json({ section, cmsPublicPath });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: data?.section.data.attributes.name || "Неизвестный раздел",
    },
    {
      name: "description",
      content:
        "Мы рады Вас приветствовать на информационной площадке по освещению межнациональных отношений и национальной политики в странах Центральной Азии.",
    },
  ];
};

const Relations = () => {
  const { t } = useTranslation();
  const { section, cmsPublicPath } = useLoaderData<typeof loader>();

  console.log(section);

  return (
    <Main>
      <ContentSection>
        <div className="flex flex-col items-start gap-4">
          <Link
            to="/"
            className="flex items-center gap-4 hover:bg-white/10 px-4 py-2 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            {t("На главную")}
          </Link>
          {section.data.attributes.section.data && (
            <Link
              to={`/s/${section.data.attributes.section.data.id}`}
              className="flex items-center gap-4 hover:bg-white/10 px-4 py-2 rounded-md transition-colors"
            >
              <span className="material-symbols-outlined">turn_right</span>
              {section.data.attributes.section.data.attributes.name}
            </Link>
          )}
        </div>
        <h1 className="inline-block font-bold text-4xl relative before:absolute before:bottom-0.5 before:h-2 before:w-full before:left-2 before:bg-[#006480] before:-z-10">
          {section.data.attributes.name}
        </h1>
        <table className="bg-black/30 rounded-xl w-full">
          <thead>
            <tr>
              <th className="p-4"></th>
              <th className="p-4 font-normal text-left text-gray-500">
                Название
              </th>
            </tr>
          </thead>
          <tbody>
            {section.data.attributes.sections.data.map(({ id, attributes }) => (
              <tr key={id}>
                <td>
                  <div className="px-4 flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl">
                      folder
                    </span>
                  </div>
                </td>
                <td className="w-full">
                  <div className="pr-4">
                    <Link
                      to={`/s/${id}`}
                      className="break-all block p-4 hover:bg-white/5 transition-colors w-full rounded-xl duration-100"
                    >
                      {attributes.name}
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {section.data.attributes.files.data?.map(
              ({ attributes: { hash, name, url } }) => (
                <tr key={hash}>
                  <td>
                    <div className="px-4 flex items-center justify-center">
                      <span className="material-symbols-outlined text-3xl">
                        picture_as_pdf
                      </span>
                    </div>
                  </td>
                  <td className="w-full">
                    <div className="pr-4">
                      <Link
                        to={`${cmsPublicPath}${url}`}
                        className="break-all block p-4 hover:bg-white/5 transition-colors w-full rounded-xl duration-100"
                      >
                        {name.replace(/\.[^/.]+$/, "")}
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </ContentSection>
    </Main>
  );
};

export default Relations;
