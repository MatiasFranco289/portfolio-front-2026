import { Blog } from "@/app/interfaces";
import axiosInstance from "@/axios";
import { API_KEY, BLOGS_URL, DEFAULT_BLOG, PROJECTS_URL } from "@/constants";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "@/css/CommonAnimations.module.css";

interface LateralBlogsPanel {
  projectDescription: string;
  setBlogContent: Dispatch<SetStateAction<string>>;
}

export default function LateralBlogsPanel({
  setBlogContent,
  projectDescription,
}: LateralBlogsPanel) {
  const params = useParams();
  const projectID = params.id;
  const [blogs, setBlogs] = useState<Array<Blog>>([
    {
      ...DEFAULT_BLOG,
      title: params.lang === "en" ? "About the project" : "Sobre el proyecto",
    },
  ]);
  const [selectedBlogID, setSelectedBlogID] = useState<Number>(-1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!projectDescription) return;
    const token = localStorage.getItem(API_KEY);

    async function getProjectBlogs() {
      axiosInstance
        .get(`${PROJECTS_URL}/${projectID}${BLOGS_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            lang: params.lang === "es" ? "ES" : "US",
            offset: 0,
            limit: 20,
          },
        })
        .then((res) => {
          const apiResponse = res.data.data;
          let updatedBlogs = blogs;
          updatedBlogs[0].body = projectDescription;
          updatedBlogs = [...updatedBlogs, ...apiResponse];
          setBlogs(updatedBlogs);
        })
        .catch((err) => {
          console.error(
            `The following error has occurred while trying to load the blogs of the project with id ${projectID}`,
          );
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    getProjectBlogs();
  }, [projectDescription]);

  return (
    <div className="bg-[#252828] rounded-xl p-2">
      {blogs.map((blog, index) => {
        return (
          <button
            className={`${styles.left_item} ${blog.id === selectedBlogID ? "bg-white/20" : "cursor-pointer hover:bg-white/20"} 
            text-xl w-full rounded-md my-1 p-1 text-left truncate`}
            style={{ animationDelay: `${200 * index}ms` }}
            key={`blog_${index}`}
            onClick={() => {
              setSelectedBlogID(blog.id);
              setBlogContent(blog.body);
            }}
          >
            {blog.title}
          </button>
        );
      })}

      {loading && (
        <div>
          <div className="h-8 w-full rounded-md my-1 p-1 animate-pulse animate-pulse text-center text-xl bg-white/10">
            ...
          </div>
          <div className="h-8 w-full rounded-md my-2 p-1 animate-pulse [animation-delay:300ms] text-center text-xl bg-white/10">
            ...
          </div>
        </div>
      )}
    </div>
  );
}
