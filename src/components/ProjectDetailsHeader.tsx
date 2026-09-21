import { ProjectDetails } from "@/app/interfaces";
import styles from "@/css/CommonAnimations.module.css";
import ExternalResourceList from "./ExternalResourceList";
import MarkdownSection from "./MarkdownSection";

interface ProjectDetailsHeaderProps {
  projectDetails: ProjectDetails;
}

export default function ProjectDetailsHeader({
  projectDetails,
}: ProjectDetailsHeaderProps) {
  return (
    <div className="bg-[#252828] p-6 rounded-xl">
      {/* Title */}
      <div className="flex items-center">
        <h2 className="text-3xl font-semibold">{projectDetails.name}</h2>
        {projectDetails.logo && (
          <img
            src={projectDetails.logo}
            alt="project_logo"
            className="w-8 h-8 ml-2"
          />
        )}
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap mt-4">
        {projectDetails.technologies &&
          projectDetails.technologies.map((t, index) => {
            return (
              <div
                key={`project_${projectDetails.id}_technology_${t.id}`}
                className={`${index !== 0 ? "m-2" : "mt-2"}`}
              >
                <div
                  className={styles.up_item}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <span className="border border-white rounded-full px-2 py-1">
                    {t.name}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
