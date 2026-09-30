export default function CoreCard({title,icon,description}){
    return(
        <div className="bg-card-2 rounded-md border-1 border-border1 p-5 w-full h-fit">
            <div className="icon w-8 h-8 rounded-2sm bg-div-icon flex-center border-1 border-primary mb-2">{icon}</div>
            <h5 className="text-sm text-text-primary font-bold mb-3">{title}</h5>
            <p className="text-[12px] text-text-secondary font-normal w-full">{description}</p>
        </div>
    );
}