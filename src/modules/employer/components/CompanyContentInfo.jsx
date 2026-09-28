export default function CompanyContentInfo({title,value}){
    return(

        <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
            <p className="font-medium text-md text-text-secondary break-words w-full">{value}</p>
        </div>
    );
}