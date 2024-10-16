vegaEmbed("#map2", {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 550,
    "height": 357,
    "title": "Bushfires in Eastern Australia",
    "projection": {
        "type": "equirectangular",
        "scale": 2500,
        "center": [155, -32],
        "translate": [450, 300]
    },
    "layer": [
        // Landmass Layer for Context
        {
            "data": {
                "url": "ne_50m.json",
                "format": { "type": "topojson", "feature": "ne_50m_admin_0_countries" }
            },
            "mark": {
                "type": "geoshape",
                "fill": "#f5deb3",
                "stroke": "#000",
                "strokeWidth": 0.5
            }
        },
        // State Boundaries Layer
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
            "selection": {
                "fire_select": {
                    "type": "single",  // Allow single selection to filter by a clicked bubble
                    "on": "click",
                    "fields": ["longitude", "latitude"],
                    "bind": "legend"
                }
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
                    "scale": { "range": [50, 1000] },
                    "legend": null
                },
                "color": {
                    "field": "confidence",
                    "type": "quantitative",
                    "title": "Detection Confidence (%)",
                    "scale": {
                        "scheme": "reds",
                        "domain": [0, 100]
                    },
                    "legend": null
                },
                "opacity": {
                    "condition": { "selection": "fire_select", "value": 1 },
                    "value": 0.1
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
