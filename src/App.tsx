import { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import "./App.css";
import LandingPageSVG from "./components/svg-components/LandingPageSVG";
import CustomButton from "./components/buttons/CustomButton";
import KakaoIcon from "./components/svg-components/KakaoIcon";

const GA_TRACKING_ID = "G-FNKPTGWSL2";

function App() {
  const [isBtnClick, setIsBtnClick] = useState<boolean>(false);

  // GA 초기화 및 페이지뷰 트래킹
  useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID);
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });
  }, []);

  // 스크롤 트래킹 훅
  useEffect(() => {
    const thresholds = [25, 50, 75, 90];
    const triggered: Record<number, boolean> = {};

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentRatio = Math.floor((scrollTop / totalHeight) * 100);

      thresholds.forEach((threshold) => {
        if (currentRatio >= threshold && !triggered[threshold]) {
          triggered[threshold] = true;
          ReactGA.event("scroll", {
            event_category: "Scroll Depth",
            event_label: `${threshold}%`,
            value: threshold,
            non_interaction: true,
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 버튼 클릭 이벤트 트래킹
  const handleClick = () => {
    setIsBtnClick(true);
    ReactGA.event("click", {
      event_category: "Button",
      event_label: "나만의 작물 키우러 가기",
    });
  };

  const handleClose = () => setIsBtnClick(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-[378px] max-w-full shadow-lg rounded-2xl overflow-hidden border border-gray-200 bg-white relative">
        <LandingPageSVG className="block mx-auto" />
        <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 w-[320px] max-w-[90vw] z-50">
          <button
            onClick={handleClick}
            className="w-full py-3 bg-[#C7EACB] rounded-[16px] text-black text-lg font-bold shadow transition active:scale-95 font-pretendard cursor-pointer"
          >
            나만의 작물 키우러 가기
          </button>
        </div>
        <CustomButton open={isBtnClick} onClose={handleClose}>
          <div className="mb-6">
            <div className="text-base text-gray-800 mb-2">
              아직 정식 서비스가 출시되지는 않았지만,
            </div>
            <div className="font-bold text-lg text-gray-900 mb-2">
              카카오톡 체험판을 통해
              <br />
              작물을 키우고 받아보실 수 있어요!
            </div>
            <div className="text-sm text-gray-800 mb-2">
              소중한 의견을 남겨주신다면 최대한 반영할게요!
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href="http://pf.kakao.com/_xoZRxnn"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#FFE14A] rounded-[10px] text-black text-base font-bold shadow font-pretendard"
            >
              <KakaoIcon />
              지금 당장 토마토 받으러 가기
            </a>
            <a
              href="https://forms.gle/6q6bdFGPjC3n7kyp8"
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#D2E5D6] rounded-[10px] text-gray-800 text-base font-bold shadow font-pretendard"
            >
              소중한 의견을 전하기
            </a>
          </div>
        </CustomButton>
      </div>
    </div>
  );
}

export default App;
