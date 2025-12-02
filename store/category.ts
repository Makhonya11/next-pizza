import { create } from 'zustand';
interface State {
    activeId: number
    setActiveid: (activeId: number) => void
}

export const useCategoryStore = create<State>() ((set) => ({
activeId: 1,
setActiveid: (activeId: number) => set({activeId})
}))