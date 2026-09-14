"use client";
import { ProjectDetails as ProjectDetailsI } from "@/app/interfaces";
import axiosInstance from "@/axios";
import ExternalResourceList from "@/components/ExternalResourceList";
import { useGlobal } from "@/components/GlobalProvider";
import LateralBlogsPanel from "@/components/LateralBlogsPanel";
import MarkdownSection from "@/components/MarkdownSection";
import ProjectDetailsHeader from "@/components/ProjectDetailsHeader";
import ProjectDetailsLoading from "@/components/ProjectDetailsLoading";
import { API_KEY, PROJECTS_URL } from "@/constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectDetails() {
  const { appReady } = useGlobal();
  const params = useParams();
  const projectID = params.id;
  const [project, setProject] = useState<ProjectDetailsI>();
  const [blogContent, setBlogContent] = useState<string>("");

  useEffect(() => {
    if (!appReady) return;
    const token = localStorage.getItem(API_KEY);

    async function getProjectDetails() {
      axiosInstance(`${PROJECTS_URL}/${projectID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          lang: params.lang === "es" ? "ES" : "US",
        },
      })
        .then((res) => {
          const apiResponse = res.data.data[0];
          setBlogContent(apiResponse.long_description);
          setProject(apiResponse);
        })
        .catch((err) => {
          console.error(
            `The following error has occurred while trying to get the details of the project with id "${projectID}"`,
          );
          console.error(err);
        });
    }

    getProjectDetails();
  }, [appReady]);

  return project ? (
    <div className="bg-[#1c1e1e] sm:h-screen flex-row min-h-screen w-full flex">
      <div className="w-full flex flex-col sm:flex-row items-start mt-24 mb-12 p-6 sm:p-0">
        {/* Left side */}
        <div className="w-auto sm:w-82 m-0 sm:ml-12 flex flex-col justify-between h-full">
          <div className="hidden sm:block">
            <LateralBlogsPanel
              setBlogContent={setBlogContent}
              projectDescription={project.long_description}
            />
          </div>

          <ExternalResourceList
            externalResources={project.external_resources}
          />
        </div>

        {/* Right side */}
        <div className="w-full mx-0 sm:mx-12 self-stretch flex flex-col ">
          <ProjectDetailsHeader projectDetails={project} />

          <div className="block sm:hidden mt-4">
            <LateralBlogsPanel
              setBlogContent={setBlogContent}
              projectDescription={project.long_description}
            />
          </div>

          <div className="bg-[#252828] rounded-xl mt-6 p-2 h-full overflow-scroll">
            <MarkdownSection content={blogContent} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <ProjectDetailsLoading />
  );
}
