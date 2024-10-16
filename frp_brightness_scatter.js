vegaEmbed("#scatter", {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "FRP vs. Brightness",
  "width": 600,
  "height": 300,
  "data": {
    "url": "fire_archive.csv",
    "format": { "type": "csv" }
  },
  "mark": {
    "type": "point",
    "filled": true,
    "opacity": 0.7
  },
  "encoding": {
    "x": {
      "field": "brightness",
      "type": "quantitative",
      "axis": { "title": "Brightness (K)" },
      "scale": { "domain": [300, 500] }
      

    },
    "y": {
      "field": "frp",
      "type": "quantitative",
      "axis": { "title": "Fire Radiative Power (MW)" },
      "scale": { "domain": [0, 1000] }
      
    },
    "color": {
      "field": "confidence",
      "type": "quantitative",
      "scale": { "scheme": "reds" },
      "legend": { "title": "Confidence (%)" }
    },
    "tooltip": [
      { "field": "brightness", "type": "quantitative", "title": "Brightness (K)" },
      { "field": "frp", "type": "quantitative", "title": "FRP (MW)" },
      { "field": "confidence", "type": "quantitative", "title": "Confidence (%)" },
    ]
  }
});
