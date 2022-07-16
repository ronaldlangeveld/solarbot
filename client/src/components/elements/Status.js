import { useMemo, useState, useEffect } from "react";
import {convertToKwh} from '../../utils/convertToKwh';
import {convertToNumber} from '../../utils/convertToNumber';
 
const GridStatus = ({freq}) => (
        <span className={`btn ${freq < 0 ? 'btn-error': 'btn-info'}`}>{freq > 0 ? 'On' : 'Off'}</span>
);

const GenerationStatus = ({sun}) => {
    const kwhVal = useMemo(() => convertToKwh(sun.value), [sun.value]);
    const genColor = (sun) => {
        if(sun < 0.3){
            return 'btn-error';
        }
        if(sun >= 0.8 && sun < 1.0){
            return 'btn-warning';
        }
        if(sun >= 1){
            return 'btn-success';
        }
    }
    return <span className={`btn ${genColor(kwhVal)}`}>{kwhVal} kWh</span>
};

const ConsumptionStatus = ({consumption}) => {
    const kwhVal = useMemo(() => convertToKwh(consumption.value), [consumption.value]);
    const consumptionColor = (consumption) => {
        if(consumption < 0.8){
            return 'btn-success';
        }
        if(consumption >= 0.8 && consumption < 2.0){
            return 'btn-warning';
        }
        if(consumption >= 2){
            return 'btn-error';
        }
    }
    return <span className={`btn ${consumptionColor(kwhVal)}`}>{kwhVal} kWh</span>
};

const BatteryStatus = ({battery}) => {
    const [batteryCharge, setBatteryCharge] = useState(0);

    useEffect(() => {
        async function chargeValue() {
            setBatteryCharge(convertToNumber(battery.value));
        };
        chargeValue();
    }, [battery]);

    const batteryColor = (batteryCharge) => {
        console.log(batteryCharge)
        if(batteryCharge > 70) {
            return 'progress-success';
        }
        if(batteryCharge <= 70 && batteryCharge >= 40) {
            return 'progress-warning';
        }
        if(batteryCharge < 40) {
            return 'progress-danger';
        }
    };

    return <progress className={`progress ${batteryColor(batteryCharge)} w-80 md:w-96 h-6`} value={battery.value} max="100"></progress>
};

const Status = ({dataset}) => (
        <>
        <div className="flex mt-6 gap-12 text-center justify-center flex-wrap">
            <div>
                <h1 className="text-1xl mb-2 font-bold">⚡️ Grid Status</h1>
                <p><GridStatus freq={dataset?.gridFrequencyLatest?.status} /></p>
            </div>
            <div>
                <h1 className="text-1xl mb-2 font-bold">☀️ Current Generation</h1>
                <p><GenerationStatus sun={dataset?.sunPower}/></p>
            </div>
            <div>
                <h1 className="text-1xl mb-2 font-bold">🏡 Current Consumption</h1>
                <p><ConsumptionStatus consumption={dataset?.consumptionNow} /></p>
            </div>
            <div className="w-full">
                <h1 className="text-1xl mb-2 font-bold">🔋 Battery Level <span className="text-xs font-normal">{dataset?.batteryLevelNow?.value}%</span></h1>
                <div className="align-middle inline-block">
                    <BatteryStatus battery={dataset?.batteryLevelNow} />
                </div>
            </div>
        </div>
        </>
    );

export default Status;
