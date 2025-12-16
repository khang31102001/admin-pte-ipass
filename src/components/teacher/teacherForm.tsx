import { generateSlug } from "@/lib/helper"
import { ITeacher } from "@/types/teacher"
import { FormEvent, useEffect, useState } from "react"
import FormErrorSummary from "../common/FormErrorSummary"
import { isTeacherValid, TeacherValidationErrors, validateTeacher } from "@/validators/teacherValidation"
import Input from "../form/input/InputField"


type Mode = "create" | "update"



interface TeacherFormProps {
    mode: Mode
    initialData?: ITeacher;
    onSubmit: (data: ITeacher, teacherId?: number | null) => void

}

const defaultValues: ITeacher = {
    teacherId: null,
    name: "",
    slug: "",
    bio: "",
    content: "",
    image: "",
    overallScore: "",
    listeningScore: "",
    speakingScore: "",
    readingScore: "",
    writingScore: "",
    createdAt: "",
    updatedAt: "",
    createdBy: "",
    updatedBy: "",
    version: 1,
}

export default function TeacherForm({
    mode,
    initialData,
    onSubmit,
}: TeacherFormProps) {

    const isEdit = mode === "update"
    const [teacherData, setTeacherData] = useState<ITeacher>(defaultValues);
    const [errors, setErrors] = useState<TeacherValidationErrors>({});

    // dùng cho UPDATE
    useEffect(() => {
        if (isEdit && initialData) {
            setTeacherData((prev) => ({
                ...prev,
                ...initialData
            }))
        }
    }, [isEdit, initialData]);

    useEffect(() => {
        if (!teacherData.name) return;
        if (!isEdit && !teacherData.slug) {
            setTeacherData((prev) => ({ ...prev, slug: generateSlug(prev.name) }))
        }

    }, [teacherData.name, teacherData.slug, isEdit]);


    const updateTeacher = (values: Partial<ITeacher>) => {
        setTeacherData((prev) => ({ ...prev, ...values }));
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validation = validateTeacher(teacherData);
        setErrors(validation);
        if (!isTeacherValid(validation)) {
            const firstKey = Object.keys(validation)[0]
            const el = document.querySelector(`[data-field="${firstKey}"]`) as HTMLElement
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }


        onSubmit(
            teacherData,
            isEdit ? initialData?.teacherId ?? null : null
        )
    }
    return (
        <form
            id="form-teacher"
            onSubmit={handleSubmit}
            className="max-w-3xl space-y-6 rounded-xl border border-gray-200 bg-white p-6"
        >
            <FormErrorSummary errors={errors} />

            {/* ===== NAME ===== */}
            <div data-field="name">
                <label className="font-semibold text-[#04016C]">Name *</label>
                <input
                    value={teacherData.name}
                    onChange={(e) => updateTeacher({ name: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-[#04016C] focus:outline-none"
                    placeholder="Ms. Anna Nguyen"
                />
            </div>

            {/* ===== SLUG ===== */}
            <div data-field="slug">
                <label className="font-semibold text-[#04016C]">Slug *</label>
                <div className="">
                    <Input
                        disabled={isEdit}
                        value={teacherData.slug}
                        onChange={(e) => updateTeacher({ slug: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 p-2 focus:border-[#04016C] focus:outline-none"
                        placeholder="anna-nguyen"
                    />
                </div>
            </div>

            {/* ===== BIO ===== */}
            <div data-field="bio">
                <label className="font-semibold text-[#04016C]">Bio *</label>
                <textarea
                    value={teacherData.bio}
                    onChange={(e) => updateTeacher({ bio: e.target.value })}
                    className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-[#04016C] focus:outline-none"
                    rows={3}
                    placeholder="Short introduction about teacher..."
                />
            </div>

            {/* ===== SCORES ===== */}
            <div className="grid grid-cols-2 gap-4">
                {(
                    [
                        { key: "overallScore", label: "Overall" },
                        { key: "listeningScore", label: "Listening" },
                        { key: "speakingScore", label: "Speaking" },
                        { key: "readingScore", label: "Reading" },
                        { key: "writingScore", label: "Writing" },
                    ] as const
                ).map(({ key, label }) => (
                    <div key={key} data-field={key}>
                        <label className="text-sm font-semibold text-[#04016C]">{label} *</label>
                        <input
                            value={teacherData[key]}
                            onChange={(e) =>
                                updateTeacher({ [key]: e.target.value } as Partial<ITeacher>)
                            }
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 text-center focus:border-[#04016C] focus:outline-none"
                            placeholder="79"
                        />
                    </div>
                ))}
            </div>

            {/* ===== QUICK PREVIEW ===== */}
            <div className="rounded-lg bg-gray-50 p-4">
                <p className="font-bold text-[#04016C]">Preview</p>
                <p className="font-semibold">{teacherData.name || "Teacher Name"}</p>
                <p className="text-sm text-gray-500">/{teacherData.slug || "slug"}</p>
                <p className="text-sm">{teacherData.bio || "Short bio..."}</p>

                {teacherData.overallScore && (
                    <div className="mt-2 inline-flex rounded-full bg-[#F6E10E] px-3 py-1 text-xs font-bold text-[#04016C]">
                        Overall: {teacherData.overallScore}
                    </div>
                )}
            </div>
        </form>
    )
}
