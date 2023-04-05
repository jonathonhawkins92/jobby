import { useState } from "react";

export function useToggle(
    initialState = false
): [boolean, (value: boolean | unknown) => void] {
    const [toggle, setToggle] = useState(initialState);

    return [
        toggle,
        function (value: boolean | unknown) {
            return setToggle((state) => {
                if (typeof value === "boolean") {
                    return value;
                }
                return !state;
            });
        },
    ];
}

