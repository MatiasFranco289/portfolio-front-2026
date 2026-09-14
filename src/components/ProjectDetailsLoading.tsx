export default function ProjectDetailsLoading() {
  return (
    <div className="bg-[#1c1e1e] w-full h-screen flex flex-col p-6 sm:p-0">
      <div className="bg-[#1c1e1e] w-full h-screen flex flex-col mt-24 sm:mt-0">
        <div className="mt-24 flex flex-1 flex-col sm:flex-row">
          {/* left */}
          <div className="sm:w-82 sm:ml-12 rounded-xl h-32 sm:h-auto bg-[#252828] animate-pulse"></div>

          {/* asd */}
          <div className="sm:mx-12 w-full rounded-xl flex flex-col mt-6 sm:mt-0 h-full">
            <div className="bg-[#252828] h-32 rounded-xl animate-pulse [animation-delay:300ms]"></div>

            <div className="bg-[#252828] h-32 sm:flex-1 mt-6 rounded-xl h-full animate-pulse [animation-delay:600ms]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
