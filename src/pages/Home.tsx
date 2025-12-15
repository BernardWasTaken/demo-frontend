import {FC, useEffect, useState} from "react";
import {getStartEndDate, minutesToMs, msToDate} from "../utils/helpers";
import Calendar from "../components/Calendar";
import Activities from "../components/Activities";
import {create} from "../api/activities";
import authstore from "../utils/authstore";
import authStore from "../utils/authstore";
import {getJournal, updateJournal} from "../api/journals";
import {JournalType} from "../models/types";
import {signout} from "../api/users";


const HomePage: FC = () => {

    const [selectedDate, setSelectedDate] = useState(Date.now());
    const [isAdd, setIsAdd] = useState(false);

    const [name, setName] = useState("");
    const [descriprion, setDescription] = useState("");
    const [duration, setDuration] = useState<number | null>(null);
    const [type, setType] = useState("sport");

    const [journal, setJournal] = useState<JournalType | null>(null);

    const [content, setContent] = useState("");



    const fetchJournal = async () => {
        if(!authStore.user?.id){
            return;
        }

        const j = await getJournal(authStore.user.id, Number.parseInt(getStartEndDate(selectedDate).split(".")[0]), Number.parseInt(getStartEndDate(selectedDate).split(".")[1]));

        if(j.data.content !== null){
            setJournal(j.data);
            setContent(j.data.content);
        }else{
            setJournal(null);
            setContent("");
        }
    }

    const handleAdd = async () => {
        if(name === "" || descriprion === "" || duration === null || duration === 0){
            return;
        }
        if(!authStore.user){
            return;
        }

        const result = await create({name: name, duration: minutesToMs(duration), description: descriprion, time_created: selectedDate, type: type, user: authstore.user!});
        if(result.status === 200){
            setIsAdd(false);
            return;
        }
    }

    const handleSave = async () => {
        if(content === ""){
            return;
        }
        if(!authStore.user){
            return;
        }

        const result = await updateJournal(journal?.id  ? journal.id : 0, {content: content, date: selectedDate, user: authstore.user!});
    }

    const handleSignOut = async () => {
        await signout();
    }


    useEffect(() => {
        fetchJournal();
    }, [selectedDate]);

    return (
        <div className="d-flex">
            <div style={{width:"60%"}}>
                <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <Activities selectedDate={selectedDate} />
            </div>
            <div style={{width:"40%"}}>
                <div className="d-flex align-items-center justify-content-between pe-3 text secondary">
                    <div className="d-flex gap-2 align-items-center">
                        <h2 className="text-center" style={{height:'4vh'}}>Journal - {msToDate(selectedDate)}</h2>
                        <button className="h-75 rounded-4 text pe-2 ps-2 primary" style={{border: "1px solid", borderColor:"#e3e3e3"}} onClick={() => handleSave()}>Save</button>
                    </div>
                    <div>
                        <button className="rounded-4 text pe-2 ps-2 primary" style={{border:"1px solid", borderColor:"#e3e3e3"}} onClick={() => handleSignOut()}>Sign out</button>
                    </div>
                </div>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="w-100 tertiary text" style={{height:'100vh', outline: "none"}}></textarea>
            </div>
            <div onClick={() => setIsAdd(true)} className="position-fixed d-flex justify-content-center align-items-center" style={{height: "8vh", width:"8vh", left: "3vh", bottom: "3vh", border: '1px solid', borderColor:"#e3e3e3", borderRadius: '50%', cursor: "pointer"}}>
                <p className="text-decoration-none text" style={{transform: "translateY(30%)"}}>Add</p>
            </div>
            {isAdd && (
                <div className="d-block justify-content-between top-50 start-50 rounded-4 bg-white" style={{position:"absolute", transform: "translate(-50%, -50%)", height: "70vh", width: "30vw", border: "1px solid black"}}>
                    <div className="position-absolute d-block align-items-center p-4" >
                        <h2 className="mb-4" onClick={() => console.log(type)}>Add a new activity</h2>

                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Activity name" className="position-relative w-100 rounded-2 mb-4 p-2" style={{height:"5vh" ,outline: "none", border: "1px solid black"}} />
                        <input onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Activity description" className="position-relative w-100 rounded-2 mb-4 p-2" style={{height:"5vh" ,outline: "none", border: "1px solid black"}} />
                        <input onChange={(e) => setDuration(Number.parseInt(e.target.value))} type="number" placeholder="Activity duration(min)" className="position-relative w-100 rounded-2 mb-4 p-2" style={{height:"5vh" ,outline: "none", border: "1px solid black"}} />
                        <input type="text" value={msToDate(selectedDate)} disabled={true} className="position-relative w-100 rounded-2 mb-4 p-2" style={{height:"5vh" ,outline: "none", border: "1px solid black"}} />
                        <select onChange={(e) => setType(e.target.value)}>
                            <option value="sport">Sport</option>
                            <option value="self-improvement">Self improvement</option>
                            <option value="free-time">Free time</option>
                            <option value="education">Education</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="position-relative d-flex justify-content-evenly align-items-center" style={{top:"92%", left:"68%", width:"fit-content"}}>
                        <button onClick={() => handleAdd()} className="me-2 rounded-4 p-2 pe-3 ps-3" style={{border: "1px solid black"}}>
                            Add
                        </button>
                        <button onClick={() => setIsAdd(false)} className="me-2 rounded-4 p-2 pe-3 ps-3" style={{border: "1px solid black"}}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage