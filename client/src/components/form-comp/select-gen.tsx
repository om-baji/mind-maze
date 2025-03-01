import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

interface Props {
    label : string,
    values : string[]
}

const SelectGen: React.FC<Props> = ({label,values} : Props) => {
    return (
        <Select>
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {values.map((val : string) => {
                        return <SelectItem value={val}>{val}</SelectItem>
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default SelectGen
