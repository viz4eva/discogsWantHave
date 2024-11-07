//computes dimensions for scatterplot visualization incl. overlays

export const width = 600;
export const height = width;
export const margin = width / 10;
export const textMargin = margin - 20;

export const rectOverlayData = [
    {
        x: margin,
        y: 0,
        width: width / 2 - margin + 10,
        height: height / 2 - 10,
        fill: "#00509d",
        textX: width * 0.25 - margin,
        textY: height * 0.25,
        text: "saturated",
    },
    {
        x: width / 2 + 10,
        y: 0,
        width: width / 2,
        height: height / 2 - 10,
        fill: "#ffd500",
        textX: width * 0.75 - margin,
        textY: height * 0.25,
        text: "popular",
    },
    {
        x: margin,
        y: height / 2 - 10,
        width: width / 2 - margin + 10,
        height: height / 2 - margin + 10,
        fill: "#ddd",
        textX: width * 0.25 - 20,
        textY: height * 0.75,
        text: "basic",
    },
    {
        x: width / 2 + 10,
        y: height / 2 - 10,
        width: width / 2,
        height: height / 2 - margin + 10,
        fill: "#eb5e28",
        textX: width * 0.75 - margin - 40,
        textY: height * 0.75,
        text: "super rare",
    },
];

export const triangleOverlayData = [
    {
        path: `${margin},0 ${width},0 ${margin},${height - margin}`,
        fill: "#FFAE85",
        text: "More people have it",
        textX: margin + 10,
        textY: 30,
    },
    {
        path: `${margin},${height - margin} ${width},${height - margin} ${width},0`,
        fill: "#1C29E1",
        text: "More people want it",
        textX: width / 2 + 20,
        textY: height - margin - 10,
    },
];