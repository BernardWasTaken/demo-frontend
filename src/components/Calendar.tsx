import {FC} from "react";
import {msToDate} from "../utils/helpers";


const Calendar: FC<{selectedDate: any, setSelectedDate: any}> = ({selectedDate, setSelectedDate}) => {


    return (
        <div className="d-flex justify-content-between position-static align-items-center secondary" style={{height: "5vh", width:"100%"}}>
            <div className="d-block">
                <button className="border-0 text secondary" onClick={() => setSelectedDate(selectedDate - 604800000)}>&lt;&lt;</button>
                <button className="border-0 text secondary" onClick={() => setSelectedDate(selectedDate - 86400000)}>&lt;</button>
            </div>
            <div className="text">
                {msToDate(selectedDate)}
            </div>
            <div className="d-block">
                <button className="border-0 text secondary" onClick={() => setSelectedDate(selectedDate + 86400000)}>&gt;</button>
                <button className="border-0 text secondary" onClick={() => setSelectedDate(selectedDate + 604800000)}>&gt;&gt;</button>
            </div>
        </div>
   );
}

export default Calendar;