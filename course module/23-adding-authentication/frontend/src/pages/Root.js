import MainNavigation from "../components/MainNavigation";
import {Outlet, useLoaderData, useNavigation, useSubmit} from "react-router-dom";
import {useEffect} from "react";
import {getTokenDuration} from "../util/auth.jsx";

export default function RootLayout() {
    const navigation = useNavigation();
    const token = useLoaderData();
    const submit = useSubmit();
    useEffect(() => {
        if (!token) {
            return;
        }
        if (token === "Expired"){
            submit(null,{action: "/logout",method: "post"});
            return;
        }
        const tokenDuration = getTokenDuration();
        console.log(tokenDuration);
        setTimeout(()=>{
            submit(null,{action:"/logout",method:"post"})
        },tokenDuration);
    }, [token,submit]);

    return (
        <>
            <MainNavigation/>
            <main>
                {navigation.state === "loading" && <p>Loading....</p>}
                <Outlet/>
            </main>
        </>
    )
}








