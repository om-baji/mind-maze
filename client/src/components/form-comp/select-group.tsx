import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { subjects, subjectType } from "@/utils/subjects"

export function SelectScrollable() {
  return (
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a subject" />
      </SelectTrigger>
      <SelectContent>
        {subjects.map((subject : subjectType) => {
            return <SelectGroup>
                <SelectLabel>{subject.title}</SelectLabel>
                {subject.topics.map((topic : string) => {
                    return <SelectItem value={topic}>{topic}</SelectItem>
                })}
            </SelectGroup>
        })}
      </SelectContent>
    </Select>
  )
}
