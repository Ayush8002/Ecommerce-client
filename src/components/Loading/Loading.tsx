import Wrapper from "../../Wrapper";

export const Loading = () => {
  return (
    <Wrapper>
      <div
        aria-label="Loading..."
        role="status"
        className="flex items-center space-x-2 my-6"
      >
        <svg
          className="h-8 w-8 animate-spin stroke-black"
          viewBox="0 0 256 256"
        >
          <line
            x1="128"
            y1="32"
            x2="128"
            y2="64"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="20"
          ></line>
          <line
            x1="195.9"
            y1="60.1"
            x2="173.3"
            y2="82.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="20"
          ></line>
          <line
            x1="224"
            y1="128"
            x2="192"
            y2="128"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="20"
          ></line>
          <line
            x1="195.9"
            y1="195.9"
            x2="173.3"
            y2="173.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="20"
          ></line>
          <line
            x1="128"
            y1="224"
            x2="128"
            y2="192"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="20"
          ></line>
          <line
            x1="60.1"
            y1="195.9"
            x2="82.7"
            y2="173.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="20"
          ></line>
          <line
            x1="32"
            y1="128"
            x2="64"
            y2="128"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="20"
          ></line>
          <line
            x1="60.1"
            y1="60.1"
            x2="82.7"
            y2="82.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="20"
          ></line>
        </svg>
        <span className="text-sm font-medium text-black">Loading...</span>
      </div>
    </Wrapper>
  );
};



export const Skaletan = () => {
  return (
    <div>
      {/* <!-- component --> */}
<div className="flex min-h-screen items-center justify-center">
    <div className="w-1/3">
        <div className="max-w-sm rounded overflow-hidden shadow-lg animate-pulse">
        <div className="h-48 bg-gray-300"></div>
        <div className="px-6 py-4">
            <div className="h-6 bg-gray-300 mb-2"></div>
            <div className="h-4 bg-gray-300 w-2/3"></div>
        </div>
        <div className="px-6 pt-4 pb-2">
            <div className="h-4 bg-gray-300 w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-300 w-1/2"></div>
        </div>
        </div>
    </div>
</div>
    </div>
  )
}





