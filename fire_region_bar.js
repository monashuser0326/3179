vegaEmbed("#bar2", {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Number of Bushfires by Region (West, Middle, East)",
  "width": 270,
  "height": 300,
  "data": {
    "url": "fire_archive.csv",
    "format": { "type": "csv" }
  },
  "transform": [
    {
      "calculate": "datum.longitude < 130 ? 'West' : (datum.longitude < 145 ? 'Middle' : 'East')",
      "as": "region"
    },
    {
      "aggregate": [{ "op": "count", "as": "bushfire_count" }],
      "groupby": ["region"]
    }
  ],
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "region",
      "type": "nominal",
      "axis": {
        "title": "Region",
        "grid": false
      }
    },
    "y": {
      "field": "bushfire_count",
      "type": "quantitative",
      "axis": { "title": "Number of Bushfires", }
    },
    "color": {
      "field": "region",
      "type": "nominal",
      "scale": {
        "domain": ["West", "Middle", "East"],
        "range": ["#1f77b4", "#ff7f0e", "#2ca02c"]
      },
      "legend": {
        "title": "Region"
      }
    },
    "tooltip": [
      { "field": "region", "type": "nominal", "title": "Region" },
      { "field": "bushfire_count", "type": "quantitative", "title": "Bushfire Count" }
    ]
  }
});
