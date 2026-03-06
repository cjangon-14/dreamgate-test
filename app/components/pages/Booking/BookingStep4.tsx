import React, { type JSX } from 'react'

interface BookingStep4Props {
  onBack: () => void;
}

interface PaymentOption {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  url: string;
}


const BookingStep4: React.FC<BookingStep4Props> = ({ onBack }) => {
  const paymentOptions: PaymentOption[] = [
    {
      id: "credit-card",
      title: "Credit / Debit Card",
      description: "Pay using your Visa, Mastercard or JCB Credit/Debit card",
      icon: (
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.59961 16.8V19.6H50.3996V16.8C50.3996 13.7112 47.8884 11.2 44.7996 11.2H11.1996C8.11086 11.2 5.59961 13.7112 5.59961 16.8ZM5.59961 23.8V39.2C5.59961 42.2887 8.11086 44.8 11.1996 44.8H44.7996C47.8884 44.8 50.3996 42.2887 50.3996 39.2V23.8H5.59961ZM11.1996 37.1C11.1996 35.9362 12.1359 35 13.2996 35H17.4996C18.6634 35 19.5996 35.9362 19.5996 37.1C19.5996 38.2637 18.6634 39.2 17.4996 39.2H13.2996C12.1359 39.2 11.1996 38.2637 11.1996 37.1ZM23.7996 37.1C23.7996 35.9362 24.7359 35 25.8996 35H31.4996C32.6634 35 33.5996 35.9362 33.5996 37.1C33.5996 38.2637 32.6634 39.2 31.4996 39.2H25.8996C24.7359 39.2 23.7996 38.2637 23.7996 37.1Z"
            fill="#003154"
            fill-opacity="0.6"
          />
        </svg>
      ),
      url: "https://pay.example.com/credit-card",
    },
    {
      id: "over-counter",
      title: "Over the Counter",
      description: "Pay by Cash through any of our payment partners nationwide",
      icon: (
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.59961 42.315V15.1813C5.59961 13.1513 7.70836 11.8038 9.65086 12.3813C17.3246 14.6738 22.7496 12.8625 28.2096 11.0425C33.8534 9.16126 39.5321 7.27126 47.7484 9.89626C49.3671 10.4125 50.3996 11.9788 50.3996 13.685V40.8188C50.3996 42.8488 48.2909 44.1963 46.3571 43.6188C38.6834 41.3263 33.2496 43.1375 27.7984 44.9575C22.1546 46.8388 16.4759 48.7288 8.25961 46.1038C6.64086 45.5875 5.60836 44.0213 5.60836 42.315H5.59961ZM34.9996 28C34.9996 23.3625 31.8671 19.6 27.9996 19.6C24.1321 19.6 20.9996 23.3625 20.9996 28C20.9996 32.6375 24.1321 36.4 27.9996 36.4C31.8671 36.4 34.9996 32.6375 34.9996 28ZM16.0996 41.79C16.4846 41.79 16.7909 41.4575 16.7296 41.0813C16.3271 38.6488 14.3671 36.75 11.8996 36.4438C11.5146 36.4 11.1996 36.715 11.1996 37.1V40.5913C11.1996 40.9063 11.4096 41.1863 11.7246 41.265C13.2909 41.6325 14.7259 41.7988 16.0996 41.7988V41.79ZM43.9684 37.3188C44.4059 37.3888 44.7996 37.0563 44.7996 36.6188V32.8913C44.7996 32.5063 44.4846 32.1825 44.0996 32.235C41.8946 32.5063 40.0834 34.0638 39.4446 36.1375C39.3221 36.5488 39.6459 36.9338 40.0746 36.9425C41.3171 36.9775 42.6121 37.0913 43.9596 37.3188H43.9684ZM44.7996 18.9V15.4088C44.7996 15.0938 44.5809 14.8138 44.2746 14.735C42.7084 14.3675 41.2734 14.2013 39.8996 14.2013C39.5146 14.2013 39.2084 14.5338 39.2696 14.91C39.6721 17.3425 41.6321 19.2413 44.0996 19.5475C44.4846 19.5913 44.7996 19.2763 44.7996 18.8913V18.9ZM16.5546 19.8538C16.6771 19.4425 16.3534 19.0575 15.9246 19.0488C14.6821 19.0138 13.3871 18.9 12.0396 18.6725C11.6021 18.6025 11.2084 18.935 11.2084 19.3725L11.1996 23.1C11.1996 23.485 11.5146 23.8088 11.8996 23.7563C14.1046 23.485 15.9159 21.9275 16.5546 19.8538Z"
            fill="#003154"
            fill-opacity="0.6"
          />
        </svg>
      ),
      url: "https://pay.example.com/over-the-counter",
    },
    {
      id: "emoney",
      title: "eMoney / Wallet",
      description:
        "Pay using your E-Money Account such as GCash, Maya, GigoPay and many more.",
      icon: (
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5996 11.2C12.5996 8.11126 15.1109 5.60001 18.1996 5.60001H37.7996C40.8884 5.60001 43.3996 8.11126 43.3996 11.2V44.8C43.3996 47.8888 40.8884 50.4 37.7996 50.4H18.1996C15.1109 50.4 12.5996 47.8888 12.5996 44.8V11.2ZM18.1996 11.2V37.8H37.7996V11.2H18.1996ZM27.9996 46.9C29.5484 46.9 30.7996 45.6488 30.7996 44.1C30.7996 42.5513 29.5484 41.3 27.9996 41.3C26.4509 41.3 25.1996 42.5513 25.1996 44.1C25.1996 45.6488 26.4509 46.9 27.9996 46.9Z"
            fill="#003154"
            fill-opacity="0.6"
          />
        </svg>
      ),
      url: "https://pay.example.com/emoney",
    },
    {
      id: "bank-counter",
      title: "Bank - Over the Counter",
      description:
        "Pay over-the-counter via our Partner Banks nationwide via DragonPay",
      icon: (
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.3913 7.3675C28.5338 6.8775 27.4751 6.8775 26.6088 7.3675L7.00883 18.5675C5.90633 19.1975 5.36383 20.4925 5.68758 21.7175C6.01133 22.9425 7.13133 23.8 8.40008 23.8H11.2001V42L6.72008 45.36C6.01133 45.885 5.60008 46.7163 5.60008 47.6C5.60008 49.1488 6.85133 50.4 8.40008 50.4H47.6001C49.1488 50.4 50.4001 49.1488 50.4001 47.6C50.4001 46.7163 49.9888 45.885 49.2801 45.36L44.8001 42V23.8H47.6001C48.8688 23.8 49.9801 22.9425 50.3038 21.7175C50.6276 20.4925 50.0851 19.1975 48.9826 18.5675L29.3826 7.3675H29.3913ZM40.6001 23.8V42H35.0001V23.8H40.6001ZM30.8001 23.8V42H25.2001V23.8H30.8001ZM21.0001 23.8V42H15.4001V23.8H21.0001ZM28.0001 14C29.5488 14 30.8001 15.2513 30.8001 16.8C30.8001 18.3488 29.5488 19.6 28.0001 19.6C26.4513 19.6 25.2001 18.3488 25.2001 16.8C25.2001 15.2513 26.4513 14 28.0001 14Z"
            fill="#003154"
            fill-opacity="0.6"
          />
        </svg>
      ),
      url: "https://pay.example.com/bank-counter",
    },
    {
      id: "online-banking",
      title: "Online Banking",
      description:
        "Pay using your Bank account via our online banking payment facility.",
      icon: (
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M36.3914 30.1H19.6877C19.9414 35.7437 21.1927 40.9412 22.9689 44.7475C23.9664 46.8912 25.0427 48.405 26.0402 49.3325C27.0202 50.2512 27.6939 50.4 28.0439 50.4C28.3939 50.4 29.0677 50.2512 30.0477 49.3325C31.0452 48.405 32.1214 46.8825 33.1189 44.7475C34.8952 40.9412 36.1464 35.7437 36.4002 30.1H36.3914ZM19.6789 25.9H36.3827C36.1377 20.2562 34.8864 15.0587 33.1102 11.2525C32.1127 9.11748 31.0364 7.59498 30.0389 6.66748C29.0589 5.74873 28.3852 5.59998 28.0352 5.59998C27.6852 5.59998 27.0114 5.74873 26.0314 6.66748C25.0339 7.59498 23.9577 9.11748 22.9602 11.2525C21.1839 15.0587 19.9327 20.2562 19.6789 25.9ZM15.4789 25.9C15.7852 18.41 17.7189 11.4537 20.5452 6.88623C12.4864 9.73873 6.55395 17.08 5.73145 25.9H15.4789ZM5.73145 30.1C6.55395 38.92 12.4864 46.2612 20.5452 49.1137C17.7189 44.5462 15.7852 37.59 15.4789 30.1H5.73145ZM40.5914 30.1C40.2852 37.59 38.3514 44.5462 35.5252 49.1137C43.5839 46.2525 49.5164 38.92 50.3389 30.1H40.5914ZM50.3389 25.9C49.5164 17.08 43.5839 9.73873 35.5252 6.88623C38.3514 11.4537 40.2852 18.41 40.5914 25.9H50.3389Z"
            fill="#003154"
            fill-opacity="0.6"
          />
        </svg>
      ),
      url: "https://pay.example.com/online-banking",
    },
  ];

  return (
    <div>
      {/* Process Payment Section */}
      <div className="mb-8">
        <h3 className="text-2xl text-navy-dark font-satoshi font-bold text-dark-main mb-2">
          Process Payment
        </h3>
        <p className="text-regular font-manrope font-bold pl-5 py-4 rounded-xl text-md mb-6 bg-[#EFF5FA]">
          How do you want to Pay?
        </p>

        {/* Payment Options */}
        <div className="space-y-3">
          {paymentOptions.map((option) => (
            <a
              key={option.id}
              href={option.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center p-4 border border-navy-main/30 bg-white rounded-xl cursor-pointer transition hover:border-sky-main hover:bg-sky-main/5 hover:shadow-sm group"
            >
              <span className="text-2xl mr-4 group-hover:scale-100 transition-transform">
                {option.icon}
              </span>
              <div className="flex-1">
                <h4 className="font-bold text-regular text-lg mb-0.5">
                  {option.title}
                </h4>
                <p className="text-medium text-regular text-sm">{option.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-start">
        <button
          onClick={onBack}
          className="border border-navy-dark/20 text-navy-dark font-satoshi font-bold px-8 py-2.5 rounded-lg hover:bg-gray-50 transition cursor-pointer"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default BookingStep4
