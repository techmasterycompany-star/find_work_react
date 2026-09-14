
export default function StateCard({title="",number="",indication="",icon={}}){
    return(
        <div className="state flex-between pr-3 h-16 rounded-md border-1 border-border1 mb-4">
            <div className="flex-gap12">
              <div className="icon w-16 h-16 flex-center bg-div-icon rounded-md text-primary font-bold">
                {icon}
              </div>
              <div className="text">
                <h4 className="mb-1 text-lg font-semibold text-primary">
                  {title}
                </h4>
                <span className="text-sm font-medium text-text-secondary">
                  {number}
                </span>
              </div>
            </div>
            <div className={indication == "+12% vs last week" ? "statussucess" : indication == "3 scheduled for today" ? "statussucess" : "statuswarning"}>
              {indication}
            </div>
          </div>
    );
}