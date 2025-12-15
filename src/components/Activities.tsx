import {FC, useEffect, useState} from "react";
import {create, getAllForDate, remove} from "../api/activities";
import authStore from "../utils/authstore";
import authstore from "../utils/authstore";
import {getStartEndDate, msToMinutes} from "../utils/helpers";
import {ActivityType} from "../models/types";


const Activities: FC<{selectedDate: any}> = ({selectedDate}) => {

    const liStyle = {
        width: "95%",
        margin: "1vh",
        padding: "1vh",
        height: "5vh",
        display: "flex",
        border: "1px solid",
        borderColor: "#e3e3e3",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "1vh",
    }

    const [activities, setActivities] = useState<ActivityType[] | null>(null);

    const fetchActivities = async () => {
        const user_id = authStore.user?.id;
        if (user_id === null) {
            return;
        }
        const result = await getAllForDate(user_id!, Number.parseInt(getStartEndDate(selectedDate).split(".")[0]), Number.parseInt(getStartEndDate(selectedDate).split(".")[1]));
        setActivities(result.data);
    }

    useEffect(() => {
        fetchActivities();
    }, [activities, fetchActivities]);

    return (
        <div>
            <ul>
                {activities ? activities.map((activity, i) =>
                <div className="d-flex gap-2 align-items-center">
                <div style={{cursor: "pointer"}} onClick={async () => await remove(activity.id)}><img src="/delete.svg" /></div>
                <li style={liStyle} className="text secondary">
                    <div className="d-flex"><b>{activity.name}</b><p className="m-0 p-0">({activity.type})</p></div>
                    <p className="m-0">{activity.description}</p>
                    <b>{msToMinutes(activity.duration)}min</b>
                </li>
                </div>) : null}
            </ul>
        </div>
    );
}


export default Activities;