import React, { useEffect } from 'react';
import DesktopTile from './tile.svg';
import MobileTile from './tile_1.svg';

function PathwaysSVG() {
    useEffect(() => {
        const handleMouseEnter = (event) => {
            const id = event.target.id;
            if (id.startsWith('rect-') || id.startsWith('elipse-')) {
                ['text-first-1', 'text-box-first-1', 'pointer-first-1'].forEach((elementId) => {
                    const element = document.getElementById(elementId);
                    element?.classList.remove('always-show');
                    element?.classList.add('hide-1');
                });
            }

            if (id.startsWith('rect-') || id.startsWith('elipse-')) {
                const identifier = id.replace(/^(rect-|elipse-)/, '');
                ['pointer', 'text-box', 'text'].forEach((prefix) => {
                    const element = document.getElementById(`${prefix}-${identifier}`);
                    element?.classList.remove('hide');
                    element?.classList.add('show');
                });
            }
        };

        const handleMouseLeave = (event) => {
            const id = event.target.id;
            if (id.startsWith('rect-') || id.startsWith('elipse-')) {
                const identifier = id.replace(/^(rect-|elipse-)/, '');
                ['pointer', 'text-box', 'text'].forEach((prefix) => {
                    const element = document.getElementById(`${prefix}-${identifier}`);
                    element?.classList.remove('show');
                    element?.classList.add('hide');
                });
            }
        };

        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);

        const handleScroll = () => {
            const elements = ['el-2', 'el-3', 'el-4', 'el-5'];
            let lastVisibleElement = null;

            elements.forEach((className) => {
                const elementGroup = document.getElementsByClassName(className);

                if (elementGroup.length > 0) {
                    const rect = elementGroup[0].getBoundingClientRect(); // Get element position

                    if (rect.top <= window.innerHeight / 2 + 100 && rect.top !== 0) {
                        // Hide the previously visible tooltip
                        if (lastVisibleElement && lastVisibleElement !== elementGroup[0]) {
                            Array.from(lastVisibleElement).forEach((element) => {
                                element?.classList.remove('mobile-show');
                                element?.classList.remove('fade-in');
                                element?.classList.add('mobile-hide');
                            });
                        }

                        // Show the current tooltip
                        Array.from(elementGroup).forEach((element) => {
                            element.classList.remove('mobile-hide');
                            element.classList.add('mobile-show');
                            element.classList.add('fade-in');
                        });

                        lastVisibleElement = elementGroup;
                    } else {
                        Array.from(elementGroup).forEach((element) => {
                            element.classList.remove('mobile-show');
                            element.classList.remove('fade-in');
                            element.classList.add('mobile-hide');
                        });
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            {window.innerWidth >= 480 ? <DesktopTile /> : <MobileTile />}
        </div>
    );
}

export default PathwaysSVG;