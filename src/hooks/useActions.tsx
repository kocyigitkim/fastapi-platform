import { useNavigate } from "react-router-dom";

export function useActions() {
    const navigate = useNavigate();

    return {
        redirect: (path: string, state?: any) => {
            navigate(path, { state });
        }
    };
}