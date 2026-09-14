import { Blog } from "@/app/interfaces";
import axiosInstance from "@/axios";
import { API_KEY, BLOGS_URL, DEFAULT_BLOG, PROJECTS_URL } from "@/constants";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGlobal } from "./GlobalProvider";

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
        });
    }

    getProjectBlogs();
  }, [projectDescription]);

  return (
    <div className="bg-[#252828] rounded-xl p-2">
      {blogs.map((blog, index) => {
        return (
          <button
            className={`${blog.id === selectedBlogID ? "bg-white/20" : "cursor-pointer hover:bg-white/20"} 
            text-xl w-full rounded-md my-1 p-1`}
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
    </div>
  );
}
