import { generateSlug } from "@/lib/helper"
import { ITeacher } from "@/types/teacher"
import { FormEvent, useEffect, useState } from "react"
import FormErrorSummary from "../common/FormErrorSummary"
import { isTeacherValid, TeacherValidationErrors, validateTeacher } from "@/validators/teacherValidation"
import Input from "../form/input/InputField"
import { IMedia } from "@/types/media"
import { processImageForWeb } from "@/lib/image"
import ComponentCard from "../common/ComponentCard"
import Label from "../form/Label"
import TextArea from "../form/input/TextArea"
import RichTextEditor from "../ui/textEditor/RichTextEditor"



type Mode = "create" | "update"



interface TeacherFormProps {
    mode: Mode
    initialData?: ITeacher;
    onSubmit: (data: FormData, teacherId?: number | null) => void

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
    isImageChanged: false,
    deleteImageUrl: "",
}

export default function TeacherForm({
    mode,
    initialData,
    onSubmit,
}: TeacherFormProps) {

    const isEdit = mode === "update"
    const [teacherData, setTeacherData] = useState<ITeacher>(defaultValues);
    const [errors, setErrors] = useState<TeacherValidationErrors>({});
      const [imgPreview, setImgPreview] = useState<IMedia | null>({
        file: null,
        preview:  "",
        isImageChanged: false,
        deleteImageUrl: ""
      });
      const [isSlugTouched, setIsSlugTouched] = useState(false);


    // dùng cho UPDATE
    useEffect(() => {
        if (isEdit && initialData) {
            setTeacherData((prev) => ({
                ...prev,
                ...initialData
            }))
        }
        setIsSlugTouched(false);
    }, [isEdit, initialData]);

   useEffect(() => {
    if (isEdit) return;
    if (!teacherData.name) return;
    if (isSlugTouched) return;
    setTeacherData((prev) => ({
        ...prev,
        slug: generateSlug(prev.name),
    }));
}, [teacherData.name, isEdit, isSlugTouched]);


    const updateTeacher = (values: Partial<ITeacher>) => {
        setTeacherData((prev) => ({ ...prev, ...values }));
    }

    const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const imgFile = e.target.files?.[0];
        if (!imgFile) return;

        const { file, previewUrl } = await processImageForWeb(imgFile);

     
        updateTeacher({ image: previewUrl });

        setImgPreview((prev) => ({
            ...prev,
            file,
            preview: previewUrl,
            isImageChanged: true,
            deleteImageUrl: isEdit ? (initialData?.image ?? prev.deleteImageUrl ?? "") : "",
        }));

   
             e.target.value = "";
        };

 
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
        const formData = new FormData();

        if(imgPreview.file){
            formData.append('file', imgPreview.file ?? null);
        }

        if(teacherData){
            const payload:ITeacher = {
                ...teacherData,
                isImageChanged: imgPreview.isImageChanged,
                deleteImageUrl: imgPreview.deleteImageUrl,
            } 

            formData.append('request', JSON.stringify(payload) ?? null);
        }


        onSubmit(
            formData,
            isEdit ? initialData?.teacherId ?? null : null
        )
    }

    console.log("audit check coverPreview:", imgPreview);
    return (
        <form
            id="form-teacher"
            onSubmit={handleSubmit}
            className="max-w-6xl space-y-6 rounded-xl border border-gray-200 bg-white p-6"
        >
            <FormErrorSummary errors={errors} />

            {/* ===== 2 COLUMNS LAYOUT ===== */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* ================= LEFT: MAIN (8/12) ================= */}
                <div className="lg:col-span-8 space-y-6">
                  
                    <div data-field="name">
                        <Label htmlFor="name" className="font-semibold text-[#04016C]">Name *</Label>
                        <Input
                            value={teacherData.name}
                            onChange={(e) => updateTeacher({ name: e.target.value })}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-[#04016C] focus:outline-none"
                            placeholder="Ms. Anna Nguyen"
                        />
                    </div>

                    {/* ===== SLUG ===== */}
                    <div data-field="slug">
                        <Label className="font-semibold text-[#04016C]">Slug *</Label>
                        <Input
                            disabled={isEdit}
                            value={teacherData.slug}
                            onChange={(e) => {
                                const v = e.target.value;
                                    updateTeacher({ slug: v });
                                    if (!isEdit) {
                                        if (!v.trim()) setIsSlugTouched(false); 
                                        else setIsSlugTouched(true);            
                                    }
                                }}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-[#04016C] focus:outline-none"
                            placeholder="anna-nguyen"
                        />
                    </div>

                    {/* ===== BIO ===== */}
                    <div data-field="bio">
                        <Label className="font-semibold text-[#04016C]">Bio *</Label>
                        <TextArea
                            value={teacherData.bio}
                            onChange={(v) => updateTeacher({ bio: v})}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:border-[#04016C] focus:outline-none"
                            rows={3}
                            placeholder="Short introduction about teacher..."
                        />
                    </div>

                    {/* ===== SCORES ===== */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                                <Label className="text-sm font-semibold text-[#04016C]">{label} *</Label>
                                <Input
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

                    {/* ===== CONTENT (UNDER MAIN) ===== */}
                    <div data-field="content">
                        <Label className="font-semibold text-[#04016C]">Content</Label>
                        <RichTextEditor
                            value={teacherData.content}
                            onChange={(v)=> updateTeacher({content: v})}
                            variant="full"
                            height={600}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Bạn có thể dùng bullet points, headings, links...
                        </p>
                    </div>
                </div>

                {/* ================= RIGHT: IMAGE (4/12) ================= */}
                <div className="lg:col-span-4">
                    <div className="lg:sticky lg:top-6 space-y-6">
                        {/* IMAGE CARD */}
                        <ComponentCard 
                        title="Teacher Image"
                         desc="Tỉ lệ khuyến nghị 3×4 (portrait). PNG/JPG/WebP." 
                       
                        >
                            {/* Preview 3:4 */}
                            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                                <div className="relative w-full" style={{ paddingTop: "133.33%" }}>
                                    {/* 3:4 => height/width = 4/3 = 133.33% */}
                                    {teacherData.image ? (
                                        <img
                                            src={teacherData.image}
                                            alt="Teacher preview"
                                            className="absolute inset-0 h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                                            No image (3:4)
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Upload input (basic) */}
                            <div className="mt-4">
                                <Label className="text-sm font-semibold text-[#04016C]">
                                    Upload image
                                </Label>
                                <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    className="mt-2 block w-full text-sm text-[#04016C] cursor-pointer"
                                    onChange={handleChangeImage}
                                       
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    * Bản demo đang lưu preview Khi làm thật bạn sẽ upload file lên server và lưu URL.
                                </p>
                            </div>

                            {/* Remove */}
                            {teacherData.image && (
                                <button
                                    type="button"
                                    onClick={() => updateTeacher({ image: "" })}
                                    className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-[#04016C] hover:bg-gray-50"
                                >
                                    Remove image
                                </button>
                            )}
                        </ComponentCard>

                        {/* QUICK PREVIEW (optional keep here) */}
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
                    </div>
                </div>
            </div>
        </form>

    )
}
