import React, { useEffect } from 'react'
import DesktopTile from './tile.svg'
import MobileTile from './tile_1.svg'

function PathwaysSVG() {

    useEffect(() => {
        const handleMouseEnter = (event) => {
            const id = event.target.id;
            if (id.startsWith("rect-") || id.startsWith("elipse-")) {
                document.getElementById("text-first-1")?.classList.remove("always-show");
                document.getElementById("text-box-first-1")?.classList.remove("always-show");
                document.getElementById("pointer-first-1")?.classList.remove("always-show");
                document.getElementById("text-first-1")?.classList.add("hide-1");
                document.getElementById("text-box-first-1")?.classList.add("hide-1");
                document.getElementById("pointer-first-1")?.classList.add("hide-1");
            }
            
            if (id.startsWith("rect-")) {
                const identifier = id.replace("rect-", "");
                document.getElementById(`pointer-${identifier}`)?.classList.remove("hide");
                document.getElementById(`text-box-${identifier}`)?.classList.remove("hide");
                document.getElementById(`text-${identifier}`)?.classList.remove("hide");
                document.getElementById(`pointer-${identifier}`)?.classList.add("show");
                document.getElementById(`text-box-${identifier}`)?.classList.add("show");
                document.getElementById(`text-${identifier}`)?.classList.add("show");
            }
            else if(id.startsWith("elipse-")) {
                const identifier = id.replace("elipse-", "");
                document.getElementById(`pointer-${identifier}`)?.classList.remove("hide");
                document.getElementById(`text-box-${identifier}`)?.classList.remove("hide");
                document.getElementById(`text-${identifier}`)?.classList.remove("hide"); 
                document.getElementById(`pointer-${identifier}`)?.classList.add("show");
                document.getElementById(`text-box-${identifier}`)?.classList.add("show");
                document.getElementById(`text-${identifier}`)?.classList.add("show"); 
            }
        };

        const handleMouseLeave = (event) => {
            const id = event.target.id;
            if (id.startsWith("rect-")) {
                const identifier = id.replace("rect-", "");
                document.getElementById(`pointer-${identifier}`)?.classList.remove("show");
                document.getElementById(`text-box-${identifier}`)?.classList.remove("show");
                document.getElementById(`text-${identifier}`)?.classList.remove("show");
                document.getElementById(`pointer-${identifier}`)?.classList.add("hide");
                document.getElementById(`text-box-${identifier}`)?.classList.add("hide");
                document.getElementById(`text-${identifier}`)?.classList.add("hide");
            }
            else if(id.startsWith("elipse-")) {
                const identifier = id.replace("rect-", "");
                document.getElementById(`pointer-${identifier}`)?.classList.remove("show");
                document.getElementById(`text-box-${identifier}`)?.classList.remove("show");
                document.getElementById(`text-${identifier}`)?.classList.remove("show");
                document.getElementById(`pointer-${identifier}`)?.classList.add("hide");
                document.getElementById(`text-box-${identifier}`)?.classList.add("hide");
                document.getElementById(`text-${identifier}`)?.classList.add("hide");
            }
        };

        document.addEventListener("mouseover", handleMouseEnter);
        document.addEventListener("mouseout", handleMouseLeave);

        return () => {
            document.removeEventListener("mouseover", handleMouseEnter);
            document.removeEventListener("mouseout", handleMouseLeave);
        };
    }, []);

    return (
        <div>
            <DesktopTile></DesktopTile>
        </div>
    )
}

export default PathwaysSVG