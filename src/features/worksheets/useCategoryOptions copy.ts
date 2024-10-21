import { useState, useMemo } from "react";
import { useCategories } from "./useCategories";
import { Category } from "../../services/apiCategory";

interface CategoryOption {
  value: number;
  label: string;
}

const useCategoryOptions = () => {
  const { categories } = useCategories();

  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );

  const gradeOptions = useMemo(() => {
    return (
      categories
        ?.filter((category: Category) => category.type === "grade")
        ?.map((grade: Category) => ({ value: grade.id, label: grade.name })) ||
      []
    );
  }, [categories]);

  const subjectOptions = useMemo(() => {
    if (!selectedGradeId) return [];
    const selectedGrade = categories?.find(
      (category: Category) => category.id === selectedGradeId
    );
    return (
      selectedGrade?.child?.map((subject: Category) => ({
        value: subject.id,
        label: subject.name,
      })) || []
    );
  }, [categories, selectedGradeId]);

  const topicOptions = useMemo(() => {
    if (!selectedSubjectId) return [];
    const selectedSubject = categories
      ?.find((category: Category) => category.id === selectedGradeId)
      ?.child?.find((subject: Category) => subject.id === selectedSubjectId);
    return (
      selectedSubject?.child?.map((topic: Category) => ({
        value: topic.id,
        label: topic.name,
      })) || []
    );
  }, [categories, selectedGradeId, selectedSubjectId]);

  return {
    gradeOptions,
    subjectOptions,
    topicOptions,
    setSelectedGradeId,
    setSelectedSubjectId,
  };
};

export default useCategoryOptions;
