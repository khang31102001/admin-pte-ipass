import React, { useEffect, useMemo, useState } from "react";
import SearchSelect, { Option } from "../form/SearchSelect";
import { CategoryItem } from "@/types/category";


interface Props {
    cateData: Partial<CategoryItem>;
    categories: CategoryItem[];
    parentId?: number
    onChangeCategory?: (values: Partial<CategoryItem>) => void;
}

function getPathToRoot(categories: CategoryItem[], id: number): CategoryItem[] {
    const map = new Map<number, CategoryItem>();
    categories.forEach((c) => map.set(c.categoryId, c));

    const path: CategoryItem[] = [];
    let currentId: number | null = id;

    while (currentId != null) {
        const node = map.get(currentId); // <-- node là CategoryItem object
        if (!node) break;
        path.unshift(node);
        currentId = node.parentId;
    }

    return path;
}

export const CategoryTypeSection: React.FC<Props> = ({
    cateData = null,
    categories = [],
    parentId = undefined,
    onChangeCategory,
}) => {

    const [level1Id, setLevel1Id] = useState<Option | null>(null);
    const [level2Id, setLevel2Id] = useState<Option | null>(null);
    const [level3Id, setLevel3Id] = useState<Option | null>(null);


    // console.log("CategoryTypeSection parentId:", cateId);
    useEffect(() => {

        if (!parentId) {
            setLevel1Id(null);
            setLevel2Id(null);
            setLevel3Id(null);
            return;
        }

        const path = getPathToRoot(categories, parentId);
        const [lv1, lv2, lv3,] = path;
        // console.log("CategoryTypeSection path:", path);

        const toOptions = (cate: CategoryItem): Option | null =>
            cate ? {
                label: cate.name,
                value: cate.categoryId ? cate.categoryId.toString() : "",
            } as Option : null;


        setLevel1Id(toOptions(lv1) ?? null);
        setLevel2Id(toOptions(lv2) ?? null);
        setLevel3Id(toOptions(lv3) ?? null);
    }, [parentId, categories]);


    const level1Options = useMemo(
        () => categories.filter((c) => c.level === 1)
            .map((c) => ({
                label: c.name,
                value: c.categoryId ? c.categoryId.toString() : "",
            } as Option)) ?? [],
        [categories]
    );



    const level2Options = useMemo(
        () =>
            level1Id
                ? categories.filter((c) => c.parentId === Number(level1Id.value))
                    .map((c) => ({
                        label: c.name,
                        value: c.categoryId ? c.categoryId.toString() : "",
                    } as Option)) : [],
        [categories, level1Id]
    );

    const level3Options = useMemo(
        () =>
            level2Id
                ? categories.filter((c) => c.parentId === Number(level2Id.value))
                    .map((c) => ({

                        label: c.name,
                        value: c.categoryId ? c.categoryId.toString() : "",
                    } as Option)) : [],
        [categories, level2Id]
    );



    const handleChangeLevel1 = (option: Option) => {
        setLevel1Id(option);
        setLevel2Id(null);
        setLevel3Id(null);
        if (onChangeCategory) {
            onChangeCategory({
                parentId: option ? Number(option.value) : null
            });
        }
    }



    const handleChangeLevel2 = (option: Option) => {
        setLevel2Id(option);
        setLevel3Id(null);
        if (onChangeCategory) {
            onChangeCategory({
                parentId: option ? Number(option.value) : null
            });
        }
    }

    const handleChangeLevel3 = (option: Option) => {
        setLevel3Id(option);
        if (onChangeCategory) {
            onChangeCategory({
                parentId: option ? Number(option.value) : null
            });
        }

    }

    // console.log("Selected Level 3:", level3Id);

    const showLevel2 = !!level1Id && level2Options.length > 0;
    const showLevel3 = !!level2Id && level3Options.length > 0;

    if (!categories || categories.length === 0) return null;
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="border-b border-gray-100 pb-3 text-base font-semibold text-gray-900">
                Phân cấp & loại danh mục
            </h2>

            <div className="mt-4 space-y-4">
                {/* Parent */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Danh mục cha
                    </label>
                    <SearchSelect
                        options={level1Options}
                        placeholder="Chọn danh mục cha"
                        value={level1Id}
                        onChange={handleChangeLevel1}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Không chọn = danh mục cấp 1. Chọn danh mục cha để tạo cấp 2/3.
                    </p>
                </div>

                <div
                    className={`mt-4 origin-top transition-all duration-300 ease-in-out
                        ${showLevel2
                            ? "opacity-100 max-h-40 translate-y-0 scale-y-100"
                            : "opacity-0 max-h-0 -translate-y-1 scale-y-95 overflow-hidden pointer-events-none"
                        }
                        `}
                >
                    <SearchSelect
                        options={level2Options}
                        placeholder="Chọn danh mục cấp 2"
                        value={level2Id}
                        onChange={handleChangeLevel2}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Chọn danh mục cấp 2 (nếu có).
                    </p>
                </div>

                <div
                    className={`mt-4 origin-top transition-all duration-300 ease-in-out
                        ${showLevel3
                            ? "opacity-100 max-h-40 translate-y-0 scale-y-100"
                            : "opacity-0 max-h-0 -translate-y-1 scale-y-95 overflow-hidden pointer-events-none"
                        }
                    `}
                >
                    <SearchSelect
                        options={level3Options}
                        placeholder="Chọn danh mục cấp 3"
                        value={level3Id}
                        onChange={handleChangeLevel3}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Chọn danh mục cấp 3 (nếu có).
                    </p>
                </div>


                {/* Category Type */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                        Loại danh mục (categoryType)
                    </label>
                    <input
                        type="text"
                        value={cateData.categoryType ?? ""}
                        onChange={(e) => onChangeCategory({ categoryType: e.target.value })}
                        placeholder="course / news / product..."
                        className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 text-sm"
                    />
                </div>

                {/* Flags */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                        Trạng thái hiển thị
                    </label>

                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={!!cateData.isDisable}
                            onChange={(e) => onChangeCategory && onChangeCategory({ isDisable: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        Vô hiệu hóa (Disable)
                    </label>
                </div>
            </div>
        </div>
    );
};
