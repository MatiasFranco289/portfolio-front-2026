import { Skill, Technology } from "@/app/interfaces";
import { TECHNOLOGY_TYPE_COLORS } from "@/constants";
import styles from "@/css/CommonAnimations.module.css";
import { useEffect, useState } from "react";

interface SkillListProps {
  title: string;
  items: Array<Skill | Technology> | undefined;
  loadingBgColor?: string;
}

export default function SkillList({
  title,
  items,
  loadingBgColor = "bg-[#252828]",
}: SkillListProps) {
  const [sortedItems, setSortedItems] = useState<
    Array<Technology | Skill> | undefined
  >(undefined);

  // If items is an array of technologies, group technologies of the same type
  useEffect(() => {
    if (!items) return;
    if (!items.length) return;

    if ("technology_type" in items[0]) {
      setSortedItems(
        [...(items as Array<Technology>)].sort((a, b) =>
          a.technology_type.localeCompare(b.technology_type),
        ),
      );

      console.log("me pica la cola");
      console.log(sortedItems);
    } else {
      setSortedItems(items);
    }
  }, [items]);

  const defaultItems = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center">
      <div className="flex flex-col justify-center items-between w-full">
        <h3 className="text-center xl:text-left text-xl font-semibold sm:mr-6">
          {title}
        </h3>

        <h3 className="text-center xl:text-left text-xl font-semibold mr-6 invisible">
          Technical skills
        </h3>
      </div>

      {sortedItems ? (
        <div className="flex flex-row flex-wrap justify-center">
          {sortedItems.map((i, index) => {
            return (
              <div
                key={`${title}_${index}`}
                className={styles.up_item}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <div
                  className="border px-2 py-1 rounded-full m-2 text-center text-sm sm:text-base"
                  style={{
                    borderColor:
                      "technology_type" in i
                        ? TECHNOLOGY_TYPE_COLORS[i.technology_type]
                        : "#FFFFFF",
                  }}
                >
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
