import PlotOverview from "../components/shared/film-analysis/plot/PlotOverview";

const SinnersFilmAnalysisPage = () => {
  return <div className="flex flex-col w-full min-h-svh items-center bg-neutral-50">
    <div className="flex flex-col w-full sm:w-[700px] px-4 sm:px-0 min-h-svh">
      <div className="flex flex-col w-full h-svh item-center justify-center border border-l-neutral-200 border-r-neutral-300">
        <PlotOverview />
      </div>
    </div>
  </div>;
};

export default SinnersFilmAnalysisPage;
