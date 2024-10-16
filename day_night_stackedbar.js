vegaEmbed("#bar", {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "title": "Number of Bushfires by Date (Day vs Night)",
  "width": 710,
  "height": 300,
  "data": {
    "url": "fire_archive.csv",
    "format": { "type": "csv" }
  },
  "transform": [
    {
      "aggregate": [{ "op": "count", "as": "bushfire_count" }],
      "groupby": ["acq_date", "daynight"]
    }
  ],
  "mark": "bar",
  "encoding": {
    "x": {
      "field": "acq_date",
      "type": "temporal",
      "axis": { "title": "Date", "format": "%Y-%m-%d" }

    },
    "y": {
      "field": "bushfire_count",
      "type": "quantitative",
      "axis": { "title": "Number of Bushfires" }
    },
    "color": {
      "field": "daynight",
      "type": "nominal",
      "scale": {
        "domain": ["D", "N"],
        "range": ["#FFD700", "#8B4513"]
      },
      "legend": {
        "title": "Time of Day",
        "symbolType": "circle"
      }
    },
    "opacity": {
      "condition": {
        "param": "daynightFilter",
        "value": 1
      },
      "value": 0.1
    },
    "tooltip": [
      { "field": "acq_date", "type": "temporal", "title": "Date" },
      { "field": "daynight", "type": "nominal", "title": "Time of Day" },
      { "field": "bushfire_count", "type": "quantitative", "title": "Bushfire Count" }
    ]
  },
  "params": [
    {
      "name": "daynightFilter",
      "select": {
        "type": "point",
        "fields": ["daynight"]
      },
      "bind": "legend"
    }
  ]
});
