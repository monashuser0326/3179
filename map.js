vegaEmbed("#map", {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 600,
    "height": 400,
    "title": "Satellite Recorded Bushfires in Australia",
    "projection": {
        "type": "equirectangular",
        "scale": 600,
        "center": [145, -35],
        "translate": [450, 300]
    },
    "layer": [
        // Landmass and Australian State Boundaries Layer
        {
            "data": {
                "url": "ne_50m.json",
                "format": { "type": "topojson", "feature": "ne_50m_admin_0_countries" }
            },
            "mark": {
                "type": "geoshape",
                "fill": "#f5deb3",  // Beige color for landmass
                "stroke": "#000",  // Black stroke for boundaries
                "strokeWidth": 0.5
            }
        },
        // Australian State Boundaries Layer
        {
            "data": {
                "url": "ne_50m_admin_1_states_provinces.json",
                "format": {
                    "type": "topojson",
                    "feature": "ne_50m_admin_1_states_provinces"
                }
            },
            "mark": {
                "type": "geoshape",
                "stroke": "#000",
                "strokeWidth": 1,
                "fill": "none"  
            }
        },
        // Fire Data Points Layer
        {
            "data": {
                "url": "fire_archive.csv",
                "format": { "type": "csv" }
            },
            "mark": {
                "type": "circle",
                "tooltip": { "content": "data" },
                "opacity": 0.7
            },
            "encoding": {
                "longitude": { "field": "longitude", "type": "quantitative" },
                "latitude": { "field": "latitude", "type": "quantitative" },
                "size": {
                    "field": "frp",
                    "type": "quantitative",
                    "title": "Fire Radiative Power (MW)",
                    "scale": { "range": [50, 1000] }  // Bubble size range
                },
                "color": {
                    "field": "confidence",
                    "type": "quantitative",
                    "title": "Detection Confidence (%)",
                    "scale": {
                        "scheme": "reds",  // Saturation based color scale
                        "domain": [0, 100]  // Confidence from 0 to 100
                    },
                    "legend": { "title": "Confidence (%)" }
                },
                "tooltip": [
                    { "field": "latitude", "type": "quantitative", "title": "Latitude" },
                    { "field": "longitude", "type": "quantitative", "title": "Longitude" },
                    { "field": "confidence", "type": "quantitative", "title": "Confidence (%)" },
                    { "field": "frp", "type": "quantitative", "title": "Fire Radiative Power (MW)" },
                ]
            }
        },
        // Graticule Layer
        {
            "data": { "graticule": true },
            "mark": { "type": "geoshape", "stroke": "#ddd", "strokeWidth": 0.7 }
        }
    ]
});
