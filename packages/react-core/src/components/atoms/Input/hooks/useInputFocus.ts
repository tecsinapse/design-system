import { useState } from "react";

export const useInputFocus = (onFocus?: () => void, onBlur?: () => void) => {

    const [ focused, setFocused ] = useState<boolean>(false);

    const handleFocus = () => {
        setFocused(true);
        onFocus && onFocus()
    }

    const handleBlur = () => {
        setFocused(false);
        onBlur && onBlur()
    }

    return {
        focused,
        handleBlur,
        handleFocus
    }
}