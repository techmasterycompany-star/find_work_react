export default function CandidateSourceIndicator({ title, percentage,left }) {
    return (
        <div>
            <div>
                <span>{title}</span>
            </div>
            <div className="progressBar w-full h-3 bg-[#F0F1F5] rounded-xl mt-2 relative mb-12">
                <span
                    className={
                        `relative block h-full rounded-xl after:absolute after:top-[-32px] after:right-[-124px] after:text-[#2D3039] 
                        after:content-[""] bg-primary `
                    }
                    style={{ width: `${percentage}%` }}
                ></span>
                <div className={`bg-white shadow-[0_8px_8px_rgba(13,10,44,0.12)] w-12 h-12 rounded-2sm flex-center 
                 absolute  top-[-60px]`} style={{left :`${left}px`}}>
                    {percentage}%
                    <div className="w-0 h-0  border-l-[14px] border-r-[14px] border-t-[18px] border-l-transparent border-r-transparent border-t-white  absolute left-0 bottom-[-20%] translate-x-[40%] z-100"></div>
                </div>
            </div>
        </div>
    );
}
