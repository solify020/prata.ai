import React, { useEffect } from 'react'
import DesktopTile from './tile.svg'
import MobileTile from './tile_1.svg'

function PathwaysSVG() {

    useEffect(() => {
        const handleMouseEnter = (event) => {
            const id = event.target.id;
            if (id.startsWith("rect-")) {
                const identifier = id.replace("rect-", "");
                document.getElementById(`pointer-${identifier}`)?.classList.add("show");
                document.getElementById(`text-box-${identifier}`)?.classList.add("show");
                document.getElementById(`text-${identifier}`)?.classList.add("show");
            }
            else if(id.startsWith("elipse-")) {
                const identifier = id.replace("elipse-", "");
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
            }
            else if(id.startsWith("elipse-")) {
                const identifier = id.replace("rect-", "");
                document.getElementById(`pointer-${identifier}`)?.classList.remove("show");
                document.getElementById(`text-box-${identifier}`)?.classList.remove("show");
                document.getElementById(`text-${identifier}`)?.classList.remove("show");
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