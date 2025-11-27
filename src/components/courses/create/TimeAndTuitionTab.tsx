
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Course } from "@/types/courses";


interface TimeAndTuitionTabProps {
  courseData: Course
  updateCourseData: (updates: Partial<Course>) => void
}

export default function TimeAndTuitionTab({ courseData, updateCourseData }: TimeAndTuitionTabProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const calculateStatus = () => {
    if (!courseData.startDate) return "N/A"
    const now = new Date()
    const start = new Date(courseData.startDate)
    const end = courseData.endDate ? new Date(courseData.endDate) : null

    if (start > now) return "Coming soon"
    if (end && end < now) return "Already ended"
    return "Opening"
  }

  return (
    <div className="space-y-6">
      {/* Duration */}
      <div>
        <Label htmlFor="duration" className="text-sm font-medium">
          Course duration
        </Label>
        <Input
          id="duration"
          placeholder="e.g., 6 weeks, 4 weeks, 3 months"
          value={courseData.duration}
          onChange={(e) => updateCourseData({ duration: e.target.value })}
          className="mt-2"
        />
      </div>

      {/* Schedule */}
      <div>
        <Label htmlFor="schedule" className="text-sm font-medium">
          Schedule
        </Label>
      </div>

      {/* Tuition */}
      <div>
        <Label htmlFor="tuition" className="text-sm font-medium">
          Tuition
        </Label>
        <div className="mt-2 space-y-2">
          <Input
            id="tuition"
            type="number"
            placeholder="Enter amount in VND"
            value={courseData.tuition}
            onChange={(e) => updateCourseData({ tuition: String(e.target.value) })}
          />
          {Number(courseData.tuition) > 0 && (
            <div className="text-sm">
              <span className="text-muted-foreground">Displayed as: </span>
              <span className="font-semibold">{formatCurrency(Number(courseData.tuition))}</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground">This is the listed tuition displayed for students</p>
        </div>
      </div>

      {/* Start Date */}
      <div>
        <Label htmlFor="startDate" className="text-sm font-medium">
          Start Date *
        </Label>
        <Input
          id="startDate"
          type="date"
          value={courseData.startDate}
          onChange={(e) => updateCourseData({ startDate: e.target.value })}
          className="mt-2"
        />
      </div>

      {/* End Date */}
      <div>
        <Label htmlFor="endDate" className="text-sm font-medium">
          End Date (Optional)
        </Label>
        <Input
          id="endDate"
          type="date"
          value={courseData.endDate}
          onChange={(e) => updateCourseData({ endDate: e.target.value })}
          className="mt-2"
        />
        <p className="mt-2 text-xs text-muted-foreground">Leave empty for unlimited/open continuously</p>
      </div>

      {/* Status Display */}
      <div className="mt-6 p-4 bg-secondary rounded-lg">
        <p className="text-sm text-muted-foreground">Status (calculated)</p>
        <p className="text-lg font-semibold mt-1">{calculateStatus()}</p>
      </div>
    </div>
  )
}
