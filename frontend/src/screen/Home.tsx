import React from "react";
import Nav from "../components/nav";
import ShowRow from "../components/showRow";

export default function Home() {
    return (
        <div className="">
            <div className="flex column flex-start w-full">
                <Nav />
            </div>
            <ShowRow />
        </div>
    );
}
