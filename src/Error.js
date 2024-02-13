export const err1 = (state) => {
    return {
        ...state,
        firstW: "",
        firstP: "",
        firstV: "",
        firstF: "",
        secondH: "",
        secondW: "",
        secondP: "",
        secondV: "",
        secondF: "",
    }; //
}

export const err = (state) => {
    return {
        ...state,
        secondP: "",
        secondV: "",
        secondF: "",
    };
}
