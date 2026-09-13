import { Skill, Technology } from "@/app/interfaces";
import styles from "@/css/CommonAnimations.module.css";

interface SkillListProps {
  title: string;
  items: Array<Skill | Technology> | undefined;
  loadingBgColor?: string;
  index?: number;
}

export default function SkillList({
  title,
  items,
  loadingBgColor = "bg-[#252828]",
  index = 1,
}: SkillListProps) {
  const defaultItems = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  return (
    <div className="flex justify-between items-center flex-col md:flex-row">
      <div>
        <h3
          className={`text-lg sm:text-xl font-semibold text-center sm:text-nowrap mr-6 ${styles.left_item}`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {title}
        </h3>
      </div>

      {items ? (
        <div className="flex flex-row flex-wrap w-5/6 h-auto xl:h-36 justify-center items-center">
          {items.map((i, index) => {
            return (
              <div
                key={`${title}_${index}`}
                className={styles.up_item}
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="border px-2 py-1 rounded-full m-2 text-center text-sm sm:text-base">
                  {i.name}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-row flex-wrap justify-center">
          {defaultItems.map((i, index) => {
            return (
              <div
                className={`${loadingBgColor} rounded-full m-2 w-24 h-8 animate-pulse`}
                style={{ animationDelay: `${index * 100}ms` }}
                key={`loading_${title}_${index}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
