import { createContext, useContext, useEffect, useState } from "react";

export const FastApiContext = createContext({ manager: null });

export interface FastApiRecentProject {
    name: string;
    path: string;
}

export interface FastApiManager {
    workDir: string;
    list: () => Promise<string[]>;
    recents: () => Promise<FastApiRecentProject[]>;
    browse: () => Promise<any>;
    create: (args: any) => Promise<any>;
}

export function useFastApi(): FastApiManager {
    return useContext(FastApiContext).manager;
}

export function FastApiManager(props: any) {
    const [manager, setManager] = useState(null);


    useEffect(() => {
        window.call("getManager").then((manager) => {
            setManager(manager);
        });
    }, []);

    if (!manager) {
        return <div>Loading...</div>
    }
    return (<FastApiContext.Provider value={{
        manager
    }}>
        {props.children}
    </FastApiContext.Provider>);
}