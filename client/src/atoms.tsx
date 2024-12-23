import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
    key: "recoil-persist",
    storage: localStorage,
    converter: JSON,
});

export interface IToDo {
    id: number;
    text: string;
}

interface IToDoState {
    [key: string]: IToDo[];
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        "To Do": [],
        "Memo": [],
    },
    effects_UNSTABLE: [persistAtom],
});