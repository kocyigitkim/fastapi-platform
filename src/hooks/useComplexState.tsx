import { useState } from "react";
import { FastApiManager, useFastApi } from "../contexts/FastApiManager";

export function useComplexState() {
    const fastapi = useFastApi();

    const [state, setState] = useState({});

    return convertToFlexible(fastapi, state, setState, true);
}

function convertToFlexible(fastapi: FastApiManager, state: any, setState: any, isRoot: boolean) {

    return {
        0: state,
        1: setState,
        value: state,
        setValue: setState,
        clear: () => setState(isRoot ? {} : undefined),
        browse: () => {
            fastapi.browse().then((res) => {
                if(!res?.canceled){
                    setState(res.filePaths[0]);
                }
            });
        },
        onChange: (evt: any) => {
            if (evt && evt.target && typeof evt.target.value != 'object') {
                setState(evt.target.value);
            }
            else {
                setState(evt);
            }
        },
        field: (name: string, initialValue?: any) => {
            var v = state[name];
            if (v === undefined) {
                v = initialValue;
            }
            const setStateSub = (value: any) => {
                setState({
                    ...state,
                    [name]: value
                });
            };
            return convertToFlexible(fastapi, v, setStateSub, false);
        }
    };
}