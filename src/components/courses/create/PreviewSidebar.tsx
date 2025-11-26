"use client"

import type React from "react"
import { useState } from "react"

interface PreviewSidebarProps {
  courseData: {
    title: string
    image: string | null
    featured: boolean
    duration: string
    level: string
  }
}

export default function PreviewSidebar({ courseData }: PreviewSidebarProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(courseData.image)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
     <div className="space-y-4">
    {/* Course Image */}
    <div className="border rounded-lg bg-white shadow-sm">
      <div className="px-4 py-3 border-b">
        <h3 className="text-base font-semibold">Course Image</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center bg-slate-50">
          {imagePreview ? (
            <div className="space-y-2">
              <img
                src={imagePreview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-40 object-cover rounded"
              />
              <button
                type="button"
                className="w-full inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium bg-white hover:bg-slate-50 transition"
                onClick={() => {
                  // Nếu bạn muốn click vào nút này để mở lại input file
                  // có thể dùng ref cho input hoặc để trống nếu không cần
                }}
              >
                Change Image
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Icon upload đơn giản bằng SVG */}
              <svg
                className="h-8 w-8 mx-auto text-slate-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 9l4.5-4.5L16.5 9M12 4.5V15"
                />
              </svg>

              <label className="cursor-pointer inline-flex flex-col items-center gap-1">
                <span className="text-sm font-medium text-slate-700">
                  Upload image
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              <p className="text-xs text-slate-500">
                Suggested size: 1200 x 675px
              </p>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* Featured Status / Quick Settings */}
    <div className="border rounded-lg bg-white shadow-sm">
      <div className="px-4 py-3 border-b">
        <h3 className="text-base font-semibold">Quick Settings</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="featured"
            className="text-sm cursor-pointer text-slate-700"
          >
            Mark as featured course
          </label>

          {/* Switch đơn giản bằng checkbox + Tailwind */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              id="featured"
              type="checkbox"
              className="sr-only peer"
              // onChange={...} nếu bạn muốn bind state
            />
            <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:bg-emerald-500 transition-colors">
              <div className="w-4 h-4 bg-white rounded-full shadow transform transition-transform translate-x-0 peer-checked:translate-x-5 mt-0.5 ml-0.5" />
            </div>
          </label>
        </div>

        {/* Course Info Summary */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <div>
            <p className="text-xs text-slate-500">Title</p>
            <p className="text-sm font-medium truncate">
              {courseData.title || "Untitled Course"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Level</p>
            <p className="text-sm font-medium">
              {courseData.level || "N/A"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Duration</p>
            <p className="text-sm font-medium">
              {courseData.duration || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Help Card */}
    <div className="border rounded-lg bg-blue-50 border-blue-200">
      <div className="p-4">
        <p className="text-xs text-slate-600 leading-relaxed">
          💡 Fill in the required fields (marked with *) before publishing.
          All information helps with course visibility and SEO ranking.
        </p>
      </div>
    </div>
  </div>
  )
}
