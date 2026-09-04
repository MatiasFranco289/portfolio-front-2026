import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "../constants"
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { IoMailSharp } from "react-icons/io5";
import styles from "../css/NetworkButtons.module.css";
import { copyToClipboard } from "@/utils";
import { toast } from "react-toastify";
import toastStyles from "../css/Toast.module.css";
import { useParams } from "next/navigation";

export default function NetworkButtons() {
  const { lang } = useParams<{ lang: string }>();
  const resumeUrl = lang === "es" ? "/resume_es.pdf" : "/resume_en.pdf";

  return (
    <div
      className={ styles.network_buttons}
    >
      <span className="hover:scale-110 duration-200">
        <a href={GITHUB_URL} target="_blank">
          <FaGithub className="text-3xl sm:text-5xl" />
        </a>
      </span>

      <span className="hover:scale-110 duration-200">
        <a href={LINKEDIN_URL} target="_blank">
          <FaLinkedin className="text-3xl sm:text-5xl" />
        </a>
      </span>

      <span className="hover:scale-110 duration-200 ">
        <button
          className="cursor-pointer outline-none"
          onClick={() => {
            copyToClipboard(
              EMAIL,
              () => {
                toast.success("Email copied to cliboard.", {
                  theme: "dark",
                  className: toastStyles.info_toast,
                  progressClassName: toastStyles.info_toast_bar,
                  icon: false,
                  position: "top-left",
                });
              }
            )
          }}
        >
          <IoMailSharp className="text-3xl sm:text-5xl" />
        </button>
      </span>

      <span className="hover:scale-110 duration-200">
        <a href={resumeUrl} download>
          <FaFileDownload className="text-3xl sm:text-5xl" />
        </a>
      </span>
    </div>
  );
}