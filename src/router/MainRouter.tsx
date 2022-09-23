import React from "react"
import { HashRouter, Route, Routes } from 'react-router-dom'
import { DevelopmentPage } from "../pages/Development/DevelopmentPage"
import { GettingStartedPage } from "../pages/GettingStarted/GettingStartedPage"
import { NewProjectPage } from "../pages/GettingStarted/NewProjectPage"
export function MainRouter(props: any) {

    return (<>
        <HashRouter>
            <Routes>
                <Route index element={<GettingStartedPage />} />
                <Route path="/getting-started/new-project" element={<NewProjectPage />} />
                <Route path="/development" element={<DevelopmentPage />} />
            </Routes>
        </HashRouter>
    </>)
}