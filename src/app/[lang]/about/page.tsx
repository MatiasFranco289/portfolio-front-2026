"use client";
import { Technology, TechnologyType, User } from "@/app/interfaces";
import axiosInstance from "@/axios";
import EducationsList from "@/components/EducationList";
import ExperiencesList from "@/components/ExperiencesList";
import { useGlobal } from "@/components/GlobalProvider";
import MarkdownSection from "@/components/MarkdownSection";
import Separator from "@/components/Separator";
import SkillList from "@/components/SkillList";
import {
  API_KEY,
  TECHNOLOGY_BY_LANGUAGES,
  USER_DETAILS_URL,
} from "@/constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/css/CommonAnimations.module.css";
import { capitalize } from "@/utils";

export default function About() {
  const { appReady } = useGlobal();
  const params = useParams();
  const [userDetails, setUserDetails] = useState<User>();
  const lang = params.lang as "es" | "en";
  const textByLanguage = {
    technicalSkills: {
      es: "Habilidades técnicas",
      en: "Technical skills",
    },
    softSkills: {
      es: "Habilidades blandas",
      en: "Soft skills",
    },
    title: {
      es: "Sobre mí",
      en: "About me",
    },
    skills: {
      es: "Habilidades",
      en: "Skills",
    },
  };

  useEffect(() => {
    if (!appReady) return;

    async function getUserDetails() {
      const token = localStorage.getItem(API_KEY);

      axiosInstance
        .get(USER_DETAILS_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            lang: params.lang === "es" ? "ES" : "US",
          },
        })
        .then((res) => {
          const apiResponse = res.data.data[0];
          setUserDetails(apiResponse);
        })
        .catch((err) => {
          console.error(
            `The following error has occurred while trying to get the details of the user with id 1: `,
          );
          console.error(err);
        });
    }

    getUserDetails();
  }, [appReady]);

  const technologiesByType: Record<string, Technology[]> = {};
  userDetails?.technologies.forEach((technology) => {
    const techTypeName = technology.technology_type;

    if (!(techTypeName in technologiesByType)) {
      technologiesByType[techTypeName] = [];
    }

    technologiesByType[techTypeName].push(technology);
  });

  return (
    <div className="bg-[#1c1e1e] w-full min-h-screen flex justify-center font-roboto pt-6 sm:p-6 overflow-hidden">
      <div className="w-5/6 md:w-4/6 bg-black/10 p-8 pt-0 rounded-xl mt-12">
        <h2
          className={`text-3xl font-semibold mb-8 mt-10 ${styles.up_item} ${
            !userDetails ? "animate-pulse" : ""
          }`}
          style={{
            animationDelay: "200ms",
          }}
        >
          {textByLanguage.title[lang]}
        </h2>

        {userDetails ? (
          <div className={styles.unfold}>
            <MarkdownSection content={userDetails.long_description} />
          </div>
        ) : (
          <div className="w-full h-64 animate-pulse rounded-2xl bg-[#252828]" />
        )}

        <Separator gap="mt-20" />
        <h2 className={`text-3xl font-semibold mt-8 mb-10 ${styles.up_item}`}>
          {textByLanguage.skills[lang]}
        </h2>

        <div className="">
          {Object.entries(technologiesByType).map(
            ([techType, techs], index) => {
              return (
                <div
                  className=" mt-6 p-6 rounded-xl"
                  key={`tech_type_${techType}`}
                  style={{
                    backgroundColor: `${index % 2 == 0 ? "#252828" : ""}`,
                  }}
                >
                  <SkillList
                    title={
                      TECHNOLOGY_BY_LANGUAGES[
                        techType as keyof typeof TECHNOLOGY_BY_LANGUAGES
                      ][lang]
                    }
                    items={techs}
                    index={index}
                  />
                </div>
              );
            },
          )}
        </div>

        <div className="mt-6 p-6 rounded-xl">
          <SkillList
            title={textByLanguage.softSkills[lang]}
            items={userDetails?.skills}
            loadingBgColor="bg-[#1c1e1e]"
          />
        </div>

        <Separator gap="h-24 sm:h-36" />

        <EducationsList educations={userDetails?.educations} lang={lang} />

        <Separator gap="h-24 sm:h-36" />

        <ExperiencesList experiences={userDetails?.experiences} lang={lang} />

        <Separator gap="h-24 sm:h-36" />
      </div>
    </div>
  );
}
