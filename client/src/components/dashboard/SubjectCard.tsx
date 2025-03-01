type subject_data = {
    title : string,
    description : string
}
const SubjectCard = ({data} : {
    data : subject_data[]
}) => {
  return (
    data.map((subject) => {
        <div className="flex flex-col p-6">
            <span className="font-semibold ">{subject.title}</span>
            <span className="text-muted">{subject.description}</span>
        </div>
    })
  )
}

export default SubjectCard
