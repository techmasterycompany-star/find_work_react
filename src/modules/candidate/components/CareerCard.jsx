export default function CareerCard() {
    let articleList =[  
        {
            type: "GUIDES",
            title: "How to negotiate freelance rates with corporate clients",
            duration: "5 min read",
        },
        {
            type: "PORTFOLIO",
            title: "Top 5 portfolio adjustments to secure remote contracts",
            duration: "8 min read",
        },
        {
            type: "FINANCE",
            title: "Understanding international freelance tax regulations",
            duration: "12 min read",
        },

];
   
    function ArticleCard({ article }) {
        return (
            <div className="w-[728px] h-full bg-card-2 rounded-md p-5 border-1 border-border1 mb-4">
                <div className="flex-between w-full mb-3">
                    <p className="font-bold text-[12px] text-text-secondary">{article.type}</p>
                    <span className="font-medium text-text-placholder text-[12px]">{article.duration}</span>
                </div>
                <h3 className="text-md text-text-primary font-semibold mb-3">{article.title}</h3>
                <button className="flex-gap2 cursor-pointer hover:underline hover:text-primary">
                    <span className="text-sm font-semibold text-primary">Read Article</span>
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            d="M9 6l6 6-6 6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        );
    }
    let articlleMenu =articleList.map((article,i)=>{
              return <ArticleCard key={i} article={article}/>
            });
    return (
        <>{articlleMenu}</>
      
    );
}
