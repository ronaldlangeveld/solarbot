import CalendarHeatmap from 'react-calendar-heatmap';
import Title from './title';
import {useWindowDimensions} from '../../utils/windowDimensions';
import { useEffect, useState } from 'react';

const Heatmap = ({ outages, start }) => {
    const [outageData, setOutageData] = useState(outages);
    const { width } = useWindowDimensions();

    return (
        <>
            <Title title="Outage Heatmap ☠️" className="text-2xl font-bold mt-12 mb-12" />
            <CalendarHeatmap
                horizontal={width > 768 ? true : false}
                startDate={new Date(start)}
                endDate={new Date()}
                values={outageData}
                weekdayLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
                showWeekdayLabels={true}
                classForValue={(value) => {
                    if (!value) {
                        return 'color-empty';
                    }
                    return `color-scale-${value.count}`;
                }}
            />
        </>
    );
};

export default Heatmap;
