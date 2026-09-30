export default function PricingBenefits({ text, selected }) {
    return (
        <div className="flex-gap12 mb-4">
            <div className="icon w-6 h-6 flex-center rounded-full bg-div-icon">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-primary"
                >
                    <path
                        d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C19.9936 4.47982 15.5202 0.00642897 10 0Z"
                        fill="#5243C2"
                        fill-opacity="0.103693"
                    />
                    <path
                        d="M15.7741 6.83331L10.07 14.5741C9.93392 14.7546 9.73107 14.8729 9.50698 14.9024C9.28289 14.9318 9.05636 14.87 8.8783 14.7308L4.80496 11.4741C4.44552 11.1865 4.38731 10.6619 4.67496 10.3025C4.96261 9.94303 5.48718 9.88483 5.84663 10.1725L9.2433 12.89L14.4325 5.84748C14.6026 5.59214 14.8993 5.45096 15.2048 5.48001C15.5103 5.50906 15.7751 5.70362 15.8941 5.98646C16.013 6.26929 15.967 6.59463 15.7741 6.83331Z"
                        fill="#7C3AED"
                    />
                </svg>
            </div>
            <p className={`text-md  font-medium ${selected ? "text-white" : "text-text-secondary"}`}>{text}</p>
        </div>

    );

}
