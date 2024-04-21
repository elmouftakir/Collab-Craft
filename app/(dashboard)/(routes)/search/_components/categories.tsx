"use client";

import { Category } from "@prisma/client";
import {
  FcSurvey,
  FcStatistics,
  FcCommandLine,
  FcRadarPlot,
  FcMindMap,
  FcAcceptDatabase,
  FcEngineering,
  FcMultipleDevices,
  FcAbout
} from "react-icons/fc";
import { IconType } from "react-icons";

import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Algorithm": FcSurvey,
  "Data Analytics & Science": FcStatistics,
  "Shell Navigation": FcCommandLine,
  "Networking": FcRadarPlot,
  "Computer Science": FcMindMap,
  "Sql & NoSQL Database": FcAcceptDatabase,
  "Engineering": FcEngineering,
  "Software": FcMultipleDevices,
  "Other": FcAbout,
};

export const Categories = ({
  items,
}: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}