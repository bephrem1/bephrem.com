import type { FunctionComponent } from "react";

interface Props { }

const PlotOverview: FunctionComponent<Props> = () => {
  return (
    <div className="w-full py-8">
      {/* Timeline container */}
      <div className="relative w-full space-y-20">
        {/* Central Plot */}
        <div className="flex">
          {/* Left label positioned outside gutter */}
          <div className="w-64 flex flex-col items-end pr-6 -ml-64 -mt-3 select-none">
            <span className="font-semibold text-neutral-800">Quest For Freedom</span>
            <span className="text-neutral-600 text-sm whitespace-nowrap">Central Plot <p className="text-xs text-neutral-400 inline-block">(dual protagonist)</p></span>
          </div>

          {/* Central Plot 1 */}
          <div className="flex-1 relative">
            <div className="w-full h-[2px] bg-[length:8px_2px] bg-[linear-gradient(to_right,#d4d4d4_2px,transparent_2px)] [background-position:2px_0] relative">

              {/* Inciting Incident */}
              <div className="absolute left-[2.4%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 font-semibold whitespace-nowrap select-none">Inciting Incident</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">"Let It Go Sammie"</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Inciting Incident</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(252 211 77)" stroke="rgb(156 163 175)" stroke-width="0.5" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">3</div>
              </div>

              {/* Act I */}
              <div className="absolute left-[36%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">End Act I</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Remmick Kills Bert</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Act I</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(82 82 82)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">44</div>
              </div>

              {/* Act II */}
              <div className="absolute left-[64.7%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">End Act II</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Stack Dies</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Act II</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(82 82 82)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">79</div>
              </div>

              {/* Act III */}
              <div className="absolute left-[86.8%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-[42px] text-sm text-neutral-600 whitespace-nowrap select-none">End Act III</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-[107px] text-xs text-neutral-400 whitespace-nowrap select-none">Grace Lets Remmick In</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Act III</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(82 82 82)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">79</div>
              </div>

              {/* Act IV */}
              <div className="absolute left-[97%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">End Act IV</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Remmick Dies</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Act IV</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(82 82 82)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">115</div>
              </div>

              {/* Act V */}
              <div className="absolute left-[99%] -translate-x-1/2">
                <div className="absolute top-[44px] left-[45px] -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">End Act V</div>
                <div className="absolute top-[62px] left-[45px] -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Smoke Dies</div>
                <div className="absolute top-[14px] left-[20px] -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Act V</title>
                    <path d="M0 24H13V6L6.5 0L0 6V24Z" fill="rgb(252 165 165)" />
                  </svg>
                </div>
                <div className="absolute translate-y-[-15.8px] left-[20px] -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">122</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subplot A */}
        <div className="flex">
          <div className="w-48 flex flex-col items-end pr-6 -ml-48 -mt-3 select-none">
            <span className="font-semibold text-neutral-600 whitespace-nowrap">Smoke & Annie's Romance</span>
            <span className="text-neutral-600 text-sm whitespace-nowrap">Subplot</span>
          </div>

          <div className="flex-1 relative">
            <div className="w-full h-[2px] bg-[length:8px_2px] bg-[linear-gradient(to_right,#d4d4d4_2px,transparent_2px)] [background-position:2px_0] relative">
              {/* Events for Subplot A */}
              <div className="absolute left-[22.1%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">Inciting Incident</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Smoke Visits Annie</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Subplot B Inciting Incident</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(156 163 175)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">33</div>
              </div>

              <div className="absolute left-[89.3%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">End Act I</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Smoke Kills Annie</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Subplot B Act I</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(115 115 115)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">109</div>
              </div>

              <div className="absolute left-[99%] -translate-x-1/2">
                <div className="absolute top-[44px] left-[45px] -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">End Act II</div>
                <div className="absolute top-[62px] left-[92.5px] -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Smoke Accepts Fatherhood</div>
                <div className="absolute top-[14px] left-[20px] -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Act V</title>
                    <path d="M0 24H13V6L6.5 0L0 6V24Z" fill="rgb(82 82 82)" />
                  </svg>
                </div>
                <div className="absolute translate-y-[-15.8px] left-[20px] -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">122</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subplot B */}
        <div className="flex">
          <div className="w-48 flex flex-col items-end pr-6 -ml-48 -mt-3 select-none">
            <span className="font-semibold text-neutral-600 whitespace-nowrap">Stack & Mary's Romance</span>
            <span className="text-neutral-600 text-sm whitespace-nowrap">Subplot</span>
          </div>

          <div className="flex-1 relative">
            <div className="w-full h-[2px] bg-[length:8px_2px] bg-[linear-gradient(to_right,#d4d4d4_2px,transparent_2px)] [background-position:2px_0] relative">
              {/* Events for Subplot B */}
              <div className="absolute left-[22.1%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">Inciting Incident</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Mary Confronts Stack</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Subplot B Inciting Incident</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(156 163 175)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">27</div>
              </div>

              <div className="absolute left-[41.8%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">End Act I</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Admits He Loves Her</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Subplot B Act I</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(115 115 115)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">51</div>
              </div>

              <div className="absolute left-[64.7%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">End Act II</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Mary Kills Stack</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Subplot B Act II</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(115 115 115)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">79</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subplot C */}
        <div className="flex">
          <div className="w-48 flex flex-col items-end pr-6 -ml-48 -mt-3 select-none">
            <span className="font-semibold text-neutral-600 whitespace-nowrap">Sammie & Pearline's Romance</span>
            <span className="text-neutral-600 text-sm whitespace-nowrap">Subplot</span>
          </div>

          <div className="flex-1 relative">
            <div className="w-full h-[2px] bg-[length:8px_2px] bg-[linear-gradient(to_right,#d4d4d4_2px,transparent_2px)] [background-position:2px_0] relative">
              {/* Events for Subplot C */}
              <div className="absolute left-[21.3%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">Inciting Incident</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Sammie & Pearline Meet</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Subplot A Inciting Incident</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(156 163 175)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">26</div>
              </div>

              <div className="absolute left-[48.3%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">End Act I</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Sammie Eats Out Pearline</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Subplot A Act I</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(115 115 115)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">59</div>
              </div>

              <div className="absolute left-[90.1%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">End Act II</div>
                <div className="absolute -top-[60px] left-[-33px] -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Remmick Kills Pearline</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for Subplot A Act I</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(115 115 115)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">110</div>
              </div>
            </div>
          </div>
        </div>

        {/* Remarkable Scenes */}
        <div className="flex">
          <div className="w-48 flex flex-col items-end pr-6 -ml-48 -mt-3 select-none">
            <span className="font-semibold text-neutral-500 whitespace-nowrap">Remarkable Scenes</span>
            <span className="text-neutral-400 text-sm whitespace-nowrap">Cinema History.</span>
          </div>

          <div className="flex-1 relative">
            <div className="w-full h-[2px] bg-[length:8px_2px] bg-[linear-gradient(to_right,#d4d4d4_2px,transparent_2px)] [background-position:2px_0] relative">
              {/* First remarkable scene */}
              <div className="absolute left-[45.1%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">Surreal Montage</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Sammie Burns the House Down</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for remarkable scene</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(192 132 252)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">55</div>
              </div>

              {/* Second remarkable scene */}
              <div className="absolute left-[76.2%] -translate-x-1/2">
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-sm text-neutral-600 whitespace-nowrap select-none">Irish Jig Scene</div>
                <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 text-xs text-neutral-400 whitespace-nowrap select-none">Remmick Does an Ice-Cold Jig</div>
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 ml-[1px]">
                  <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
                    <title>Timeline marker for remarkable scene</title>
                    <path d="M0 0H13V18L6.5 24L0 18V0Z" fill="rgb(192 132 252)" />
                  </svg>
                </div>
                <div className="absolute -translate-y-1/2 left-1/2 -translate-x-1/2 text-sm px-3 py-1.5 bg-[radial-gradient(closest-side,rgb(250_250_250/0.95),rgb(250_250_250/0.9),transparent)] select-none">93</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlotOverview;
