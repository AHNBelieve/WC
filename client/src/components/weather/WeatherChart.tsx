import style from "./WeatherChart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { fetchForeCastData, getLocation } from "../../api/weatherData";

interface ListItem {
  dt: number;
  dt_txt: string;
  main: {
    temp: number;
  };
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function WeatherChart() {
  const [chartHeight, setChartHeight] = useState(204); // 초기 높이 설정
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // 한 화면에 보여줄 데이터 개수


  // chart 크기조정
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setChartHeight(150); // 작은 화면
      } else if (window.innerWidth <= 1920 && window.innerHeight <= 1080) {
        setChartHeight(163.2); // 지정된 화면 크기
      } else {
        setChartHeight(204); // 기본 높이
      }
    };

    handleResize(); // 초기 높이 설정
    window.addEventListener('resize', handleResize); // 창 크기 변경 시 높이 업데이트

    return () => {
      window.removeEventListener('resize', handleResize); // 클린업
    };
  }, []);

  // API 호출 및 이것저것
  useEffect(() => {
    const fetchData = async () => {
      try {
        const location = await getLocation();
        const weatherData = await fetchForeCastData(location.lat, location.lon);
        const formattedData = weatherData.list.map((item: ListItem) => ({
          date: formatDate(item.dt_txt),
          temperature: item.main.temp,
          fullDate: new Date(item.dt * 1000).toLocaleDateString("ko-KR", {
            month: "numeric",
            day: "numeric",
          }), // 전체 날짜 추가
          time: formatTime(item.dt_txt), // 시간 추가
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);
  //주어진 날짜 문자열을 기반으로 시간을 포맷
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }); // 시간 포맷
  };
  //주어진 날짜 문자열을 12시간제 형식의 시간으로 변환하여 표시하는 역할
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric" as const,
      minute: "numeric" as const,
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };
  // 현재 페이지에 해당하는 데이터만 선택
  const displayedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  // 다음 페이지로 이동
  const handleNext = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  // 이전 페이지로 이동
  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };
  const CustomTick = ({
    x,
    y,
    payload,
  }: {
    x: number;
    y: number;
    payload: any;
  }) => (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      fill="#000000"
      fontSize={15}
      fontWeight="bold"
    >
      {payload.value}
    </text>
  );
  // 툴팁 커스텀
  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any[];
  }) => {
    if (active && payload && payload.length > 0) {
      const { temperature, fullDate, time } = payload[0].payload;
      return (
        <div
          className={style.tooltip}
        >
          <p>{`${fullDate} ${time}`}</p>
          <p>{`Temp: ${temperature}°C`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={style.container}>

      <ResponsiveContainer
        width="100%"
        height={chartHeight}
        style={{ padding: "10px" }}
      >
        <LineChart data={displayedData} margin={{ left: -40 }}>
          <XAxis
            dataKey="date"
            stroke="none" // x축 제거
            angle={-45} // 레이블 회전
            textAnchor="end" // 텍스트 앵커 조정
            tick={<CustomTick x={0} y={0} payload={{}} />}
            tickMargin={20} // x축 레이블과 그래프와의 거리 조절
          />
          <YAxis
            stroke="none" // y축 제거
            domain={["dataMin - 4", "dataMax + 4"]} // Y축의 도메인을 조정하여 변동폭 감소
          />
          <Tooltip
            content={(props: TooltipProps) => <CustomTooltip {...props} />}
          />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#000000"
            label={(
              { x, y, value } // x, y, value를 직접 받음
            ) => (
              <text
                x={x}
                y={y - 15}
                textAnchor="middle"
                fill="#000"
              >{`${value}°C`}</text>
            )}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className={style.button}>
        <FaChevronLeft
          onClick={handlePrev}
          style={{
            opacity: currentPage === 0 ? 0.5 : 1,
            cursor: currentPage === 0 ? "default" : "pointer",
          }}
        />
        <FaChevronRight
          onClick={handleNext}
          style={{
            opacity:
              currentPage >= Math.ceil(data.length / itemsPerPage) - 1
                ? 0.5
                : 1,
            cursor:
              currentPage >= Math.ceil(data.length / itemsPerPage) - 1
                ? "default"
                : "pointer",
          }}
        />
      </div>
    </div>
  );
}

export default WeatherChart;
