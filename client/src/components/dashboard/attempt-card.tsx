
const AttemptCard = ({ attempted }: {
    attempted: string
}) => {

    return (
        <div className='flex flex-col justify-center items-center p-6'>
            {attempted}
            Beats 66%
        </div>
    )
}

export default AttemptCard;
